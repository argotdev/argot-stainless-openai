// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as AuditLogsAPI from './audit-logs';

export class AuditLogs extends APIResource {
  /**
   * List user actions and configuration changes within this organization.
   */
  list(query?: AuditLogListParams, options?: Core.RequestOptions): Core.APIPromise<AuditLogListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<AuditLogListResponse>;
  list(
    query: AuditLogListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuditLogListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/organization/audit_logs', { query, ...options });
  }
}

export interface AuditLogListResponse {
  data: Array<AuditLogListResponse.Data>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: 'list';
}

export namespace AuditLogListResponse {
  /**
   * A log of a user action or configuration change within this organization.
   */
  export interface Data {
    /**
     * The ID of this log.
     */
    id: string;

    /**
     * The actor who performed the audit logged action.
     */
    actor: Data.Actor;

    /**
     * The Unix timestamp (in seconds) of the event.
     */
    effective_at: number;

    /**
     * The event type.
     */
    type:
      | 'api_key.created'
      | 'api_key.updated'
      | 'api_key.deleted'
      | 'invite.sent'
      | 'invite.accepted'
      | 'invite.deleted'
      | 'login.succeeded'
      | 'login.failed'
      | 'logout.succeeded'
      | 'logout.failed'
      | 'organization.updated'
      | 'project.created'
      | 'project.updated'
      | 'project.archived'
      | 'service_account.created'
      | 'service_account.updated'
      | 'service_account.deleted'
      | 'user.added'
      | 'user.updated'
      | 'user.deleted';

    /**
     * The details for events with this `type`.
     */
    'api_key.created'?: Data.APIKeyCreated;

    /**
     * The details for events with this `type`.
     */
    'api_key.deleted'?: Data.APIKeyDeleted;

    /**
     * The details for events with this `type`.
     */
    'api_key.updated'?: Data.APIKeyUpdated;

    /**
     * The details for events with this `type`.
     */
    'invite.accepted'?: Data.InviteAccepted;

    /**
     * The details for events with this `type`.
     */
    'invite.deleted'?: Data.InviteDeleted;

    /**
     * The details for events with this `type`.
     */
    'invite.sent'?: Data.InviteSent;

    /**
     * The details for events with this `type`.
     */
    'login.failed'?: Data.LoginFailed;

    /**
     * The details for events with this `type`.
     */
    'logout.failed'?: Data.LogoutFailed;

    /**
     * The details for events with this `type`.
     */
    'organization.updated'?: Data.OrganizationUpdated;

    /**
     * The project that the action was scoped to. Absent for actions not scoped to
     * projects.
     */
    project?: Data.Project;

    /**
     * The details for events with this `type`.
     */
    'project.archived'?: Data.ProjectArchived;

    /**
     * The details for events with this `type`.
     */
    'project.created'?: Data.ProjectCreated;

    /**
     * The details for events with this `type`.
     */
    'project.updated'?: Data.ProjectUpdated;

    /**
     * The details for events with this `type`.
     */
    'service_account.created'?: Data.ServiceAccountCreated;

    /**
     * The details for events with this `type`.
     */
    'service_account.deleted'?: Data.ServiceAccountDeleted;

    /**
     * The details for events with this `type`.
     */
    'service_account.updated'?: Data.ServiceAccountUpdated;

    /**
     * The details for events with this `type`.
     */
    'user.added'?: Data.UserAdded;

    /**
     * The details for events with this `type`.
     */
    'user.deleted'?: Data.UserDeleted;

    /**
     * The details for events with this `type`.
     */
    'user.updated'?: Data.UserUpdated;
  }

  export namespace Data {
    /**
     * The actor who performed the audit logged action.
     */
    export interface Actor {
      /**
       * The API Key used to perform the audit logged action.
       */
      api_key?: Actor.APIKey;

      /**
       * The session in which the audit logged action was performed.
       */
      session?: Actor.Session;

      /**
       * The type of actor. Is either `session` or `api_key`.
       */
      type?: 'session' | 'api_key';
    }

    export namespace Actor {
      /**
       * The API Key used to perform the audit logged action.
       */
      export interface APIKey {
        /**
         * The tracking id of the API key.
         */
        id?: string;

        /**
         * The service account that performed the audit logged action.
         */
        service_account?: APIKey.ServiceAccount;

        /**
         * The type of API key. Can be either `user` or `service_account`.
         */
        type?: 'user' | 'service_account';

        /**
         * The user who performed the audit logged action.
         */
        user?: APIKey.User;
      }

      export namespace APIKey {
        /**
         * The service account that performed the audit logged action.
         */
        export interface ServiceAccount {
          /**
           * The service account id.
           */
          id?: string;
        }

        /**
         * The user who performed the audit logged action.
         */
        export interface User {
          /**
           * The user id.
           */
          id?: string;

          /**
           * The user email.
           */
          email?: string;
        }
      }

      /**
       * The session in which the audit logged action was performed.
       */
      export interface Session {
        /**
         * The IP address from which the action was performed.
         */
        ip_address?: string;

        /**
         * The user who performed the audit logged action.
         */
        user?: Session.User;
      }

