// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as FilesAPI from './files';
import * as ContentAPI from './content';

export class Files extends APIResource {
  content: ContentAPI.Content = new ContentAPI.Content(this._client);

  /**
   * Upload a file that can be used across various endpoints. Individual files can be
   * up to 512 MB, and the size of all files uploaded by one organization can be up
   * to 100 GB.
   *
   * The Assistants API supports files up to 2 million tokens and of specific file
   * types. See the [Assistants Tools guide](/docs/assistants/tools) for details.
   *
   * The Fine-tuning API only supports `.jsonl` files. The input also has certain
   * required formats for fine-tuning
   * [chat](/docs/api-reference/fine-tuning/chat-input) or
   * [completions](/docs/api-reference/fine-tuning/completions-input) models.
   *
   * The Batch API only supports `.jsonl` files up to 100 MB in size. The input also
   * has a specific required [format](/docs/api-reference/batch/request-input).
   *
   * Please [contact us](https://help.openai.com/) if you need to increase these
   * storage limits.
   */
  create(body: FileCreateParams, options?: Core.RequestOptions): Core.APIPromise<OpenAIFile> {
    return this._client.post('/files', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Returns information about a specific file.
   */
  retrieve(fileId: string, options?: Core.RequestOptions): Core.APIPromise<OpenAIFile> {
    return this._client.get(`/files/${fileId}`, options);
  }

  /**
   * Returns a list of files that belong to the user's organization.
   */
  list(query?: FileListParams, options?: Core.RequestOptions): Core.APIPromise<FileListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<FileListResponse>;
  list(
    query: FileListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/files', { query, ...options });
  }

  /**
   * Delete a file.
   */
  delete(fileId: string, options?: Core.RequestOptions): Core.APIPromise<FileDeleteResponse> {
    return this._client.delete(`/files/${fileId}`, options);
  }
}

/**
 * The `File` object represents a document that has been uploaded to OpenAI.
 */
export interface OpenAIFile {
  /**
   * The file identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The size of the file, in bytes.
   */
  bytes: number;

  /**
   * The Unix timestamp (in seconds) for when the file was created.
   */
  created_at: number;

  /**
   * The name of the file.
   */
  filename: string;

  /**
   * The object type, which is always `file`.
   */
  object: 'file';

  /**
   * The intended purpose of the file. Supported values are `assistants`,
   * `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`
   * and `vision`.
   */
  purpose:
    | 'assistants'
    | 'assistants_output'
    | 'batch'
    | 'batch_output'
    | 'fine-tune'
    | 'fine-tune-results'
    | 'vision';

  /**
   * @deprecated: Deprecated. The current status of the file, which can be either
   * `uploaded`, `processed`, or `error`.
   */
  status: 'uploaded' | 'processed' | 'error';

  /**
   * @deprecated: Deprecated. For details on why a fine-tuning training file failed
   * validation, see the `error` field on `fine_tuning.job`.
   */
  status_details?: string;
}

export interface FileListResponse {
  data: Array<OpenAIFile>;

  object: 'list';
}

export interface FileDeleteResponse {
  id: string;

  deleted: boolean;

  object: 'file';
}

export interface FileCreateParams {
  /**
   * The File object (not file name) to be uploaded.
   */
  file: Core.Uploadable;

  /**
   * The intended purpose of the uploaded file.
   *
   * Use "assistants" for [Assistants](/docs/api-reference/assistants) and
   * [Message](/docs/api-reference/messages) files, "vision" for Assistants image
   * file inputs, "batch" for [Batch API](/docs/guides/batch), and "fine-tune" for
   * [Fine-tuning](/docs/api-reference/fine-tuning).
   */
  purpose: 'assistants' | 'batch' | 'fine-tune' | 'vision';
}

export interface FileListParams {
  /**
   * Only return files with the given purpose.
   */
  purpose?: string;
}

export namespace Files {
  export import OpenAIFile = FilesAPI.OpenAIFile;
  export import FileListResponse = FilesAPI.FileListResponse;
  export import FileDeleteResponse = FilesAPI.FileDeleteResponse;
  export import FileCreateParams = FilesAPI.FileCreateParams;
  export import FileListParams = FilesAPI.FileListParams;
  export import Content = ContentAPI.Content;
  export import ContentRetrieveResponse = ContentAPI.ContentRetrieveResponse;
}
