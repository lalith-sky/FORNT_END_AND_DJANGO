Enforcing Claude Sonnet 3.5 for all clients
===========================================

This project includes a small server proxy at `server/` which centralizes model selection. The server's `DEFAULT_MODEL` env variable is set to `claude-sonnet-3.5` by default (see `server/.env.example`).

How it works
------------
- Frontend calls the helper `src/utils/modelProxy.js` which posts to `VITE_MODEL_PROXY_URL` (set in `.env`).
- If the client omits a `model` field, the proxy injects `DEFAULT_MODEL` (claude-sonnet-3.5) and forwards the request to your configured provider.

To change the model globally
----------------------------
Edit the server `.env` and set `DEFAULT_MODEL` to the desired model and restart the proxy.
