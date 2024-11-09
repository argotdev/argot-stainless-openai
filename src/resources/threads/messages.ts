// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class Messages extends APIResource {
  /**
   * Modifies a message.
   */
  create(
    threadId: string,
    messageId: string,
    body: MessageCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MessageObject> {
    return this._client.post(`/threads/${threadId}/messages/${messageId}`, { body, ...options });
  }

  /**
   * Retrieve a message.
   */
  retrieve(
    threadId: string,
    messageId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MessageObject> {
    return this._client.get(`/threads/${threadId}/messages/${messageId}`, options);
  }

  /**
   * Returns a list of messages for a given thread.
   */
  list(
    threadId: string,
    query?: MessageListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MessageListResponse>;
  list(threadId: string, options?: Core.RequestOptions): Core.APIPromise<MessageListResponse>;
  list(
    threadId: string,
    query: MessageListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<MessageListResponse> {
    if (isRequestOptions(query)) {
      return this.list(threadId, {}, query);
    }
    return this._client.get(`/threads/${threadId}/messages`, { query, ...options });
  }

  /**
   * Deletes a message.
   */
  delete(
    threadId: string,
    messageId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MessageDeleteResponse> {
    return this._client.delete(`/threads/${threadId}/messages/${messageId}`, options);
  }
}

/**
 * Represents a message within a [thread](/docs/api-reference/threads).
 */
export interface MessageObject {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;

  /**
   * If applicable, the ID of the [assistant](/docs/api-reference/assistants) that
   * authored this message.
   */
  assistant_id: string | null;

  /**
   * A list of files attached to the message, and the tools they were added to.
   */
  attachments: Array<MessageObject.Attachment> | null;

  /**
   * The Unix timestamp (in seconds) for when the message was completed.
   */
  completed_at: number | null;

  /**
   * The content of the message in array of text and/or images.
   */
  content: Array<
    | MessageObject.MessageContentImageFileObject
    | MessageObject.MessageContentImageURLObject
    | MessageObject.MessageContentTextObject
    | MessageObject.MessageContentRefusalObject
  >;

  /**
   * The Unix timestamp (in seconds) for when the message was created.
   */
  created_at: number;

  /**
   * The Unix timestamp (in seconds) for when the message was marked as incomplete.
   */
  incomplete_at: number | null;

  /**
   * On an incomplete message, details about why the message is incomplete.
   */
  incomplete_details: MessageObject.IncompleteDetails | null;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata: unknown | null;

  /**
   * The object type, which is always `thread.message`.
   */
  object: 'thread.message';

  /**
   * The entity that produced the message. One of `user` or `assistant`.
   */
  role: 'user' | 'assistant';

  /**
   * The ID of the [run](/docs/api-reference/runs) associated with the creation of
   * this message. Value is `null` when messages are created manually using the
   * create message or create thread endpoints.
   */
  run_id: string | null;

  /**
   * The status of the message, which can be either `in_progress`, `incomplete`, or
   * `completed`.
   */
  status: 'in_progress' | 'incomplete' | 'completed';

  /**
   * The [thread](/docs/api-reference/threads) ID that this message belongs to.
   */
  thread_id: string;
}

export namespace MessageObject {
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
  export interface MessageContentTextObject {
    text: MessageContentTextObject.Text;

    /**
     * Always `text`.
     */
    type: 'text';
  }

  export namespace MessageContentTextObject {
    export interface Text {
      annotations: Array<
        | Text.MessageContentTextAnnotationsFileCitationObject
        | Text.MessageContentTextAnnotationsFilePathObject
      >;

      /**
       * The data that makes up the text.
       */
      value: string;
    }

    export namespace Text {
      /**
       * A citation within the message that points to a specific quote from a specific
       * File associated with the assistant or the message. Generated when the assistant
       * uses the "file_search" tool to search files.
       */
      export interface MessageContentTextAnnotationsFileCitationObject {
        end_index: number;

        file_citation: MessageContentTextAnnotationsFileCitationObject.FileCitation;

        start_index: number;

        /**
         * The text in the message content that needs to be replaced.
         */
        text: string;

        /**
         * Always `file_citation`.
         */
        type: 'file_citation';
      }

      export namespace MessageContentTextAnnotationsFileCitationObject {
        export interface FileCitation {
          /**
           * The ID of the specific File the citation is from.
           */
          file_id: string;
        }
      }

      /**
       * A URL for the file that's generated when the assistant used the
       * `code_interpreter` tool to generate a file.
       */
      export interface MessageContentTextAnnotationsFilePathObject {
        end_index: number;

        file_path: MessageContentTextAnnotationsFilePathObject.FilePath;

        start_index: number;

        /**
         * The text in the message content that needs to be replaced.
         */
        text: string;

        /**
         * Always `file_path`.
         */
        type: 'file_path';
      }

      export namespace MessageContentTextAnnotationsFilePathObject {
        export interface FilePath {
          /**
           * The ID of the file that was generated.
           */
          file_id: string;
        }
      }
    }
  }

  /**
   * The refusal content generated by the assistant.
   */
  export interface MessageContentRefusalObject {
    refusal: string;

    /**
     * Always `refusal`.
     */
    type: 'refusal';
  }

  /**
   * On an incomplete message, details about why the message is incomplete.
   */
  export interface IncompleteDetails {
    /**
     * The reason the message is incomplete.
     */
    reason: 'content_filter' | 'max_tokens' | 'run_cancelled' | 'run_expired' | 'run_failed';
  }
}

export interface MessageListResponse {
  data: Array<MessageObject>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: string;
}

export interface MessageDeleteResponse {
  id: string;

  deleted: boolean;

  object: 'thread.message.deleted';
}

export interface MessageCreateParams {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata?: unknown | null;
}

export interface MessageListParams {
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
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100, and the default is 20.
   */
  limit?: number;

  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending
   * order and `desc` for descending order.
   */
  order?: 'asc' | 'desc';

  /**
   * Filter messages by the run ID that generated them.
   */
  run_id?: string;
}

export declare namespace Messages {
  export {
    type MessageObject as MessageObject,
    type MessageListResponse as MessageListResponse,
    type MessageDeleteResponse as MessageDeleteResponse,
    type MessageCreateParams as MessageCreateParams,
    type MessageListParams as MessageListParams,
  };
}
