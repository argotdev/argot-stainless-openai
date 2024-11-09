// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class Files extends APIResource {
  /**
   * Create a vector store file by attaching a [File](/docs/api-reference/files) to a
   * [vector store](/docs/api-reference/vector-stores/object).
   */
  create(
    vectorStoreId: string,
    body: FileCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFileObject> {
    return this._client.post(`/vector_stores/${vectorStoreId}/files`, { body, ...options });
  }

  /**
   * Retrieves a vector store file.
   */
  retrieve(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFileObject> {
    return this._client.get(`/vector_stores/${vectorStoreId}/files/${fileId}`, options);
  }

  /**
   * Returns a list of vector store files.
   */
  list(
    vectorStoreId: string,
    query?: FileListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileListResponse>;
  list(vectorStoreId: string, options?: Core.RequestOptions): Core.APIPromise<FileListResponse>;
  list(
    vectorStoreId: string,
    query: FileListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileListResponse> {
    if (isRequestOptions(query)) {
      return this.list(vectorStoreId, {}, query);
    }
    return this._client.get(`/vector_stores/${vectorStoreId}/files`, { query, ...options });
  }

  /**
   * Delete a vector store file. This will remove the file from the vector store but
   * the file itself will not be deleted. To delete the file, use the
   * [delete file](/docs/api-reference/files/delete) endpoint.
   */
  delete(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileDeleteResponse> {
    return this._client.delete(`/vector_stores/${vectorStoreId}/files/${fileId}`, options);
  }
}

/**
 * A list of files attached to a vector store.
 */
export interface VectorStoreFileObject {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) for when the vector store file was created.
   */
  created_at: number;

  /**
   * The last error associated with this vector store file. Will be `null` if there
   * are no errors.
   */
  last_error: VectorStoreFileObject.LastError | null;

  /**
   * The object type, which is always `vector_store.file`.
   */
  object: 'vector_store.file';

  /**
   * The status of the vector store file, which can be either `in_progress`,
   * `completed`, `cancelled`, or `failed`. The status `completed` indicates that the
   * vector store file is ready for use.
   */
  status: 'in_progress' | 'completed' | 'cancelled' | 'failed';

  /**
   * The total vector store usage in bytes. Note that this may be different from the
   * original file size.
   */
  usage_bytes: number;

  /**
   * The ID of the [vector store](/docs/api-reference/vector-stores/object) that the
   * [File](/docs/api-reference/files) is attached to.
   */
  vector_store_id: string;

  /**
   * The strategy used to chunk the file.
   */
  chunking_strategy?:
    | VectorStoreFileObject.StaticChunkingStrategyResponseParam
    | VectorStoreFileObject.OtherChunkingStrategyResponseParam;
}

export namespace VectorStoreFileObject {
  /**
   * The last error associated with this vector store file. Will be `null` if there
   * are no errors.
   */
  export interface LastError {
    /**
     * One of `server_error` or `rate_limit_exceeded`.
     */
    code: 'server_error' | 'unsupported_file' | 'invalid_file';

    /**
     * A human-readable description of the error.
     */
    message: string;
  }

  export interface StaticChunkingStrategyResponseParam {
    static: StaticChunkingStrategyResponseParam.Static;

    /**
     * Always `static`.
     */
    type: 'static';
  }

  export namespace StaticChunkingStrategyResponseParam {
    export interface Static {
      /**
       * The number of tokens that overlap between chunks. The default value is `400`.
       *
       * Note that the overlap must not exceed half of `max_chunk_size_tokens`.
       */
      chunk_overlap_tokens: number;

      /**
       * The maximum number of tokens in each chunk. The default value is `800`. The
       * minimum value is `100` and the maximum value is `4096`.
       */
      max_chunk_size_tokens: number;
    }
  }

  /**
   * This is returned when the chunking strategy is unknown. Typically, this is
   * because the file was indexed before the `chunking_strategy` concept was
   * introduced in the API.
   */
  export interface OtherChunkingStrategyResponseParam {
    /**
     * Always `other`.
     */
    type: 'other';
  }
}

export interface FileListResponse {
  data: Array<VectorStoreFileObject>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: string;
}

export interface FileDeleteResponse {
  id: string;

  deleted: boolean;

  object: 'vector_store.file.deleted';
}

export interface FileCreateParams {
  /**
   * A [File](/docs/api-reference/files) ID that the vector store should use. Useful
   * for tools like `file_search` that can access files.
   */
  file_id: string;

  /**
   * The chunking strategy used to chunk the file(s). If not set, will use the `auto`
   * strategy.
   */
  chunking_strategy?:
    | FileCreateParams.AutoChunkingStrategyRequestParam
    | FileCreateParams.StaticChunkingStrategyRequestParam;
}

export namespace FileCreateParams {
  /**
   * The default strategy. This strategy currently uses a `max_chunk_size_tokens` of
   * `800` and `chunk_overlap_tokens` of `400`.
   */
  export interface AutoChunkingStrategyRequestParam {
    /**
     * Always `auto`.
     */
    type: 'auto';
  }

  export interface StaticChunkingStrategyRequestParam {
    static: StaticChunkingStrategyRequestParam.Static;

    /**
     * Always `static`.
     */
    type: 'static';
  }

  export namespace StaticChunkingStrategyRequestParam {
    export interface Static {
      /**
       * The number of tokens that overlap between chunks. The default value is `400`.
       *
       * Note that the overlap must not exceed half of `max_chunk_size_tokens`.
       */
      chunk_overlap_tokens: number;

      /**
       * The maximum number of tokens in each chunk. The default value is `800`. The
       * minimum value is `100` and the maximum value is `4096`.
       */
      max_chunk_size_tokens: number;
    }
  }
}

export interface FileListParams {
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place
   * in the list. For instance, if you make a list request and receive 100 objects,
   * ending with obj_foo, your subsequent call can include after=obj_foo in order to
   * fetch the next page of the list.
   */
  after?: string;

  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place
   * in the list. For instance, if you make a list request and receive 100 objects,
   * ending with obj_foo, your subsequent call can include before=obj_foo in order to
   * fetch the previous page of the list.
   */
  before?: string;

  /**
   * Filter by file status. One of `in_progress`, `completed`, `failed`, `cancelled`.
   */
  filter?: 'in_progress' | 'completed' | 'failed' | 'cancelled';

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100, and the default is 20.
   */
  limit?: number;

  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending
   * order and `desc` for descending order.
   */
  order?: 'asc' | 'desc';
}

export declare namespace Files {
  export {
    type VectorStoreFileObject as VectorStoreFileObject,
    type FileListResponse as FileListResponse,
    type FileDeleteResponse as FileDeleteResponse,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };
}