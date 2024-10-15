// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as AssistantsAPI from './assistants';

export class Assistants extends APIResource {
  /**
   * Modifies an assistant.
   */
  create(
    assistantId: string,
    body: AssistantCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AssistantObject> {
    return this._client.post(`/assistants/${assistantId}`, { body, ...options });
  }

  /**
   * Retrieves an assistant.
   */
  retrieve(assistantId: string, options?: Core.RequestOptions): Core.APIPromise<AssistantObject> {
    return this._client.get(`/assistants/${assistantId}`, options);
  }

  /**
   * Returns a list of assistants.
   */
  list(query?: AssistantListParams, options?: Core.RequestOptions): Core.APIPromise<AssistantListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<AssistantListResponse>;
  list(
    query: AssistantListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<AssistantListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/assistants', { query, ...options });
  }

  /**
   * Delete an assistant.
   */
  delete(assistantId: string, options?: Core.RequestOptions): Core.APIPromise<AssistantDeleteResponse> {
    return this._client.delete(`/assistants/${assistantId}`, options);
  }
}

/**
 * Represents an `assistant` that can call the model and use tools.
 */
export interface AssistantObject {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) for when the assistant was created.
   */
  created_at: number;

  /**
   * The description of the assistant. The maximum length is 512 characters.
   */
  description: string | null;

  /**
   * The system instructions that the assistant uses. The maximum length is 256,000
   * characters.
   */
  instructions: string | null;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata: unknown | null;

  /**
   * ID of the model to use. You can use the
   * [List models](/docs/api-reference/models/list) API to see all of your available
   * models, or see our [Model overview](/docs/models/overview) for descriptions of
   * them.
   */
  model: string;

  /**
   * The name of the assistant. The maximum length is 256 characters.
   */
  name: string | null;

  /**
   * The object type, which is always `assistant`.
   */
  object: 'assistant';

  /**
   * A list of tool enabled on the assistant. There can be a maximum of 128 tools per
   * assistant. Tools can be of types `code_interpreter`, `file_search`, or
   * `function`.
   */
  tools: Array<
    | AssistantObject.AssistantToolsCode
    | AssistantObject.AssistantToolsFileSearch
    | AssistantObject.AssistantToolsFunction
  >;

  /**
   * Specifies the format that the model must output. Compatible with
   * [GPT-4o](/docs/models/gpt-4o),
   * [GPT-4 Turbo](/docs/models/gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models
   * since `gpt-3.5-turbo-1106`.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured
   * Outputs which ensures the model will match your supplied JSON schema. Learn more
   * in the [Structured Outputs guide](/docs/guides/structured-outputs).
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the
   * message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to
   * produce JSON yourself via a system or user message. Without this, the model may
   * generate an unending stream of whitespace until the generation reaches the token
   * limit, resulting in a long-running and seemingly "stuck" request. Also note that
   * the message content may be partially cut off if `finish_reason="length"`, which
   * indicates the generation exceeded `max_tokens` or the conversation exceeded the
   * max context length.
   */
  response_format?:
    | 'auto'
    | AssistantObject.ResponseFormatText
    | AssistantObject.ResponseFormatJsonObject
    | AssistantObject.ResponseFormatJsonSchema
    | null;

  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
   * make the output more random, while lower values like 0.2 will make it more
   * focused and deterministic.
   */
  temperature?: number | null;

  /**
   * A set of resources that are used by the assistant's tools. The resources are
   * specific to the type of tool. For example, the `code_interpreter` tool requires
   * a list of file IDs, while the `file_search` tool requires a list of vector store
   * IDs.
   */
  tool_resources?: AssistantObject.ToolResources | null;

  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the
   * model considers the results of the tokens with top_p probability mass. So 0.1
   * means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number | null;
}

export namespace AssistantObject {
  export interface AssistantToolsCode {
    /**
     * The type of tool being defined: `code_interpreter`
     */
    type: 'code_interpreter';
  }

  export interface AssistantToolsFileSearch {
    /**
     * The type of tool being defined: `file_search`
     */
    type: 'file_search';

    /**
     * Overrides for the file search tool.
     */
    file_search?: AssistantToolsFileSearch.FileSearch;
  }

