// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as ThreadsAPI from './threads';
import * as MessagesAPI from './messages';
import * as RunsAPI from './runs/runs';

export class Threads extends APIResource {
  messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);

  /**
   * Create a thread.
   */
  create(body?: ThreadCreateParams, options?: Core.RequestOptions): Core.APIPromise<ThreadObject>;
  create(options?: Core.RequestOptions): Core.APIPromise<ThreadObject>;
  create(
    body: ThreadCreateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ThreadObject> {
    if (isRequestOptions(body)) {
      return this.create({}, body);
    }
    return this._client.post('/threads', { body, ...options });
  }

  /**
   * Retrieves a thread.
   */
  retrieve(threadId: string, options?: Core.RequestOptions): Core.APIPromise<ThreadObject> {
    return this._client.get(`/threads/${threadId}`, options);
  }

  /**
   * Modifies a thread.
   */
  update(
    threadId: string,
    body: ThreadUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ThreadObject> {
    return this._client.post(`/threads/${threadId}`, { body, ...options });
  }

  /**
   * Delete a thread.
   */
  delete(threadId: string, options?: Core.RequestOptions): Core.APIPromise<ThreadDeleteResponse> {
    return this._client.delete(`/threads/${threadId}`, options);
  }
}

/**
 * Represents a thread that contains [messages](/docs/api-reference/messages).
 */
export interface ThreadObject {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) for when the thread was created.
   */
  created_at: number;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata: unknown | null;

  /**
   * The object type, which is always `thread`.
   */
  object: 'thread';

  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  tool_resources: ThreadObject.ToolResources | null;
}

export namespace ThreadObject {
  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  export interface ToolResources {
    code_interpreter?: ToolResources.CodeInterpreter;

    file_search?: ToolResources.FileSearch;
  }

  export namespace ToolResources {
    export interface CodeInterpreter {
      /**
       * A list of [file](/docs/api-reference/files) IDs made available to the
       * `code_interpreter` tool. There can be a maximum of 20 files associated with the
       * tool.
       */
      file_ids?: Array<string>;
    }

    export interface FileSearch {
      /**
       * The [vector store](/docs/api-reference/vector-stores/object) attached to this
       * thread. There can be a maximum of 1 vector store attached to the thread.
       */
      vector_store_ids?: Array<string>;
    }
  }
}

export interface ThreadDeleteResponse {
  id: string;

  deleted: boolean;

  object: 'thread.deleted';
}

export interface ThreadCreateParams {
  /**
   * A list of [messages](/docs/api-reference/messages) to start the thread with.
   */
  messages?: Array<ThreadCreateParams.Message>;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata?: unknown | null;

  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  tool_resources?: ThreadCreateParams.ToolResources | null;
}

export namespace ThreadCreateParams {
  export interface Message {
    /**
     * The text contents of the message.
     */
    content:
      | string
      | Array<
          | Message.MessageContentImageFileObject
          | Message.MessageContentImageURLObject
          | Message.MessageRequestContentTextObject
        >;

    /**
     * The role of the entity that is creating the message. Allowed values include:
     *
     * - `user`: Indicates the message is sent by an actual user and should be used in
     *   most cases to represent user-generated messages.
     * - `assistant`: Indicates the message is generated by the assistant. Use this
     *   value to insert messages from the assistant into the conversation.
     */
    role: 'user' | 'assistant';

    /**
     * A list of files attached to the message, and the tools they should be added to.
     */
    attachments?: Array<Message.Attachment> | null;

    /**
     * Set of 16 key-value pairs that can be attached to an object. This can be useful
     * for storing additional information about the object in a structured format. Keys
     * can be a maximum of 64 characters long and values can be a maximum of 512
     * characters long.
     */
    metadata?: unknown | null;
  }

  export namespace Message {
    /**
     * References an image [File](/docs/api-reference/files) in the content of a
     * message.
     */
    export interface MessageContentImageFileObject {
      image_file: MessageContentImageFileObject.ImageFile;

      /**
       * Always `image_file`.
       */
      type: 'image_file';
    }

