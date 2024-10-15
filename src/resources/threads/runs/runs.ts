// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as RunsAPI from './runs';
import * as StepsAPI from './steps';

export class Runs extends APIResource {
  steps: StepsAPI.Steps = new StepsAPI.Steps(this._client);

  /**
   * Modifies a run.
   */
  create(
    threadId: string,
    runId: string,
    body: RunCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<RunObject> {
    return this._client.post(`/threads/${threadId}/runs/${runId}`, { body, ...options });
  }

  /**
   * Retrieves a run.
   */
  retrieve(threadId: string, runId: string, options?: Core.RequestOptions): Core.APIPromise<RunObject> {
    return this._client.get(`/threads/${threadId}/runs/${runId}`, options);
  }

  /**
   * Returns a list of runs belonging to a thread.
   */
  list(
    threadId: string,
    query?: RunListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<RunListResponse>;
  list(threadId: string, options?: Core.RequestOptions): Core.APIPromise<RunListResponse>;
  list(
    threadId: string,
    query: RunListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<RunListResponse> {
    if (isRequestOptions(query)) {
      return this.list(threadId, {}, query);
    }
    return this._client.get(`/threads/${threadId}/runs`, { query, ...options });
  }

  /**
   * Cancels a run that is `in_progress`.
   */
  cancel(threadId: string, runId: string, options?: Core.RequestOptions): Core.APIPromise<RunObject> {
    return this._client.post(`/threads/${threadId}/runs/${runId}/cancel`, options);
  }

  /**
   * When a run has the `status: "requires_action"` and `required_action.type` is
   * `submit_tool_outputs`, this endpoint can be used to submit the outputs from the
   * tool calls once they're all completed. All outputs must be submitted in a single
   * request.
   */
  submitToolOutputs(
    threadId: string,
    runId: string,
    body: RunSubmitToolOutputsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<RunObject> {
    return this._client.post(`/threads/${threadId}/runs/${runId}/submit_tool_outputs`, { body, ...options });
  }
}

/**
 * Represents an execution run on a [thread](/docs/api-reference/threads).
 */
export interface RunObject {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;

  /**
   * The ID of the [assistant](/docs/api-reference/assistants) used for execution of
   * this run.
   */
  assistant_id: string;

  /**
   * The Unix timestamp (in seconds) for when the run was cancelled.
   */
  cancelled_at: number | null;

  /**
   * The Unix timestamp (in seconds) for when the run was completed.
   */
  completed_at: number | null;

  /**
   * The Unix timestamp (in seconds) for when the run was created.
   */
  created_at: number;

  /**
   * The Unix timestamp (in seconds) for when the run will expire.
   */
  expires_at: number | null;

  /**
   * The Unix timestamp (in seconds) for when the run failed.
   */
  failed_at: number | null;

  /**
   * Details on why the run is incomplete. Will be `null` if the run is not
   * incomplete.
   */
  incomplete_details: RunObject.IncompleteDetails | null;

  /**
   * The instructions that the [assistant](/docs/api-reference/assistants) used for
   * this run.
   */
  instructions: string;

  /**
   * The last error associated with this run. Will be `null` if there are no errors.
   */
  last_error: RunObject.LastError | null;

  /**
   * The maximum number of completion tokens specified to have been used over the
   * course of the run.
   */
  max_completion_tokens: number | null;

  /**
   * The maximum number of prompt tokens specified to have been used over the course
   * of the run.
   */
  max_prompt_tokens: number | null;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata: unknown | null;

  /**
   * The model that the [assistant](/docs/api-reference/assistants) used for this
   * run.
   */
  model: string;

  /**
   * The object type, which is always `thread.run`.
   */
  object: 'thread.run';

  /**
   * Whether to enable
   * [parallel function calling](/docs/guides/function-calling/parallel-function-calling)
   * during tool use.
   */
  parallel_tool_calls: boolean;

  /**
   * Details on the action required to continue the run. Will be `null` if no action
   * is required.
   */
  required_action: RunObject.RequiredAction | null;

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
  response_format:
    | 'auto'
    | RunObject.ResponseFormatText
    | RunObject.ResponseFormatJsonObject
    | RunObject.ResponseFormatJsonSchema
    | null;

  /**
   * The Unix timestamp (in seconds) for when the run was started.
   */
  started_at: number | null;

  /**
   * The status of the run, which can be either `queued`, `in_progress`,
   * `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`,
   * `incomplete`, or `expired`.
   */
  status:
    | 'queued'
    | 'in_progress'
    | 'requires_action'
    | 'cancelling'
    | 'cancelled'
    | 'failed'
    | 'completed'
    | 'incomplete'
    | 'expired';

  /**
   * The ID of the [thread](/docs/api-reference/threads) that was executed on as a
   * part of this run.
   */
  thread_id: string;

  /**
   * Controls which (if any) tool is called by the model. `none` means the model will
   * not call any tools and instead generates a message. `auto` is the default value
   * and means the model can pick between generating a message or calling one or more
   * tools. `required` means the model must call one or more tools before responding
   * to the user. Specifying a particular tool like `{"type": "file_search"}` or
   * `{"type": "function", "function": {"name": "my_function"}}` forces the model to
   * call that tool.
   */
  tool_choice: 'none' | 'auto' | 'required' | RunObject.AssistantsNamedToolChoice | null;

  /**
   * The list of tools that the [assistant](/docs/api-reference/assistants) used for
   * this run.
   */
  tools: Array<
    RunObject.AssistantToolsCode | RunObject.AssistantToolsFileSearch | RunObject.AssistantToolsFunction
  >;

  /**
   * Controls for how a thread will be truncated prior to the run. Use this to
   * control the intial context window of the run.
   */
  truncation_strategy: RunObject.TruncationStrategy | null;

  /**
   * Usage statistics related to the run. This value will be `null` if the run is not
   * in a terminal state (i.e. `in_progress`, `queued`, etc.).
   */
  usage: RunObject.Usage | null;

  /**
   * The sampling temperature used for this run. If not set, defaults to 1.
   */
  temperature?: number | null;

  /**
   * The nucleus sampling value used for this run. If not set, defaults to 1.
   */
  top_p?: number | null;
}

export namespace RunObject {
  /**
   * Details on why the run is incomplete. Will be `null` if the run is not
   * incomplete.
   */
  export interface IncompleteDetails {
    /**
     * The reason why the run is incomplete. This will point to which specific token
     * limit was reached over the course of the run.
     */
    reason?: 'max_completion_tokens' | 'max_prompt_tokens';
  }

  /**
   * The last error associated with this run. Will be `null` if there are no errors.
   */
  export interface LastError {
    /**
     * One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.
     */
    code: 'server_error' | 'rate_limit_exceeded' | 'invalid_prompt';

    /**
     * A human-readable description of the error.
     */
    message: string;
  }

  /**
   * Details on the action required to continue the run. Will be `null` if no action
   * is required.
   */
  export interface RequiredAction {
    /**
     * Details on the tool outputs needed for this run to continue.
     */
    submit_tool_outputs: RequiredAction.SubmitToolOutputs;

    /**
     * For now, this is always `submit_tool_outputs`.
     */
    type: 'submit_tool_outputs';
  }

  export namespace RequiredAction {
    /**
     * Details on the tool outputs needed for this run to continue.
     */
    export interface SubmitToolOutputs {
      /**
       * A list of the relevant tool calls.
       */
      tool_calls: Array<SubmitToolOutputs.ToolCall>;
    }

    export namespace SubmitToolOutputs {
      /**
       * Tool call objects
       */
      export interface ToolCall {
        /**
         * The ID of the tool call. This ID must be referenced when you submit the tool
         * outputs in using the
         * [Submit tool outputs to run](/docs/api-reference/runs/submitToolOutputs)
         * endpoint.
         */
        id: string;

        /**
         * The function definition.
         */
        function: ToolCall.Function;

        /**
         * The type of tool call the output is required for. For now, this is always
         * `function`.
         */
        type: 'function';
      }

      export namespace ToolCall {
        /**
         * The function definition.
         */
        export interface Function {
          /**
           * The arguments that the model expects you to pass to the function.
           */
          arguments: string;

          /**
           * The name of the function.
           */
          name: string;
        }
      }
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
   * Specifies a tool the model should use. Use to force the model to call a specific
   * tool.
   */
  export interface AssistantsNamedToolChoice {
    /**
     * The type of the tool. If type is `function`, the function name must be set
     */
    type: 'function' | 'code_interpreter' | 'file_search';

    function?: AssistantsNamedToolChoice.Function;
  }

  export namespace AssistantsNamedToolChoice {
    export interface Function {
      /**
       * The name of the function to call.
       */
      name: string;
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

  /**
   * Controls for how a thread will be truncated prior to the run. Use this to
   * control the intial context window of the run.
   */
  export interface TruncationStrategy {
    /**
     * The truncation strategy to use for the thread. The default is `auto`. If set to
     * `last_messages`, the thread will be truncated to the n most recent messages in
     * the thread. When set to `auto`, messages in the middle of the thread will be
     * dropped to fit the context length of the model, `max_prompt_tokens`.
     */
    type: 'auto' | 'last_messages';

    /**
     * The number of most recent messages from the thread when constructing the context
     * for the run.
     */
    last_messages?: number | null;
  }

  /**
   * Usage statistics related to the run. This value will be `null` if the run is not
   * in a terminal state (i.e. `in_progress`, `queued`, etc.).
   */
  export interface Usage {
    /**
     * Number of completion tokens used over the course of the run.
     */
    completion_tokens: number;

    /**
     * Number of prompt tokens used over the course of the run.
     */
    prompt_tokens: number;

    /**
     * Total number of tokens used (prompt + completion).
     */
    total_tokens: number;
  }
}

export interface RunListResponse {
  data: Array<RunObject>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: string;
}

export interface RunCreateParams {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata?: unknown | null;
}

export interface RunListParams {
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

export interface RunSubmitToolOutputsParams {
  /**
   * A list of tools for which the outputs are being submitted.
   */
  tool_outputs: Array<RunSubmitToolOutputsParams.ToolOutput>;

  /**
   * If `true`, returns a stream of events that happen during the Run as server-sent
   * events, terminating when the Run enters a terminal state with a `data: [DONE]`
   * message.
   */
  stream?: boolean | null;
}

export namespace RunSubmitToolOutputsParams {
  export interface ToolOutput {
    /**
     * The output of the tool call to be submitted to continue the run.
     */
    output?: string;

    /**
     * The ID of the tool call in the `required_action` object within the run object
     * the output is being submitted for.
     */
    tool_call_id?: string;
  }
}

export namespace Runs {
  export import RunObject = RunsAPI.RunObject;
  export import RunListResponse = RunsAPI.RunListResponse;
  export import RunCreateParams = RunsAPI.RunCreateParams;
  export import RunListParams = RunsAPI.RunListParams;
  export import RunSubmitToolOutputsParams = RunsAPI.RunSubmitToolOutputsParams;
  export import Steps = StepsAPI.Steps;
  export import RunStepObject = StepsAPI.RunStepObject;
  export import StepListResponse = StepsAPI.StepListResponse;
  export import StepRetrieveParams = StepsAPI.StepRetrieveParams;
  export import StepListParams = StepsAPI.StepListParams;
}
