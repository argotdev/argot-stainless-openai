// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ArgotOpenAI from 'argot-stainless-openai';

const client = new ArgotOpenAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource audio', () => {
  test('speech: required and optional params', async () => {
    const response = await client.audio.speech({
      input: 'input',
      model: 'string',
      voice: 'alloy',
      response_format: 'mp3',
      speed: 0.25,
    });
  });
});