      export namespace Session {
        /**
         * The user who performed the audit logged action.
         */
        export interface User {
          /**
           * The user id.
           */
          id?: string;

          /**
           * The user email.
           */
          email?: string;
        }
      }
    }

    /**
     * The details for events with this `type`.
     */
    export interface APIKeyCreated {
      /**
       * The tracking ID of the API key.
       */
      id?: string;

      /**
       * The payload used to create the API key.
       */
      data?: APIKeyCreated.Data;
    }

    export namespace APIKeyCreated {
      /**
       * The payload used to create the API key.
       */
      export interface Data {
        /**
         * A list of scopes allowed for the API key, e.g. `["api.model.request"]`
         */
        scopes?: Array<string>;
      }
    }

    /**
     * The details for events with this `type`.
     */
    export interface APIKeyDeleted {
      /**
       * The tracking ID of the API key.
       */
      id?: string;
    }

    /**
     * The details for events with this `type`.
     */
    export interface APIKeyUpdated {
      /**
       * The tracking ID of the API key.
       */
      id?: string;

      /**
       * The payload used to update the API key.
       */
      changes_requested?: APIKeyUpdated.ChangesRequested;
    }

    export namespace APIKeyUpdated {
      /**
       * The payload used to update the API key.
       */
      export interface ChangesRequested {
        /**
         * A list of scopes allowed for the API key, e.g. `["api.model.request"]`
         */
        scopes?: Array<string>;
      }
    }

    /**
     * The details for events with this `type`.
     */
    export interface InviteAccepted {
      /**
       * The ID of the invite.
       */
      id?: string;
    }

    /**
     * The details for events with this `type`.
     */
    export interface InviteDeleted {
      /**
       * The ID of the invite.
       */
      id?: string;
    }

    /**
     * The details for events with this `type`.
     */
    export interface InviteSent {
      /**
       * The ID of the invite.
       */
      id?: string;

      /**
       * The payload used to create the invite.
       */
      data?: InviteSent.Data;
    }

    export namespace InviteSent {
      /**
       * The payload used to create the invite.
       */
      export interface Data {
        /**
         * The email invited to the organization.
         */
        email?: string;

        /**
         * The role the email was invited to be. Is either `owner` or `member`.
         */
        role?: string;
      }
    }

    /**
     * The details for events with this `type`.
     */
    export interface LoginFailed {
      /**
       * The error code of the failure.
       */
      error_code?: string;

      /**
       * The error message of the failure.
       */
      error_message?: string;
    }

    /**
     * The details for events with this `type`.
     */
    export interface LogoutFailed {
      /**
       * The error code of the failure.
       */
      error_code?: string;

      /**
       * The error message of the failure.
       */
      error_message?: string;
    }

    /**
     * The details for events with this `type`.
     */
    export interface OrganizationUpdated {
      /**
       * The organization ID.
       */
      id?: string;

      /**
       * The payload used to update the organization settings.
       */
      changes_requested?: OrganizationUpdated.ChangesRequested;
    }

    export namespace OrganizationUpdated {
      /**
       * The payload used to update the organization settings.
       */
      export interface ChangesRequested {
        /**
         * The organization description.
         */
        description?: string;

        /**
         * The organization name.
         */
        name?: string;

        settings?: ChangesRequested.Settings;

        /**
         * The organization title.
         */
        title?: string;
      }

      export namespace ChangesRequested {
        export interface Settings {
          /**
           * Visibility of the threads page which shows messages created with the Assistants
           * API and Playground. One of `ANY_ROLE`, `OWNERS`, or `NONE`.
           */
          threads_ui_visibility?: string;

          /**
           * Visibility of the usage dashboard which shows activity and costs for your
           * organization. One of `ANY_ROLE` or `OWNERS`.
           */
          usage_dashboard_visibility?: string;
        }
      }
    }

    /**
     * The project that the action was scoped to. Absent for actions not scoped to
     * projects.
     */
    export interface Project {
      /**
       * The project ID.
       */
      id?: string;

      /**
       * The project title.
       */
      name?: string;
    }

    /**
     * The details for events with this `type`.
     */
    export interface ProjectArchived {
      /**
       * The project ID.
       */
      id?: string;
    }

    /**
     * The details for events with this `type`.
     */
    export interface ProjectCreated {
      /**
       * The project ID.
       */
      id?: string;

      /**
       * The payload used to create the project.
       */
      data?: ProjectCreated.Data;
    }

    export namespace ProjectCreated {
      /**
       * The payload used to create the project.
       */
      export interface Data {
        /**
         * The project name.
         */
        name?: string;

        /**
         * The title of the project as seen on the dashboard.
         */
        title?: string;
      }
    }

    /**
     * The details for events with this `type`.
     */
    export interface ProjectUpdated {
      /**
       * The project ID.
       */
      id?: string;

      /**
       * The payload used to update the project.
       */
      changes_requested?: ProjectUpdated.ChangesRequested;
    }