  export namespace AssistantToolsFileSearch {
    /**
     * Overrides for the file search tool.
     */
    export interface FileSearch {
      /**
       * The maximum number of results the file search tool should output. The default is
       * 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between
       * 1 and 50 inclusive.
       *
       * Note that the file search tool may output fewer than `max_num_results` results.
       * See the
       * [file search tool documentation](/docs/assistants/tools/file-search/customizing-file-search-settings)
       * for more information.
       */
      max_num_results?: number;

      /**
       * The ranking options for the file search. If not specified, the file search tool
       * will use the `auto` ranker and a score_threshold of 0.
       *
       * See the
       * [file search tool documentation](/docs/assistants/tools/file-search/customizing-file-search-settings)
       * for more information.
       */
      ranking_options?: FileSearch.RankingOptions;
    }

    export namespace FileSearch {
      /**
       * The ranking options for the file search. If not specified, the file search tool
       * will use the `auto` ranker and a score_threshold of 0.
       *
       * See the
       * [file search tool documentation](/docs/assistants/tools/file-search/customizing-file-search-settings)
       * for more information.
       */
      export interface RankingOptions {
        /**
         * The score threshold for the file search. All values must be a floating point
         * number between 0 and 1.
         */
        score_threshold: number;

        /**
         * The ranker to use for the file search. If not specified will use the `auto`
         * ranker.
         */
        ranker?: 'auto' | 'default_2024_08_21';
      }
    }
  }

  export interface AssistantToolsFunction {
    function: AssistantToolsFunction.Function;

    /**
     * The type of tool being defined: `function`
     */
    type: 'function';
  }

  export namespace AssistantToolsFunction {
    export interface Function {
      /**
       * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
       * underscores and dashes, with a maximum length of 64.
       */
      name: string;

      /**
       * A description of what the function does, used by the model to choose when and
       * how to call the function.
       */
      description?: string;

      /**
       * The parameters the functions accepts, described as a JSON Schema object. See the
       * [guide](/docs/guides/function-calling) for examples, and the
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       *
       * Omitting `parameters` defines a function with an empty parameter list.
       */
      parameters?: Record<string, unknown>;

      /**
       * Whether to enable strict schema adherence when generating the function call. If
       * set to true, the model will follow the exact schema defined in the `parameters`
       * field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn
       * more about Structured Outputs in the
       * [function calling guide](docs/guides/function-calling).
       */
      strict?: boolean | null;
    }
  }

  export interface ResponseFormatText {
    /**
     * The type of response format being defined: `text`
     */
    type: 'text';
  }

  export interface ResponseFormatJsonObject {
    /**
     * The type of response format being defined: `json_object`
     */
    type: 'json_object';
  }

  export interface ResponseFormatJsonSchema {
    json_schema: ResponseFormatJsonSchema.JsonSchema;

    /**
     * The type of response format being defined: `json_schema`
     */
    type: 'json_schema';
  }

  export namespace ResponseFormatJsonSchema {
    export interface JsonSchema {
      /**
       * The name of the response format. Must be a-z, A-Z, 0-9, or contain underscores
       * and dashes, with a maximum length of 64.
       */
      name: string;

      /**
       * A description of what the response format is for, used by the model to determine
       * how to respond in the format.
       */
      description?: string;

      /**
       * The schema for the response format, described as a JSON Schema object.
       */
      schema?: Record<string, unknown>;

      /**
       * Whether to enable strict schema adherence when generating the output. If set to
       * true, the model will always follow the exact schema defined in the `schema`
       * field. Only a subset of JSON Schema is supported when `strict` is `true`. To
       * learn more, read the
       * [Structured Outputs guide](/docs/guides/structured-outputs).
       */
      strict?: boolean | null;
    }
  }

  /**
   * A set of resources that are used by the assistant's tools. The resources are
   * specific to the type of tool. For example, the `code_interpreter` tool requires
   * a list of file IDs, while the `file_search` tool requires a list of vector store
   * IDs.
   */
  export interface ToolResources {
    code_interpreter?: ToolResources.CodeInterpreter;

    file_search?: ToolResources.FileSearch;
  }

  export namespace ToolResources {
    export interface CodeInterpreter {
      /**
       * A list of [file](/docs/api-reference/files) IDs made available to the
       * `code_interpreter`` tool. There can be a maximum of 20 files associated with the
       * tool.
       */
      file_ids?: Array<string>;
    }

