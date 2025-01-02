// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as JobsAPI from './jobs/jobs';
import { FineTuningJob, JobCreateParams, JobListParams, JobListResponse, Jobs } from './jobs/jobs';

export class FineTuning extends APIResource {
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);
}

FineTuning.Jobs = Jobs;

export declare namespace FineTuning {
  export {
    Jobs as Jobs,
    type FineTuningJob as FineTuningJob,
    type JobListResponse as JobListResponse,
    type JobCreateParams as JobCreateParams,
    type JobListParams as JobListParams,
  };
}