    export namespace MessageContentImageFileObject {
      export interface ImageFile {
        /**
         * The [File](/docs/api-reference/files) ID of the image in the message content.
         * Set `purpose="vision"` when uploading the File if you need to later display the
         * file content.
         */
        file_id: string;

        /**
         * Specifies the detail level of the image if specified by the user. `low` uses
         * fewer tokens, you can opt in to high resolution using `high`.
         */
        detail?: 'auto' | 'low' | 'high';
      }
    }

    /**
     * References an image URL in the content of a message.
     */
    export interface MessageContentImageURLObject {
      image_url: MessageContentImageURLObject.ImageURL;

      /**
       * The type of the content part.
       */
      type: 'image_url';
    }

    export namespace MessageContentImageURLObject {
      export interface ImageURL {
        /**
         * The external URL of the image, must be a supported image types: jpeg, jpg, png,
         * gif, webp.
         */
        url: string;

        /**
         * Specifies the detail level of the image. `low` uses fewer tokens, you can opt in
         * to high resolution using `high`. Default value is `auto`
         */
        detail?: 'auto' | 'low' | 'high';
      }
    }

    /**
     * The text content that is part of a message.
     */
    export interface MessageRequestContentTextObject {
      /**
       * Text content to be sent to the model
       */
      text: string;

      /**
       * Always `text`.
       */
      type: 'text';
    }

    export interface Attachment {
      /**
       * The ID of the file to attach to the message.
       */
      file_id?: string;

      /**
       * The tools to add this file to.
       */
      tools?: Array<Attachment.AssistantToolsCode | Attachment.AssistantToolsFileSearchTypeOnly>;
    }

    export namespace Attachment {
      export interface AssistantToolsCode {
        /**
         * The type of tool being defined: `code_interpreter`
         */
        type: 'code_interpreter';
      }

      export interface AssistantToolsFileSearchTypeOnly {
        /**
         * The type of tool being defined: `file_search`
         */
        type: 'file_search';
      }
    }
  }

  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  export interface ToolResources {
    code_interpreter?: ToolResources.CodeInterpreter;

    file_search?: ToolResources.UnionMember0 | ToolResources.UnionMember1;
  }

  export namespace ToolResources {
    export interface CodeInterpreter {
      /**
       * A list of [file](/docs/api-reference/files) IDs made available to the
       * `code_interpreter` tool. There can be a maximum of 20 files associated with the
       * tool.
       */
      file_ids?: Array<string>;
    }

    export interface UnionMember0 {
      /**
       * The [vector store](/docs/api-reference/vector-stores/object) attached to this
       * thread. There can be a maximum of 1 vector store attached to the thread.
       */
      vector_store_ids: Array<string>;

      /**
       * A helper to create a [vector store](/docs/api-reference/vector-stores/object)
       * with file_ids and attach it to this thread. There can be a maximum of 1 vector
       * store attached to the thread.
       */
      vector_stores?: Array<UnionMember0.VectorStore>;
    }

    export namespace UnionMember0 {
      export interface VectorStore {
        /**
         * The chunking strategy used to chunk the file(s). If not set, will use the `auto`
         * strategy.
         */
        chunking_strategy?: VectorStore.AutoChunkingStrategy | VectorStore.StaticChunkingStrategy;

        /**
         * A list of [file](/docs/api-reference/files) IDs to add to the vector store.
         * There can be a maximum of 10000 files in a vector store.
         */
        file_ids?: Array<string>;

        /**
         * Set of 16 key-value pairs that can be attached to a vector store. This can be
         * useful for storing additional information about the vector store in a structured
         * format. Keys can be a maximum of 64 characters long and values can be a maximum
         * of 512 characters long.
         */
        metadata?: unknown;
      }

      export namespace VectorStore {
        /**
         * The default strategy. This strategy currently uses a `max_chunk_size_tokens` of
         * `800` and `chunk_overlap_tokens` of `400`.
         */
        export interface AutoChunkingStrategy {
          /**
           * Always `auto`.
           */
          type: 'auto';
        }

