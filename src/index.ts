// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as qs from './internal/qs';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  AssistantCreateParams,
  AssistantDeleteResponse,
  AssistantListParams,
  AssistantListResponse,
  AssistantObject,
  Assistants,
} from './resources/assistants';
import { Batch, BatchCreateParams, BatchListParams, BatchListResponse, Batches } from './resources/batches';
import { Chat, ChatCompletionsParams, ChatCompletionsResponse } from './resources/chat';
import { CompletionCreateParams, CompletionCreateResponse, Completions } from './resources/completions';
import { EmbeddingCreateParams, EmbeddingCreateResponse, Embeddings } from './resources/embeddings';
import { Invite, InviteCreateParams, InviteDeleteResponse, Invites } from './resources/invites';
import { Model, ModelDeleteResponse, ModelListResponse, Models } from './resources/models';
import { ModerationCreateParams, ModerationCreateResponse, Moderations } from './resources/moderations';
import {
  User,
  UserCreateParams,
  UserDeleteResponse,
  UserListParams,
  UserListResponse,
  Users,
} from './resources/users';
import { Audio, AudioSpeechParams } from './resources/audio/audio';
import {
  FileCreateParams,
  FileDeleteResponse,
  FileListParams,
  FileListResponse,
  Files,
  OpenAIFile,
} from './resources/files/files';
import { FineTuning } from './resources/fine-tuning/fine-tuning';
import { Images } from './resources/images/images';
import { Organization } from './resources/organization/organization';
import {
  Project,
  ProjectCreateParams,
  ProjectListParams,
  ProjectListResponse,
  Projects,
} from './resources/projects/projects';
import {
  ThreadCreateParams,
  ThreadDeleteResponse,
  ThreadObject,
  ThreadUpdateParams,
  Threads,
} from './resources/threads/threads';
import {
  Upload,
  UploadCompleteParams,
  UploadCreateParams,
  Uploads as UploadsAPIUploads,
} from './resources/uploads/uploads';
import {
  VectorStoreCreateParams,
  VectorStoreDeleteResponse,
  VectorStoreListParams,
  VectorStoreListResponse,
  VectorStoreObject,
  VectorStores,
} from './resources/vector-stores/vector-stores';