    export interface FileSearch {
      /**
       * The ID of the [vector store](/docs/api-reference/vector-stores/object) attached
       * to this assistant. There can be a maximum of 1 vector store attached to the
       * assistant.
       */
      vector_store_ids?: Array<string>;
    }
  }
}

export interface AssistantListResponse {
  data: Array<AssistantObject>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: string;
}

export interface AssistantDeleteResponse {
  id: string;

  deleted: boolean;

  object: 'assistant.deleted';
}

export interface AssistantCreateParams {
  /**
   * The description of the assistant. The maximum length is 512 characters.
   */
  description?: string | null;

  /**
   * The system instructions that the assistant uses. The maximum length is 256,000
   * characters.
   */
  instructions?: string | null;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata?: unknown | null;

  /**
   * ID of the model to use. You can use the
   * [List models](/docs/api-reference/models/list) API to see all of your available
   * models, or see our [Model overview](/docs/models/overview) for descriptions of
   * them.
   */
  model?: string;

  /**
   * The name of the assistant. The maximum length is 256 characters.
   */
  name?: string | null;

  /**
   * Specifies the format that the model must output. Compatible with
   * [GPT-4o](/docs/models/gpt-4o),
   * [GPT-4 Turbo](/docs/models/gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models
   * since `gpt-3.5-turbo-1106`.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured
   * Outputs which ensures the model will match your supplied JSON schema. Learn more
   * in the [Structured Outputs guide](/docs/guides/structured-outputs).
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the
   * message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to
   * produce JSON yourself via a system or user message. Without this, the model may
   * generate an unending stream of whitespace until the generation reaches the token
   * limit, resulting in a long-running and seemingly "stuck" request. Also note that
   * the message content may be partially cut off if `finish_reason="length"`, which
   * indicates the generation exceeded `max_tokens` or the conversation exceeded the
   * max context length.
   */
  response_format?:
    | 'auto'
    | AssistantCreateParams.ResponseFormatText
    | AssistantCreateParams.ResponseFormatJsonObject
    | AssistantCreateParams.ResponseFormatJsonSchema
    | null;

  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
   * make the output more random, while lower values like 0.2 will make it more
   * focused and deterministic.
   */
  temperature?: number | null;

  /**
   * A set of resources that are used by the assistant's tools. The resources are
   * specific to the type of tool. For example, the `code_interpreter` tool requires
   * a list of file IDs, while the `file_search` tool requires a list of vector store
   * IDs.
   */
  tool_resources?: AssistantCreateParams.ToolResources | null;

  /**
   * A list of tool enabled on the assistant. There can be a maximum of 128 tools per
   * assistant. Tools can be of types `code_interpreter`, `file_search`, or
   * `function`.
   */
  tools?: Array<
    | AssistantCreateParams.AssistantToolsCode
    | AssistantCreateParams.AssistantToolsFileSearch
    | AssistantCreateParams.AssistantToolsFunction
  >;

  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the
   * model considers the results of the tokens with top_p probability mass. So 0.1
   * means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number | null;
}

export namespace AssistantCreateParams {
  export interface ResponseFormatText {
    /**
     * The type of response format being defined: `text`
     */
    type: 'text';
  }

  export interface ResponseFormatJsonObject {
    /**
     * The type of response format being defined: `json_object`
     */
    type: 'json_object';
  }

  export interface ResponseFormatJsonSchema {
    json_schema: ResponseFormatJsonSchema.JsonSchema;

    /**
     * The type of response format being defined: `json_schema`
     */
    type: 'json_schema';
  }

  export namespace ResponseFormatJsonSchema {
    export interface JsonSchema {
      /**
       * The name of the response format. Must be a-z, A-Z, 0-9, or contain underscores
       * and dashes, with a maximum length of 64.
       */
      name: string;

      /**
       * A description of what the response format is for, used by the model to determine
       * how to respond in the format.
       */
      description?: string;

      /**
       * The schema for the response format, described as a JSON Schema object.
       */
      schema?: Record<string, unknown>;

      /**
       * Whether to enable strict schema adherence when generating the output. If set to
       * true, the model will always follow the exact schema defined in the `schema`
       * field. Only a subset of JSON Schema is supported when `strict` is `true`. To
       * learn more, read the
       * [Structured Outputs guide](/docs/guides/structured-outputs).
       */
      strict?: boolean | null;
    }
  }

