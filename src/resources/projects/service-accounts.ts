// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as ServiceAccountsAPI from './service-accounts';

export class ServiceAccounts extends APIResource {
  /**
   * Creates a new service account in the project. This also returns an unredacted
   * API key for the service account.
   */
  create(
    projectId: string,
    body: ServiceAccountCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ServiceAccountCreateResponse> {
    return this._client.post(`/organization/projects/${projectId}/service_accounts`, { body, ...options });
  }

  /**
   * Retrieves a service account in the project.
   */
  retrieve(
    projectId: string,
    serviceAccountId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProjectServiceAccount> {
    return this._client.get(
      `/organization/projects/${projectId}/service_accounts/${serviceAccountId}`,
      options,
    );
  }

  /**
   * Returns a list of service accounts in the project.
   */
  list(
    projectId: string,
    query?: ServiceAccountListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ServiceAccountListResponse>;
  list(projectId: string, options?: Core.RequestOptions): Core.APIPromise<ServiceAccountListResponse>;
  list(
    projectId: string,
    query: ServiceAccountListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ServiceAccountListResponse> {
    if (isRequestOptions(query)) {
      return this.list(projectId, {}, query);
    }
    return this._client.get(`/organization/projects/${projectId}/service_accounts`, { query, ...options });
  }

  /**
   * Deletes a service account from the project.
   */
  delete(
    projectId: string,
    serviceAccountId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ServiceAccountDeleteResponse> {
    return this._client.delete(
      `/organization/projects/${projectId}/service_accounts/${serviceAccountId}`,
      options,
    );
  }
}

/**
 * Represents an individual service account in a project.
 */
export interface ProjectServiceAccount {
  /**
   * The identifier, which can be referenced in API endpoints
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) of when the service account was created
   */
  created_at: number;

  /**
   * The name of the service account
   */
  name: string;

  /**
   * The object type, which is always `organization.project.service_account`
   */
  object: 'organization.project.service_account';

  /**
   * `owner` or `member`
   */
  role: 'owner' | 'member';
}

export interface ServiceAccountCreateResponse {
  id: string;

  api_key: ServiceAccountCreateResponse.APIKey;

  created_at: number;

  name: string;

  object: 'organization.project.service_account';

  /**
   * Service accounts can only have one role of type `member`
   */
  role: 'member';
}

export namespace ServiceAccountCreateResponse {
  export interface APIKey {
    id: string;

    created_at: number;

    name: string;

    /**
     * The object type, which is always `organization.project.service_account.api_key`
     */
    object: 'organization.project.service_account.api_key';

    value: string;
  }
}

export interface ServiceAccountListResponse {
  data: Array<ProjectServiceAccount>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: 'list';
}

export interface ServiceAccountDeleteResponse {
  id: string;

  deleted: boolean;

  object: 'organization.project.service_account.deleted';
}

export interface ServiceAccountCreateParams {
  /**
   * The name of the service account being created.
   */
  name: string;
}

export interface ServiceAccountListParams {
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

export namespace ServiceAccounts {
  export import ProjectServiceAccount = ServiceAccountsAPI.ProjectServiceAccount;
  export import ServiceAccountCreateResponse = ServiceAccountsAPI.ServiceAccountCreateResponse;
  export import ServiceAccountListResponse = ServiceAccountsAPI.ServiceAccountListResponse;
  export import ServiceAccountDeleteResponse = ServiceAccountsAPI.ServiceAccountDeleteResponse;
  export import ServiceAccountCreateParams = ServiceAccountsAPI.ServiceAccountCreateParams;
  export import ServiceAccountListParams = ServiceAccountsAPI.ServiceAccountListParams;
}