    export namespace ProjectUpdated {
      /**
       * The payload used to update the project.
       */
      export interface ChangesRequested {
        /**
         * The title of the project as seen on the dashboard.
         */
        title?: string;
      }
    }

    /**
     * The details for events with this `type`.
     */
    export interface ServiceAccountCreated {
      /**
       * The service account ID.
       */
      id?: string;

      /**
       * The payload used to create the service account.
       */
      data?: ServiceAccountCreated.Data;
    }

    export namespace ServiceAccountCreated {
      /**
       * The payload used to create the service account.
       */
      export interface Data {
        /**
         * The role of the service account. Is either `owner` or `member`.
         */
        role?: string;
      }
    }

    /**
     * The details for events with this `type`.
     */
    export interface ServiceAccountDeleted {
      /**
       * The service account ID.
       */
      id?: string;
    }

    /**
     * The details for events with this `type`.
     */
    export interface ServiceAccountUpdated {
      /**
       * The service account ID.
       */
      id?: string;

      /**
       * The payload used to updated the service account.
       */
      changes_requested?: ServiceAccountUpdated.ChangesRequested;
    }

    export namespace ServiceAccountUpdated {
      /**
       * The payload used to updated the service account.
       */
      export interface ChangesRequested {
        /**
         * The role of the service account. Is either `owner` or `member`.
         */
        role?: string;
      }
    }

    /**
     * The details for events with this `type`.
     */
    export interface UserAdded {
      /**
       * The user ID.
       */
      id?: string;

      /**
       * The payload used to add the user to the project.
       */
      data?: UserAdded.Data;
    }

    export namespace UserAdded {
      /**
       * The payload used to add the user to the project.
       */
      export interface Data {
        /**
         * The role of the user. Is either `owner` or `member`.
         */
        role?: string;
      }
    }

    /**
     * The details for events with this `type`.
     */
    export interface UserDeleted {
      /**
       * The user ID.
       */
      id?: string;
    }

    /**
     * The details for events with this `type`.
     */
    export interface UserUpdated {
      /**
       * The project ID.
       */
      id?: string;

      /**
       * The payload used to update the user.
       */
      changes_requested?: UserUpdated.ChangesRequested;
    }

    export namespace UserUpdated {
      /**
       * The payload used to update the user.
       */
      export interface ChangesRequested {
        /**
         * The role of the user. Is either `owner` or `member`.
         */
        role?: string;
      }
    }
  }
}

export interface AuditLogListParams {
  /**
   * Return only events performed by users with these emails.
   */
  actor_emails?: Array<string>;

  /**
   * Return only events performed by these actors. Can be a user ID, a service
   * account ID, or an api key tracking ID.
   */
  actor_ids?: Array<string>;

  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place
   * in the list. For instance, if you make a list request and receive 100 objects,
   * ending with obj_foo, your subsequent call can include after=obj_foo in order to
   * fetch the next page of the list.
   */
  after?: string;

  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place
   * in the list. For instance, if you make a list request and receive 100 objects,
   * ending with obj_foo, your subsequent call can include before=obj_foo in order to
   * fetch the previous page of the list.
   */
  before?: string;

  /**
   * Return only events whose `effective_at` (Unix seconds) is in this range.
   */
  effective_at?: AuditLogListParams.EffectiveAt;

  /**
   * Return only events with a `type` in one of these values. For example,
   * `project.created`. For all options, see the documentation for the
   * [audit log object](/docs/api-reference/audit-logs/object).
   */
  event_types?: Array<
    | 'api_key.created'
    | 'api_key.updated'
    | 'api_key.deleted'
    | 'invite.sent'
    | 'invite.accepted'
    | 'invite.deleted'
    | 'login.succeeded'
    | 'login.failed'
    | 'logout.succeeded'
    | 'logout.failed'
    | 'organization.updated'
    | 'project.created'
    | 'project.updated'
    | 'project.archived'
    | 'service_account.created'
    | 'service_account.updated'
    | 'service_account.deleted'
    | 'user.added'
    | 'user.updated'
    | 'user.deleted'
  >;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100, and the default is 20.
   */
  limit?: number;

  /**
   * Return only events for these projects.
   */
  project_ids?: Array<string>;

  /**
   * Return only events performed on these targets. For example, a project ID
   * updated.
   */
  resource_ids?: Array<string>;
}

export namespace AuditLogListParams {
  /**
   * Return only events whose `effective_at` (Unix seconds) is in this range.
   */
  export interface EffectiveAt {
    /**
     * Return only events whose `effective_at` (Unix seconds) is greater than this
     * value.
     */
    gt?: number;

    /**
     * Return only events whose `effective_at` (Unix seconds) is greater than or equal
     * to this value.
     */
    gte?: number;

    /**
     * Return only events whose `effective_at` (Unix seconds) is less than this value.
     */
    lt?: number;

    /**
     * Return only events whose `effective_at` (Unix seconds) is less than or equal to
     * this value.
     */
    lte?: number;
  }
}

export namespace AuditLogs {
  export import AuditLogListResponse = AuditLogsAPI.AuditLogListResponse;
  export import AuditLogListParams = AuditLogsAPI.AuditLogListParams;
}
