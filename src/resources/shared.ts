// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface ImagesResponse {
  created: number;

  data: Array<ImagesResponse.Data>;
}

export namespace ImagesResponse {
  /**
   * Represents the url or the content of an image generated by the OpenAI API.
   */
  export interface Data {
    /**
     * The base64-encoded JSON of the generated image, if `response_format` is
     * `b64_json`.
     */
    b64_json?: string;

    /**
     * The prompt that was used to generate the image, if there was any revision to the
     * prompt.
     */
    revised_prompt?: string;

    /**
     * The URL of the generated image, if `response_format` is `url` (default).
     */
    url?: string;
  }
}