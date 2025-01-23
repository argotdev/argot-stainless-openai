// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class Users extends APIResource {
  /**
   * Modifies a user's role in the project.
   */
  create(
    projectId: string,
    userId: string,
    body: UserCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProjectUser> {
    return this._client.post(`/organization/projects/${projectId}/users/${userId}`, { body, ...options });
  }

  /**
   * Retrieves a user in the project.
   */
  retrieve(projectId: string, userId: string, options?: Core.RequestOptions): Core.APIPromise<ProjectUser> {
    return this._client.get(`/organization/projects/${projectId}/users/${userId}`, options);
  }

  /**
   * Returns a list of users in the project.
   */
  list(
    projectId: string,
    query?: UserListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<UserListResponse>;
  list(projectId: string, options?: Core.RequestOptions): Core.APIPromise<UserListResponse>;
  list(
    projectId: string,
    query: UserListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<UserListResponse> {
    if (isRequestOptions(query)) {
      return this.list(projectId, {}, query);
    }
    return this._client.get(`/organization/projects/${projectId}/users`, { query, ...options });
  }

  /**
   * Deletes a user from the project.
   */
  delete(
    projectId: string,
    userId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<UserDeleteResponse> {
    return this._client.delete(`/organization/projects/${projectId}/users/${userId}`, options);
  }
}

/**
 * Represents an individual user in a project.
 */
export interface ProjectUser {
  /**
   * The identifier, which can be referenced in API endpoints
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) of when the project was added.
   */
  added_at: number;

  /**
   * The email address of the user
   */
  email: string;

  /**
   * The name of the user
   */
  name: string;

  /**
   * The object type, which is always `organization.project.user`
   */
  object: 'organization.project.user';

  /**
   * `owner` or `member`
   */
  role: 'owner' | 'member';
}

export interface UserListResponse {
  data: Array<ProjectUser>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: string;
}

export interface UserDeleteResponse {
  id: string;

  deleted: boolean;

  object: 'organization.project.user.deleted';
}

export interface UserCreateParams {
  /**
   * `owner` or `member`
   */
  role: 'owner' | 'member';
}

export interface UserListParams {
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place
   * in the list. For instance, if you make a list request and receive 100 objects,
   * ending with obj_foo, your subsequent call can include after=obj_foo in order to
   * fetch the next page of the list.
   */
  after?: string;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100, and the default is 20.
   */
  limit?: number;
}

export declare namespace Users {
  export {
    type ProjectUser as ProjectUser,
    type UserListResponse as UserListResponse,
    type UserDeleteResponse as UserDeleteResponse,
    type UserCreateParams as UserCreateParams,
    type UserListParams as UserListParams,
  };
}
