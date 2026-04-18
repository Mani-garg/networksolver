const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function solve(endpoint, payload) {
  const response = await fetch(`${API_BASE}/solve/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to solve network');
  }

  return data.result;
}
