/**
 * Lambda function that proxies requests to the Golf Canada API.
 * This handles CORS and forwards all HTTP methods and paths.
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

const TARGET_URL = process.env.TARGET_URL || 'https://scg.golfcanada.ca';

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://kenjdavidson.com',
  'https://www.kenjdavidson.com'
];

/**
 * Get CORS headers based on the request origin.
 * Returns null if origin is not allowed.
 * @param {string} origin - The origin from the request
 * @returns {object|null} CORS headers or null if origin is not allowed
 */
function getCorsHeaders(origin) {
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return null;
  }
  
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Amz-Date, X-Api-Key, X-Amz-Security-Token',
    'Access-Control-Max-Age': '600'
  };
}

/**
 * Main Lambda handler function.
 * @param {object} event - API Gateway HTTP API event
 * @returns {Promise<object>} HTTP response
 */
exports.handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || '';
  const corsHeaders = getCorsHeaders(origin);

  // Reject requests from unauthorized origins
  if (!corsHeaders) {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Forbidden', message: 'Origin not allowed' })
    };
  }

  // Handle preflight OPTIONS requests
  if (event.requestContext.http.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    const response = await proxyRequest(event);
    return {
      statusCode: response.statusCode,
      headers: {
        ...corsHeaders,
        'Content-Type': response.contentType || 'application/json'
      },
      body: response.body,
      isBase64Encoded: response.isBase64Encoded || false
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};

/**
 * Content types that should be treated as text (not binary).
 */
const TEXT_CONTENT_TYPES = [
  'text/',
  'application/json',
  'application/xml',
  'application/javascript',
  'application/x-www-form-urlencoded',
  'application/xhtml+xml',
  'application/html',
  '+json',
  '+xml'
];

/**
 * Check if a content type represents text content.
 * @param {string} contentType - The content type header value
 * @returns {boolean} True if content is text, false if binary
 */
function isTextContent(contentType) {
  const lowerContentType = contentType.toLowerCase();
  return TEXT_CONTENT_TYPES.some(type => lowerContentType.includes(type));
}

/**
 * Proxy the request to the target URL.
 * @param {object} event - API Gateway HTTP API event
 * @returns {Promise<object>} Response object
 */
async function proxyRequest(event) {
  const path = event.rawPath || '/';
  const queryString = event.rawQueryString ? `?${event.rawQueryString}` : '';
  const method = event.requestContext.http.method;
  
  const targetUrl = new URL(`${TARGET_URL}${path}${queryString}`);
  const protocol = targetUrl.protocol === 'https:' ? https : http;

  // Prepare headers for the proxied request
  const headers = {};
  if (event.headers) {
    // Forward relevant headers
    const headersToForward = ['content-type', 'authorization', 'accept', 'user-agent'];
    for (const [key, value] of Object.entries(event.headers)) {
      if (headersToForward.includes(key.toLowerCase())) {
        headers[key] = value;
      }
    }
  }
  headers['Host'] = targetUrl.host;

  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
    path: `${targetUrl.pathname}${targetUrl.search}`,
    method: method,
    headers: headers
  };

  return new Promise((resolve, reject) => {
    const req = protocol.request(options, (res) => {
      const chunks = [];
      
      res.on('data', (chunk) => chunks.push(chunk));
      
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const contentType = res.headers['content-type'] || 'application/json';
        
        // Check if response is text or binary
        const isText = isTextContent(contentType);
        
        resolve({
          statusCode: res.statusCode,
          contentType: contentType,
          body: isText ? buffer.toString('utf8') : buffer.toString('base64'),
          isBase64Encoded: !isText
        });
      });
    });

    req.on('error', reject);

    // Send request body if present, preserving binary data
    if (event.body) {
      const body = event.isBase64Encoded 
        ? Buffer.from(event.body, 'base64')
        : event.body;
      req.write(body);
    }

    req.end();
  });
}
