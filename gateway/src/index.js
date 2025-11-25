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
 * @param {string} origin - The origin from the request
 * @returns {object} CORS headers
 */
function getCorsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
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
        
        // Check if response is binary
        const isBinary = !contentType.includes('text') && 
                         !contentType.includes('json') && 
                         !contentType.includes('xml');
        
        resolve({
          statusCode: res.statusCode,
          contentType: contentType,
          body: isBinary ? buffer.toString('base64') : buffer.toString('utf8'),
          isBase64Encoded: isBinary
        });
      });
    });

    req.on('error', reject);

    // Send request body if present
    if (event.body) {
      const body = event.isBase64Encoded 
        ? Buffer.from(event.body, 'base64').toString('utf8')
        : event.body;
      req.write(body);
    }

    req.end();
  });
}
