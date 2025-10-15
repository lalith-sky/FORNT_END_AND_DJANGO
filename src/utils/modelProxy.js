import axios from 'axios';

// Frontend helper to call the model proxy server.
// The proxy enforces DEFAULT_MODEL (claude-sonnet-3.5) when clients omit the model.
const PROXY_URL = import.meta.env.VITE_MODEL_PROXY_URL || 'http://localhost:5000';

async function generate({ prompt, model, options } = {}) {
  try {
    const body = {
      input: prompt || options?.prompt || '',
      model: model || undefined,
      ...(options || {})
    };

    const res = await axios.post(`${PROXY_URL}/api/v1/generate`, body, {
      headers: { 'Content-Type': 'application/json' }
    });

    return res.data;
  } catch (err) {
    // Normalize error
    if (err?.response?.data) throw err.response.data;
    throw { error: err.message || 'Model proxy request failed' };
  }
}

export { generate };
