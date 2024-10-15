// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as AuditLogsAPI from './audit-logs';
import * as InvitesAPI from './invites';

export class Organization extends APIResource {
  auditLogs: AuditLogsAPI.AuditLogs = new AuditLogsAPI.AuditLogs(this._client);
  invites: InvitesAPI.Invites = new InvitesAPI.Invites(this._client);
}

export namespace Organization {
  export import AuditLogs = AuditLogsAPI.AuditLogs;
  export import AuditLogListResponse = AuditLogsAPI.AuditLogListResponse;
  export import AuditLogListParams = AuditLogsAPI.AuditLogListParams;
  export import Invites = InvitesAPI.Invites;
  export import InviteListResponse = InvitesAPI.InviteListResponse;
  export import InviteListParams = InvitesAPI.InviteListParams;
}
