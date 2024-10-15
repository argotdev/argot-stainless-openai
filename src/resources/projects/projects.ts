// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as ProjectsAPI from './projects';
import * as APIKeysAPI from './api-keys';
import * as ServiceAccountsAPI from './service-accounts';
import * as UsersAPI from './users';

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

export namespace Projects {
  export import Project = ProjectsAPI.Project;
  export import ProjectListResponse = ProjectsAPI.ProjectListResponse;
  export import ProjectCreateParams = ProjectsAPI.ProjectCreateParams;
  export import ProjectListParams = ProjectsAPI.ProjectListParams;
  export import Users = UsersAPI.Users;
  export import ProjectUser = UsersAPI.ProjectUser;
  export import UserListResponse = UsersAPI.UserListResponse;
  export import UserDeleteResponse = UsersAPI.UserDeleteResponse;
  export import UserCreateParams = UsersAPI.UserCreateParams;
  export import UserListParams = UsersAPI.UserListParams;
  export import ServiceAccounts = ServiceAccountsAPI.ServiceAccounts;
  export import ProjectServiceAccount = ServiceAccountsAPI.ProjectServiceAccount;
  export import ServiceAccountCreateResponse = ServiceAccountsAPI.ServiceAccountCreateResponse;
  export import ServiceAccountListResponse = ServiceAccountsAPI.ServiceAccountListResponse;
  export import ServiceAccountDeleteResponse = ServiceAccountsAPI.ServiceAccountDeleteResponse;
  export import ServiceAccountCreateParams = ServiceAccountsAPI.ServiceAccountCreateParams;
  export import ServiceAccountListParams = ServiceAccountsAPI.ServiceAccountListParams;
  export import APIKeys = APIKeysAPI.APIKeys;
  export import ProjectAPIKey = APIKeysAPI.ProjectAPIKey;
  export import APIKeyListResponse = APIKeysAPI.APIKeyListResponse;
  export import APIKeyDeleteResponse = APIKeysAPI.APIKeyDeleteResponse;
  export import APIKeyListParams = APIKeysAPI.APIKeyListParams;
}
