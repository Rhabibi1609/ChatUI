/**
 * chatApi.js
 * All communication with the VR Instructor backend lives here.
 */

/**
 * @param {string} text       – User question
 * @param {string} serverUrl  – e.g. "http://localhost:8080"
 * @param {string} apiKey     – Value for x-api-key header
 * @returns {{ response: string, sources: string[] }}
 */
export async function sendChat(text, serverUrl, apiKey) {
  const url = `${serverUrl.replace(/\/$/, '')}/chat`;

  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['x-api-key'] = apiKey;

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // data.response may be a plain string OR an array of content blocks
  // like [{ type: 'text', text: '...', extras: {...} }]
  let response = data.response || '(no response)';
  if (Array.isArray(response)) {
    response = response.map(block => block.text || '').join('');
  } else if (typeof response === 'object' && response !== null) {
    response = response.text || JSON.stringify(response);
  }

  return {
    response,
    sources: data.sources || [],
  };
}
