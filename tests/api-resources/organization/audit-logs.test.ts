// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ArgotOpenAI from 'argot-stainless-openai';
import { Response } from 'node-fetch';

const client = new ArgotOpenAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource auditLogs', () => {
  test('list', async () => {
    const responsePromise = client.organization.auditLogs.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.organization.auditLogs.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      ArgotOpenAI.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.organization.auditLogs.list(
        {
          actor_emails: ['string'],
          actor_ids: ['string'],
          after: 'after',
          before: 'before',
          effective_at: { gt: 0, gte: 0, lt: 0, lte: 0 },
          event_types: ['api_key.created'],
          limit: 0,
          project_ids: ['string'],
          resource_ids: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ArgotOpenAI.NotFoundError);
  });
});