        export interface StaticChunkingStrategy {
          static: StaticChunkingStrategy.Static;

          /**
           * Always `static`.
           */
          type: 'static';
        }

        export namespace StaticChunkingStrategy {
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
    }

    export interface UnionMember1 {
      /**
       * A helper to create a [vector store](/docs/api-reference/vector-stores/object)
       * with file_ids and attach it to this thread. There can be a maximum of 1 vector
       * store attached to the thread.
       */
      vector_stores: Array<UnionMember1.VectorStore>;

      /**
       * The [vector store](/docs/api-reference/vector-stores/object) attached to this
       * thread. There can be a maximum of 1 vector store attached to the thread.
       */
      vector_store_ids?: Array<string>;
    }

    export namespace UnionMember1 {
      export interface VectorStore {
        /**
         * The chunking strategy used to chunk the file(s). If not set, will use the `auto`
         * strategy.
         */
        chunking_strategy?: VectorStore.AutoChunkingStrategy | VectorStore.StaticChunkingStrategy;

        /**
         * A list of [file](/docs/api-reference/files) IDs to add to the vector store.
         * There can be a maximum of 10000 files in a vector store.
         */
        file_ids?: Array<string>;

        /**
         * Set of 16 key-value pairs that can be attached to a vector store. This can be
         * useful for storing additional information about the vector store in a structured
         * format. Keys can be a maximum of 64 characters long and values can be a maximum
         * of 512 characters long.
         */
        metadata?: unknown;
      }

      export namespace VectorStore {
        /**
         * The default strategy. This strategy currently uses a `max_chunk_size_tokens` of
         * `800` and `chunk_overlap_tokens` of `400`.
         */
        export interface AutoChunkingStrategy {
          /**
           * Always `auto`.
           */
          type: 'auto';
        }

        export interface StaticChunkingStrategy {
          static: StaticChunkingStrategy.Static;

          /**
           * Always `static`.
           */
          type: 'static';
        }

        export namespace StaticChunkingStrategy {
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
    }
  }
}

export interface ThreadUpdateParams {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata?: unknown | null;

  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  tool_resources?: ThreadUpdateParams.ToolResources | null;
}

export namespace ThreadUpdateParams {
  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  export interface ToolResources {
    code_interpreter?: ToolResources.CodeInterpreter;

    file_search?: ToolResources.FileSearch;
  }

  export namespace ToolResources {
    export interface CodeInterpreter {
      /**
       * A list of [file](/docs/api-reference/files) IDs made available to the
       * `code_interpreter` tool. There can be a maximum of 20 files associated with the
       * tool.
       */
      file_ids?: Array<string>;
    }

    export interface FileSearch {
      /**
       * The [vector store](/docs/api-reference/vector-stores/object) attached to this
       * thread. There can be a maximum of 1 vector store attached to the thread.
       */
      vector_store_ids?: Array<string>;
    }
  }
}

export namespace Threads {
  export import ThreadObject = ThreadsAPI.ThreadObject;
  export import ThreadDeleteResponse = ThreadsAPI.ThreadDeleteResponse;
  export import ThreadCreateParams = ThreadsAPI.ThreadCreateParams;
  export import ThreadUpdateParams = ThreadsAPI.ThreadUpdateParams;
  export import Messages = MessagesAPI.Messages;
  export import MessageObject = MessagesAPI.MessageObject;
  export import MessageListResponse = MessagesAPI.MessageListResponse;
  export import MessageDeleteResponse = MessagesAPI.MessageDeleteResponse;
  export import MessageCreateParams = MessagesAPI.MessageCreateParams;
  export import MessageListParams = MessagesAPI.MessageListParams;
  export import Runs = RunsAPI.Runs;
  export import RunObject = RunsAPI.RunObject;
  export import RunListResponse = RunsAPI.RunListResponse;
  export import RunCreateParams = RunsAPI.RunCreateParams;
  export import RunListParams = RunsAPI.RunListParams;
  export import RunSubmitToolOutputsParams = RunsAPI.RunSubmitToolOutputsParams;
}
