// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';

export class Checkpoints extends APIResource {
  /**
   * List checkpoints for a fine-tuning job.
   */
  list(
    fineTuningJobId: string,
    query?: CheckpointListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CheckpointListResponse>;
  list(fineTuningJobId: string, options?: Core.RequestOptions): Core.APIPromise<CheckpointListResponse>;
  list(
    fineTuningJobId: string,
    query: CheckpointListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<CheckpointListResponse> {
    if (isRequestOptions(query)) {
      return this.list(fineTuningJobId, {}, query);
    }
    return this._client.get(`/fine_tuning/jobs/${fineTuningJobId}/checkpoints`, { query, ...options });
  }
}

export interface CheckpointListResponse {
  data: Array<CheckpointListResponse.Data>;

  has_more: boolean;

  object: 'list';

  first_id?: string | null;

  last_id?: string | null;
}

export namespace CheckpointListResponse {
  /**
   * The `fine_tuning.job.checkpoint` object represents a model checkpoint for a
   * fine-tuning job that is ready to use.
   */
  export interface Data {
    /**
     * The checkpoint identifier, which can be referenced in the API endpoints.
     */
    id: string;

    /**
     * The Unix timestamp (in seconds) for when the checkpoint was created.
     */
    created_at: number;

    /**
     * The name of the fine-tuned checkpoint model that is created.
     */
    fine_tuned_model_checkpoint: string;

    /**
     * The name of the fine-tuning job that this checkpoint was created from.
     */
    fine_tuning_job_id: string;

    /**
     * Metrics at the step number during the fine-tuning job.
     */
    metrics: Data.Metrics;

    /**
     * The object type, which is always "fine_tuning.job.checkpoint".
     */
    object: 'fine_tuning.job.checkpoint';

    /**
     * The step number that the checkpoint was created at.
     */
    step_number: number;
  }

  export namespace Data {
    /**
     * Metrics at the step number during the fine-tuning job.
     */
    export interface Metrics {
      full_valid_loss?: number;

      full_valid_mean_token_accuracy?: number;

      step?: number;

      train_loss?: number;

      train_mean_token_accuracy?: number;

      valid_loss?: number;

      valid_mean_token_accuracy?: number;
    }
  }
}

export interface CheckpointListParams {
  /**
   * Identifier for the last checkpoint ID from the previous pagination request.
   */
  after?: string;

  /**
   * Number of checkpoints to retrieve.
   */
  limit?: number;
}

export declare namespace Checkpoints {
  export {
    type CheckpointListResponse as CheckpointListResponse,
    type CheckpointListParams as CheckpointListParams,
  };
}
