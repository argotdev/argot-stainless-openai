// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as OrganizationInvitesAPI from './invites';
import * as InvitesAPI from '../invites';

export class Invites extends APIResource {
  /**
   * Returns a list of invites in the organization.
   */
  list(query?: InviteListParams, options?: Core.RequestOptions): Core.APIPromise<InviteListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<InviteListResponse>;
  list(
    query: InviteListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<InviteListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/organization/invites', { query, ...options });
  }
}

export interface InviteListResponse {
  data: Array<InvitesAPI.Invite>;

  /**
   * The object type, which is always `list`
   */
  object: 'list';

  /**
   * The first `invite_id` in the retrieved `list`
   */
  first_id?: string;

  /**
   * The `has_more` property is used for pagination to indicate there are additional
   * results.
   */
  has_more?: boolean;

  /**
   * The last `invite_id` in the retrieved `list`
   */
  last_id?: string;
}

export interface InviteListParams {
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

export namespace Invites {
  export import InviteListResponse = OrganizationInvitesAPI.InviteListResponse;
  export import InviteListParams = OrganizationInvitesAPI.InviteListParams;
}
