// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as AuditLogsAPI from './audit-logs';
import { AuditLogListParams, AuditLogListResponse, AuditLogs } from './audit-logs';
import * as InvitesAPI from './invites';
import { InviteListParams, InviteListResponse, Invites } from './invites';

export class Organization extends APIResource {
  auditLogs: AuditLogsAPI.AuditLogs = new AuditLogsAPI.AuditLogs(this._client);
  invites: InvitesAPI.Invites = new InvitesAPI.Invites(this._client);
}

Organization.AuditLogs = AuditLogs;
Organization.Invites = Invites;

export declare namespace Organization {
  export {
    AuditLogs as AuditLogs,
    type AuditLogListResponse as AuditLogListResponse,
    type AuditLogListParams as AuditLogListParams,
  };

  export {
    Invites as Invites,
    type InviteListResponse as InviteListResponse,
    type InviteListParams as InviteListParams,
  };
}
