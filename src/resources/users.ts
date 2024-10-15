// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as UsersAPI from './users';

export class Users extends APIResource {
  /**
   * Modifies a user's role in the organization.
   */
  create(userId: string, body: UserCreateParams, options?: Core.RequestOptions): Core.APIPromise<User> {
    return this._client.post(`/organization/users/${userId}`, { body, ...options });
  }

  /**
   * Retrieves a user by their identifier.
   */
  retrieve(userId: string, options?: Core.RequestOptions): Core.APIPromise<User> {
    return this._client.get(`/organization/users/${userId}`, options);
  }

  /**
   * Lists all of the users in the organization.
   */
  list(query?: UserListParams, options?: Core.RequestOptions): Core.APIPromise<UserListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<UserListResponse>;
  list(
    query: UserListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<UserListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/organization/users', { query, ...options });
  }

  /**
   * Deletes a user from the organization.
   */
  delete(userId: string, options?: Core.RequestOptions): Core.APIPromise<UserDeleteResponse> {
    return this._client.delete(`/organization/users/${userId}`, options);
  }
}

/**
 * Represents an individual `user` within an organization.
 */
export interface User {
  /**
   * The identifier, which can be referenced in API endpoints
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) of when the user was added.
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
   * The object type, which is always `organization.user`
   */
  object: 'organization.user';

  /**
   * `owner` or `reader`
   */
  role: 'owner' | 'reader';
}

export interface UserListResponse {
  data: Array<User>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: 'list';
}

export interface UserDeleteResponse {
  id: string;

  deleted: boolean;

  object: 'organization.user.deleted';
}

export interface UserCreateParams {
  /**
   * `owner` or `reader`
   */
  role: 'owner' | 'reader';
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

export namespace Users {
  export import User = UsersAPI.User;
  export import UserListResponse = UsersAPI.UserListResponse;
  export import UserDeleteResponse = UsersAPI.UserDeleteResponse;
  export import UserCreateParams = UsersAPI.UserCreateParams;
  export import UserListParams = UsersAPI.UserListParams;
}
