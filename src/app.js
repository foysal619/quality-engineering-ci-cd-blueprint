export function route(request) {
  const url = new URL(request.url, 'http://localhost');

  if (request.method === 'GET' && url.pathname === '/health') {
    return { status: 200, body: { status: 'ok', timestamp: new Date().toISOString() } };
  }
  if (request.method === 'GET' && url.pathname === '/api/version') {
    return { status: 200, body: { service: 'quality-blueprint', version: '1.0.0' } };
  }
  return { status: 404, body: { error: 'not_found' } };
}
