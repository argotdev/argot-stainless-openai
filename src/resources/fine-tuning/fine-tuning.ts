// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as JobsAPI from './jobs/jobs';

export class FineTuning extends APIResource {
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);
}

export namespace FineTuning {
  export import Jobs = JobsAPI.Jobs;
  export import FineTuningJob = JobsAPI.FineTuningJob;
  export import JobListResponse = JobsAPI.JobListResponse;
  export import JobCreateParams = JobsAPI.JobCreateParams;
  export import JobListParams = JobsAPI.JobListParams;
}
