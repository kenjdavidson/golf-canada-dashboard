# Golf Canada API Gateway Proxy

This AWS SAM application creates an HTTP API Gateway that proxies requests to the Golf Canada API to work around CORS restrictions.

## Architecture

- **AWS HTTP API Gateway**: Handles incoming requests and CORS preflight responses
- **AWS Lambda Function**: Proxies requests to the Golf Canada API

## CORS Configuration

The proxy allows requests from the following origins:

- `http://localhost:3000` (local development)
- `http://localhost:5173` (Vite dev server)
- `https://kenjdavidson.com`
- `https://www.kenjdavidson.com`

## Prerequisites

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) configured with appropriate credentials

## Local Development

To run the API locally:

```bash
cd gateway
sam build
sam local start-api
```

This will start a local API Gateway on `http://localhost:3000`.

## Deployment

### Via GitHub Actions (Recommended)

1. Navigate to the **Actions** tab in the GitHub repository
2. Select the **Deploy API Gateway** workflow
3. Click **Run workflow**
4. Choose the environment and AWS region
5. Click **Run workflow**

Note: You must configure the `AWS_ROLE_ARN` secret in your repository settings.

### Manual Deployment

```bash
cd gateway
sam build
sam deploy --guided
```

Follow the prompts to configure your deployment settings.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `TARGET_URL` | The target API URL to proxy requests to | `https://scg.golfcanada.ca` |

## API Usage

Once deployed, you can make requests to the API Gateway endpoint:

```bash
# Example: Get golfer data
curl https://<api-id>.execute-api.<region>.amazonaws.com/prod/api/golfers/123
```

All HTTP methods (GET, POST, PUT, DELETE, PATCH) and paths are proxied to the target URL.
