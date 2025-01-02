// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Invites extends APIResource {
  /**
   * Create an invite for a user to the organization. The invite must be accepted by
   * the user before they have access to the organization.
   */
  create(body: InviteCreateParams, options?: Core.RequestOptions): Core.APIPromise<Invite> {
    return this._client.post('/organization/invites', { body, ...options });
  }

  /**
   * Retrieves an invite.
   */
  retrieve(inviteId: string, options?: Core.RequestOptions): Core.APIPromise<Invite> {
    return this._client.get(`/organization/invites/${inviteId}`, options);
  }

  /**
   * Delete an invite. If the invite has already been accepted, it cannot be deleted.
   */
  delete(inviteId: string, options?: Core.RequestOptions): Core.APIPromise<InviteDeleteResponse> {
    return this._client.delete(`/organization/invites/${inviteId}`, options);
  }
}

/**
 * Represents an individual `invite` to the organization.
 */
export interface Invite {
  /**
   * The identifier, which can be referenced in API endpoints
   */
  id: string;

  /**
   * The email address of the individual to whom the invite was sent
   */
  email: string;

  /**
   * The Unix timestamp (in seconds) of when the invite expires.
   */
  expires_at: number;

  /**
   * The Unix timestamp (in seconds) of when the invite was sent.
   */
  invited_at: number;

  /**
   * The object type, which is always `organization.invite`
   */
  object: 'organization.invite';

  /**
   * `owner` or `reader`
   */
  role: 'owner' | 'reader';

  /**
   * `accepted`,`expired`, or `pending`
   */
  status: 'accepted' | 'expired' | 'pending';

  /**
   * The Unix timestamp (in seconds) of when the invite was accepted.
   */
  accepted_at?: number;
}

export interface InviteDeleteResponse {
  id: string;

  deleted: boolean;

  /**
   * The object type, which is always `organization.invite.deleted`
   */
  object: 'organization.invite.deleted';
}

export interface InviteCreateParams {
  /**
   * Send an email to this address
   */
  email: string;

  /**
   * `owner` or `reader`
   */
  role: 'reader' | 'owner';
}

export declare namespace Invites {
  export {
    type Invite as Invite,
    type InviteDeleteResponse as InviteDeleteResponse,
    type InviteCreateParams as InviteCreateParams,
  };
}
