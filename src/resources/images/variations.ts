// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as VariationsAPI from './variations';
import * as Shared from '../shared';

export class Variations extends APIResource {
  /**
   * Creates a variation of a given image.
   */
  create(body: VariationCreateParams, options?: Core.RequestOptions): Core.APIPromise<Shared.ImagesResponse> {
    return this._client.post('/images/variations', Core.multipartFormRequestOptions({ body, ...options }));
  }
}

export interface VariationCreateParams {
  /**
   * The image to use as the basis for the variation(s). Must be a valid PNG file,
   * less than 4MB, and square.
   */
  image: Core.Uploadable;

  /**
   * The model to use for image generation. Only `dall-e-2` is supported at this
   * time.
   */
  model?: (string & {}) | 'dall-e-2' | null;

  /**
   * The number of images to generate. Must be between 1 and 10. For `dall-e-3`, only
   * `n=1` is supported.
   */
  n?: number | null;

  /**
   * The format in which the generated images are returned. Must be one of `url` or
   * `b64_json`. URLs are only valid for 60 minutes after the image has been
   * generated.
   */
  response_format?: 'url' | 'b64_json' | null;

  /**
   * The size of the generated images. Must be one of `256x256`, `512x512`, or
   * `1024x1024`.
   */
  size?: '256x256' | '512x512' | '1024x1024' | null;

  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor
   * and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   */
  user?: string;
}

export namespace Variations {
  export import VariationCreateParams = VariationsAPI.VariationCreateParams;
}
