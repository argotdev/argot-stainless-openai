// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Content extends APIResource {
  /**
   * Returns the contents of the specified file.
   */
  retrieve(fileId: string, options?: Core.RequestOptions): Core.APIPromise<string> {
    return this._client.get(`/files/${fileId}/content`, {
      ...options,
      headers: { Accept: 'application/json', ...options?.headers },
    });
  }
}

export type ContentRetrieveResponse = string;

export declare namespace Content {
  export { type ContentRetrieveResponse as ContentRetrieveResponse };
}
