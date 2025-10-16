const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Default model controlled by env
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || 'claude-sonnet-3.5';

// Example route that proxies a request to an LLM provider.
// This is a template: replace the URL and auth header according to your provider.
app.post('/api/v1/generate', async (req, res) => {
  try {
    const input = req.body;

    // Inject model selection
    const payload = {
      model: input.model || DEFAULT_MODEL,
      input: input.input || input.prompt || ''
    };

    // NOTE: Change provider URL and authorization as needed.
    // This example assumes a POST to PROVIDER_API with an API key in PROVIDER_API_KEY.
    const PROVIDER_API = process.env.PROVIDER_API || '';
    const PROVIDER_API_KEY = process.env.PROVIDER_API_KEY || '';

    if (!PROVIDER_API || !PROVIDER_API_KEY) {
      return res.status(500).json({ error: 'Provider API and API key not configured in server env.' });
    }

    const response = await axios.post(PROVIDER_API, payload, {
      headers: {
        Authorization: `Bearer ${PROVIDER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return res.json(response.data);
  } catch (err) {
    console.error('Proxy error', err?.response?.data || err.message || err);
    return res.status(500).json({ error: 'Proxy request failed', detail: err?.response?.data || err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Model proxy server listening on port ${PORT}, default model=${DEFAULT_MODEL}`));
