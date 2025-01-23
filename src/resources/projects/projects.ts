// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as APIKeysAPI from './api-keys';
import {
  APIKeyDeleteResponse,
  APIKeyListParams,
  APIKeyListResponse,
  APIKeys,
  ProjectAPIKey,
} from './api-keys';
import * as ServiceAccountsAPI from './service-accounts';
import {
  ProjectServiceAccount,
  ServiceAccountCreateParams,
  ServiceAccountCreateResponse,
  ServiceAccountDeleteResponse,
  ServiceAccountListParams,
  ServiceAccountListResponse,
  ServiceAccounts,
} from './service-accounts';
import * as UsersAPI from './users';
import {
  ProjectUser,
  UserCreateParams,
  UserDeleteResponse,
  UserListParams,
  UserListResponse,
  Users,
} from './users';

export class Projects extends APIResource {
  users: UsersAPI.Users = new UsersAPI.Users(this._client);
  serviceAccounts: ServiceAccountsAPI.ServiceAccounts = new ServiceAccountsAPI.ServiceAccounts(this._client);
  apiKeys: APIKeysAPI.APIKeys = new APIKeysAPI.APIKeys(this._client);

  /**
   * Modifies a project in the organization.
   */
  create(
    projectId: string,
    body: ProjectCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Project> {
    return this._client.post(`/organization/projects/${projectId}`, { body, ...options });
  }

  /**
   * Retrieves a project.
   */
  retrieve(projectId: string, options?: Core.RequestOptions): Core.APIPromise<Project> {
    return this._client.get(`/organization/projects/${projectId}`, options);
  }

  /**
   * Returns a list of projects.
   */
  list(query?: ProjectListParams, options?: Core.RequestOptions): Core.APIPromise<ProjectListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<ProjectListResponse>;
  list(
    query: ProjectListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProjectListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/organization/projects', { query, ...options });
  }

  /**
   * Archives a project in the organization. Archived projects cannot be used or
   * updated.
   */
  archive(projectId: string, options?: Core.RequestOptions): Core.APIPromise<Project> {
    return this._client.post(`/organization/projects/${projectId}/archive`, options);
  }
}

/**
 * Represents an individual project.
 */
export interface Project {
  /**
   * The identifier, which can be referenced in API endpoints
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) of when the project was created.
   */
  created_at: number;

  /**
   * The name of the project. This appears in reporting.
   */
  name: string;

  /**
   * The object type, which is always `organization.project`
   */
  object: 'organization.project';

  /**
   * `active` or `archived`
   */
  status: 'active' | 'archived';

  /**
   * The Unix timestamp (in seconds) of when the project was archived or `null`.
   */
  archived_at?: number | null;
}

export interface ProjectListResponse {
  data: Array<Project>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: 'list';
}

export interface ProjectCreateParams {
  /**
   * The updated name of the project, this name appears in reports.
   */
  name: string;
}

export interface ProjectListParams {
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place
   * in the list. For instance, if you make a list request and receive 100 objects,
   * ending with obj_foo, your subsequent call can include after=obj_foo in order to
   * fetch the next page of the list.
   */
  after?: string;

  /**
   * If `true` returns all projects including those that have been `archived`.
   * Archived projects are not included by default.
   */
  include_archived?: boolean;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100, and the default is 20.
   */
  limit?: number;
}

Projects.Users = Users;
Projects.ServiceAccounts = ServiceAccounts;
Projects.APIKeys = APIKeys;

export declare namespace Projects {
  export {
    type Project as Project,
    type ProjectListResponse as ProjectListResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectListParams as ProjectListParams,
  };

  export {
    Users as Users,
    type ProjectUser as ProjectUser,
    type UserListResponse as UserListResponse,
    type UserDeleteResponse as UserDeleteResponse,
    type UserCreateParams as UserCreateParams,
    type UserListParams as UserListParams,
  };

  export {
    ServiceAccounts as ServiceAccounts,
    type ProjectServiceAccount as ProjectServiceAccount,
    type ServiceAccountCreateResponse as ServiceAccountCreateResponse,
    type ServiceAccountListResponse as ServiceAccountListResponse,
    type ServiceAccountDeleteResponse as ServiceAccountDeleteResponse,
    type ServiceAccountCreateParams as ServiceAccountCreateParams,
    type ServiceAccountListParams as ServiceAccountListParams,
  };

  export {
    APIKeys as APIKeys,
    type ProjectAPIKey as ProjectAPIKey,
    type APIKeyListResponse as APIKeyListResponse,
    type APIKeyDeleteResponse as APIKeyDeleteResponse,
    type APIKeyListParams as APIKeyListParams,
  };
}
