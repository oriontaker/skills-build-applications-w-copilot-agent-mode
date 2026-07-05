import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import { createApp } from './app.js';

test('GET /api/users returns a JSON payload', async () => {
  const app = createApp();

  const response = await request(app).get('/api/users');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.users));
});

test('GET /api/activities returns a JSON payload', async () => {
  const app = createApp();

  const response = await request(app).get('/api/activities');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.activities));
});

test('createApp uses the provided base URL when supplied', async () => {
  const app = createApp('https://demo-8000.app.github.dev');

  const response = await request(app).get('/api/users');

  assert.equal(response.status, 200);
  assert.equal(response.body.baseUrl, 'https://demo-8000.app.github.dev');
});