export interface ClientOptions {
  /**
   * A token value required for HTTP Bearer authentication
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['ARGOT_OPENAI_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

/**
 * API Client for interfacing with the Argot OpenAI API.
 */
export class ArgotOpenAI extends Core.APIClient {
  apiKey: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Argot OpenAI API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['API_KEY'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['ARGOT_OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('ARGOT_OPENAI_BASE_URL'),
    apiKey = Core.readEnv('API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.ArgotOpenAIError(
        "The API_KEY environment variable is missing or empty; either provide it, or instantiate the ArgotOpenAI client with an apiKey option, like new ArgotOpenAI({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.openai.com/v1`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  chat: API.Chat = new API.Chat(this);
  completions: API.Completions = new API.Completions(this);
  images: API.Images = new API.Images(this);
  embeddings: API.Embeddings = new API.Embeddings(this);
  audio: API.Audio = new API.Audio(this);
  files: API.Files = new API.Files(this);
  uploads: API.Uploads = new API.Uploads(this);
  fineTuning: API.FineTuning = new API.FineTuning(this);
  models: API.Models = new API.Models(this);
  moderations: API.Moderations = new API.Moderations(this);
  assistants: API.Assistants = new API.Assistants(this);
  threads: API.Threads = new API.Threads(this);
  vectorStores: API.VectorStores = new API.VectorStores(this);
  batches: API.Batches = new API.Batches(this);
  organization: API.Organization = new API.Organization(this);
  invites: API.Invites = new API.Invites(this);
  users: API.Users = new API.Users(this);
  projects: API.Projects = new API.Projects(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  protected override stringifyQuery(query: Record<string, unknown>): string {
    return qs.stringify(query, { arrayFormat: 'comma' });
  }

  static ArgotOpenAI = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static ArgotOpenAIError = Errors.ArgotOpenAIError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

ArgotOpenAI.Chat = Chat;
ArgotOpenAI.Completions = Completions;
ArgotOpenAI.Images = Images;
ArgotOpenAI.Embeddings = Embeddings;
ArgotOpenAI.Audio = Audio;
ArgotOpenAI.Files = Files;
ArgotOpenAI.Uploads = UploadsAPIUploads;
ArgotOpenAI.FineTuning = FineTuning;
ArgotOpenAI.Models = Models;
ArgotOpenAI.Moderations = Moderations;
ArgotOpenAI.Assistants = Assistants;
ArgotOpenAI.Threads = Threads;
ArgotOpenAI.VectorStores = VectorStores;
ArgotOpenAI.Batches = Batches;
ArgotOpenAI.Organization = Organization;
ArgotOpenAI.Invites = Invites;
ArgotOpenAI.Users = Users;
ArgotOpenAI.Projects = Projects;
export declare namespace ArgotOpenAI {
  export type RequestOptions = Core.RequestOptions;

  export {
    Chat as Chat,
    type ChatCompletionsResponse as ChatCompletionsResponse,
    type ChatCompletionsParams as ChatCompletionsParams,
  };

  export {
    Completions as Completions,
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
  };

  export { Images as Images };

  export {
    Embeddings as Embeddings,
    type EmbeddingCreateResponse as EmbeddingCreateResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };

  export { Audio as Audio, type AudioSpeechParams as AudioSpeechParams };

  export {
    Files as Files,
    type OpenAIFile as OpenAIFile,
    type FileListResponse as FileListResponse,
    type FileDeleteResponse as FileDeleteResponse,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };

  export {
    UploadsAPIUploads as Uploads,
    type Upload as Upload,
    type UploadCreateParams as UploadCreateParams,
    type UploadCompleteParams as UploadCompleteParams,
  };

  export { FineTuning as FineTuning };

  export {
    Models as Models,
    type Model as Model,
    type ModelListResponse as ModelListResponse,
    type ModelDeleteResponse as ModelDeleteResponse,
  };

  export {
    Moderations as Moderations,
    type ModerationCreateResponse as ModerationCreateResponse,
    type ModerationCreateParams as ModerationCreateParams,
  };

  export {
    Assistants as Assistants,
    type AssistantObject as AssistantObject,
    type AssistantListResponse as AssistantListResponse,
    type AssistantDeleteResponse as AssistantDeleteResponse,
    type AssistantCreateParams as AssistantCreateParams,
    type AssistantListParams as AssistantListParams,
  };

  export {
    Threads as Threads,
    type ThreadObject as ThreadObject,
    type ThreadDeleteResponse as ThreadDeleteResponse,
    type ThreadCreateParams as ThreadCreateParams,
    type ThreadUpdateParams as ThreadUpdateParams,
  };

  export {
    VectorStores as VectorStores,
    type VectorStoreObject as VectorStoreObject,
    type VectorStoreListResponse as VectorStoreListResponse,
    type VectorStoreDeleteResponse as VectorStoreDeleteResponse,
    type VectorStoreCreateParams as VectorStoreCreateParams,
    type VectorStoreListParams as VectorStoreListParams,
  };

  export {
    Batches as Batches,
    type Batch as Batch,
    type BatchListResponse as BatchListResponse,
    type BatchCreateParams as BatchCreateParams,
    type BatchListParams as BatchListParams,
  };

  export { Organization as Organization };

  export {
    Invites as Invites,
    type Invite as Invite,
    type InviteDeleteResponse as InviteDeleteResponse,
    type InviteCreateParams as InviteCreateParams,
  };

  export {
    Users as Users,
    type User as User,
    type UserListResponse as UserListResponse,
    type UserDeleteResponse as UserDeleteResponse,
    type UserCreateParams as UserCreateParams,
    type UserListParams as UserListParams,
  };

  export {
    Projects as Projects,
    type Project as Project,
    type ProjectListResponse as ProjectListResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectListParams as ProjectListParams,
  };

  export type ImagesResponse = API.ImagesResponse;
}

export { toFile, fileFromPath } from './uploads';
export {
  ArgotOpenAIError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default ArgotOpenAI;
