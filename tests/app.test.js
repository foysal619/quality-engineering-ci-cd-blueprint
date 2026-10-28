import test from 'node:test';
import assert from 'node:assert/strict';
import { route } from '../src/app.js';

test('health contract stays deployment-ready', () => {
  const response = route({ method: 'GET', url: '/health' });
  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
  assert.match(response.body.timestamp, /^\d{4}-\d{2}-\d{2}T/);
});

test('version endpoint exposes a stable service contract', () => {
  const response = route({ method: 'GET', url: '/api/version' });
  assert.deepEqual(response, {
    status: 200,
    body: { service: 'quality-blueprint', version: '1.0.0' },
  });
});

test('unknown routes return structured errors', () => {
  const response = route({ method: 'GET', url: '/unknown' });
  assert.deepEqual(response, { status: 404, body: { error: 'not_found' } });
});
