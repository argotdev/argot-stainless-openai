// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ArgotOpenAI from 'argot-openai';
import { Response } from 'node-fetch';

const client = new ArgotOpenAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource threads', () => {
  test('create', async () => {
    const responsePromise = client.threads.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.threads.create({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      ArgotOpenAI.NotFoundError,
    );
  });

  test('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.threads.create(
        {
          messages: [
            {
              content: 'string',
              role: 'user',
              attachments: [
                {
                  file_id: 'file_id',
                  tools: [
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                  ],
                },
                {
                  file_id: 'file_id',
                  tools: [
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                  ],
                },
                {
                  file_id: 'file_id',
                  tools: [
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                  ],
                },
              ],
              metadata: {},
            },
            {
              content: 'string',
              role: 'user',
              attachments: [
                {
                  file_id: 'file_id',
                  tools: [
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                  ],
                },
                {
                  file_id: 'file_id',
                  tools: [
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                  ],
                },
                {
                  file_id: 'file_id',
                  tools: [
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                  ],
                },
              ],
              metadata: {},
            },
            {
              content: 'string',
              role: 'user',
              attachments: [
                {
                  file_id: 'file_id',
                  tools: [
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                  ],
                },
                {
                  file_id: 'file_id',
                  tools: [
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                  ],
                },
                {
                  file_id: 'file_id',
                  tools: [
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                    { type: 'code_interpreter' },
                  ],
                },
              ],
              metadata: {},
            },
          ],
          metadata: {},
          tool_resources: {
            code_interpreter: { file_ids: ['string', 'string', 'string'] },
            file_search: {
              vector_store_ids: ['string'],
              vector_stores: [
                {
                  chunking_strategy: { type: 'auto' },
                  file_ids: ['string', 'string', 'string'],
                  metadata: {},
                },
              ],
            },
          },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ArgotOpenAI.NotFoundError);
  });

  test('retrieve', async () => {
    const responsePromise = client.threads.retrieve('thread_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.threads.retrieve('thread_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      ArgotOpenAI.NotFoundError,
    );
  });

  test('update', async () => {
    const responsePromise = client.threads.update('thread_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete', async () => {
    const responsePromise = client.threads.delete('thread_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.threads.delete('thread_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      ArgotOpenAI.NotFoundError,
    );
  });
});