  /**
   * A set of resources that are used by the assistant's tools. The resources are
   * specific to the type of tool. For example, the `code_interpreter` tool requires
   * a list of file IDs, while the `file_search` tool requires a list of vector store
   * IDs.
   */
  export interface ToolResources {
    code_interpreter?: ToolResources.CodeInterpreter;

    file_search?: ToolResources.FileSearch;
  }

  export namespace ToolResources {
    export interface CodeInterpreter {
      /**
       * Overrides the list of [file](/docs/api-reference/files) IDs made available to
       * the `code_interpreter` tool. There can be a maximum of 20 files associated with
       * the tool.
       */
      file_ids?: Array<string>;
    }

    export interface FileSearch {
      /**
       * Overrides the [vector store](/docs/api-reference/vector-stores/object) attached
       * to this assistant. There can be a maximum of 1 vector store attached to the
       * assistant.
       */
      vector_store_ids?: Array<string>;
    }
  }

  export interface AssistantToolsCode {
    /**
     * The type of tool being defined: `code_interpreter`
     */
    type: 'code_interpreter';
  }

  export interface AssistantToolsFileSearch {
    /**
     * The type of tool being defined: `file_search`
     */
    type: 'file_search';

    /**
     * Overrides for the file search tool.
     */
    file_search?: AssistantToolsFileSearch.FileSearch;
  }

  export namespace AssistantToolsFileSearch {
    /**
     * Overrides for the file search tool.
     */
    export interface FileSearch {
      /**
       * The maximum number of results the file search tool should output. The default is
       * 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between
       * 1 and 50 inclusive.
       *
       * Note that the file search tool may output fewer than `max_num_results` results.
       * See the
       * [file search tool documentation](/docs/assistants/tools/file-search/customizing-file-search-settings)
       * for more information.
       */
      max_num_results?: number;

      /**
       * The ranking options for the file search. If not specified, the file search tool
       * will use the `auto` ranker and a score_threshold of 0.
       *
       * See the
       * [file search tool documentation](/docs/assistants/tools/file-search/customizing-file-search-settings)
       * for more information.
       */
      ranking_options?: FileSearch.RankingOptions;
    }

    export namespace FileSearch {
      /**
       * The ranking options for the file search. If not specified, the file search tool
       * will use the `auto` ranker and a score_threshold of 0.
       *
       * See the
       * [file search tool documentation](/docs/assistants/tools/file-search/customizing-file-search-settings)
       * for more information.
       */
      export interface RankingOptions {
        /**
         * The score threshold for the file search. All values must be a floating point
         * number between 0 and 1.
         */
        score_threshold: number;

        /**
         * The ranker to use for the file search. If not specified will use the `auto`
         * ranker.
         */
        ranker?: 'auto' | 'default_2024_08_21';
      }
    }
  }

  export interface AssistantToolsFunction {
    function: AssistantToolsFunction.Function;

    /**
     * The type of tool being defined: `function`
     */
    type: 'function';
  }

  export namespace AssistantToolsFunction {
    export interface Function {
      /**
       * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
       * underscores and dashes, with a maximum length of 64.
       */
      name: string;

      /**
       * A description of what the function does, used by the model to choose when and
       * how to call the function.
       */
      description?: string;

      /**
       * The parameters the functions accepts, described as a JSON Schema object. See the
       * [guide](/docs/guides/function-calling) for examples, and the
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       *
       * Omitting `parameters` defines a function with an empty parameter list.
       */
      parameters?: Record<string, unknown>;

      /**
       * Whether to enable strict schema adherence when generating the function call. If
       * set to true, the model will follow the exact schema defined in the `parameters`
       * field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn
       * more about Structured Outputs in the
       * [function calling guide](docs/guides/function-calling).
       */
      strict?: boolean | null;
    }
  }
}

export interface AssistantListParams {
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
}

export namespace Assistants {
  export import AssistantObject = AssistantsAPI.AssistantObject;
  export import AssistantListResponse = AssistantsAPI.AssistantListResponse;
  export import AssistantDeleteResponse = AssistantsAPI.AssistantDeleteResponse;
  export import AssistantCreateParams = AssistantsAPI.AssistantCreateParams;
  export import AssistantListParams = AssistantsAPI.AssistantListParams;
}
