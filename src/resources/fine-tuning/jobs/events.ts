// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as EventsAPI from './events';

export class Events extends APIResource {
  /**
   * Get status updates for a fine-tuning job.
   */
  list(
    fineTuningJobId: string,
    query?: EventListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EventListResponse>;
  list(fineTuningJobId: string, options?: Core.RequestOptions): Core.APIPromise<EventListResponse>;
  list(
    fineTuningJobId: string,
    query: EventListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<EventListResponse> {
    if (isRequestOptions(query)) {
      return this.list(fineTuningJobId, {}, query);
    }
    return this._client.get(`/fine_tuning/jobs/${fineTuningJobId}/events`, { query, ...options });
  }
}

export interface EventListResponse {
  data: Array<EventListResponse.Data>;

  object: 'list';
}

export namespace EventListResponse {
  /**
   * Fine-tuning job event object
   */
  export interface Data {
    id: string;

    created_at: number;

    level: 'info' | 'warn' | 'error';

    message: string;

    object: 'fine_tuning.job.event';
  }
}

export interface EventListParams {
  /**
   * Identifier for the last event from the previous pagination request.
   */
  after?: string;

  /**
   * Number of events to retrieve.
   */
  limit?: number;
}

export namespace Events {
  export import EventListResponse = EventsAPI.EventListResponse;
  export import EventListParams = EventsAPI.EventListParams;
}
