Model proxy server
==================

This small Express server provides a proxy endpoint to a model provider and exposes a DEFAULT_MODEL env variable. It's intended as a local helper so you can centralize which model clients use.

Quick start
-----------

1. Copy `.env.example` to `.env` and set `PROVIDER_API` and `PROVIDER_API_KEY`.
2. Install dependencies: `npm install` inside the `server` folder.
3. Start: `npm start` (defaults to port 5000).

Endpoint
--------
- POST /api/v1/generate
  - body: { prompt: string, model?: string }
  - if `model` is omitted, the server uses `DEFAULT_MODEL` from environment (defaults to `claude-sonnet-3.5`).

Notes
-----
- Replace `PROVIDER_API` and payload shape in `index.js` with your actual model provider's API.
