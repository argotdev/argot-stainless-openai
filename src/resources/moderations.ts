// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Moderations extends APIResource {
  /**
   * Classifies if text and/or image inputs are potentially harmful. Learn more in
   * the [moderation guide](/docs/guides/moderation).
   */
  create(
    body: ModerationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModerationCreateResponse> {
    return this._client.post('/moderations', { body, ...options });
  }
}

/**
 * Represents if a given text input is potentially harmful.
 */
export interface ModerationCreateResponse {
  /**
   * The unique identifier for the moderation request.
   */
  id: string;

  /**
   * The model used to generate the moderation results.
   */
  model: string;

  /**
   * A list of moderation objects.
   */
  results: Array<ModerationCreateResponse.Result>;
}

export namespace ModerationCreateResponse {
  export interface Result {
    /**
     * A list of the categories, and whether they are flagged or not.
     */
    categories: Result.Categories;

    /**
     * A list of the categories along with the input type(s) that the score applies to.
     */
    category_applied_input_types: Result.CategoryAppliedInputTypes;

    /**
     * A list of the categories along with their scores as predicted by model.
     */
    category_scores: Result.CategoryScores;

    /**
     * Whether any of the below categories are flagged.
     */
    flagged: boolean;
  }

  export namespace Result {
    /**
     * A list of the categories, and whether they are flagged or not.
     */
    export interface Categories {
      /**
       * Content that expresses, incites, or promotes harassing language towards any
       * target.
       */
      harassment: boolean;

      /**
       * Harassment content that also includes violence or serious harm towards any
       * target.
       */
      'harassment/threatening': boolean;

      /**
       * Content that expresses, incites, or promotes hate based on race, gender,
       * ethnicity, religion, nationality, sexual orientation, disability status, or
       * caste. Hateful content aimed at non-protected groups (e.g., chess players) is
       * harassment.
       */
      hate: boolean;

      /**
       * Hateful content that also includes violence or serious harm towards the targeted
       * group based on race, gender, ethnicity, religion, nationality, sexual
       * orientation, disability status, or caste.
       */
      'hate/threatening': boolean;

      /**
       * Content that includes instructions or advice that facilitate the planning or
       * execution of wrongdoing, or that gives advice or instruction on how to commit
       * illicit acts. For example, "how to shoplift" would fit this category.
       */
      illicit: boolean;

      /**
       * Content that includes instructions or advice that facilitate the planning or
       * execution of wrongdoing that also includes violence, or that gives advice or
       * instruction on the procurement of any weapon.
       */
      'illicit/violent': boolean;

      /**
       * Content that promotes, encourages, or depicts acts of self-harm, such as
       * suicide, cutting, and eating disorders.
       */
      'self-harm': boolean;

      /**
       * Content that encourages performing acts of self-harm, such as suicide, cutting,
       * and eating disorders, or that gives instructions or advice on how to commit such
       * acts.
       */
      'self-harm/instructions': boolean;

      /**
       * Content where the speaker expresses that they are engaging or intend to engage
       * in acts of self-harm, such as suicide, cutting, and eating disorders.
       */
      'self-harm/intent': boolean;

      /**
       * Content meant to arouse sexual excitement, such as the description of sexual
       * activity, or that promotes sexual services (excluding sex education and
       * wellness).
       */
      sexual: boolean;

      /**
       * Sexual content that includes an individual who is under 18 years old.
       */
      'sexual/minors': boolean;

      /**
       * Content that depicts death, violence, or physical injury.
       */
      violence: boolean;

      /**
       * Content that depicts death, violence, or physical injury in graphic detail.
       */
      'violence/graphic': boolean;
    }

    /**
     * A list of the categories along with the input type(s) that the score applies to.
     */
    export interface CategoryAppliedInputTypes {
      /**
       * The applied input type(s) for the category 'harassment'.
       */
      harassment: Array<'text'>;

      /**
       * The applied input type(s) for the category 'harassment/threatening'.
       */
      'harassment/threatening': Array<'text'>;

      /**
       * The applied input type(s) for the category 'hate'.
       */
      hate: Array<'text'>;

      /**
       * The applied input type(s) for the category 'hate/threatening'.
       */
      'hate/threatening': Array<'text'>;

      /**
       * The applied input type(s) for the category 'illicit'.
       */
      illicit: Array<'text'>;

      /**
       * The applied input type(s) for the category 'illicit/violent'.
       */
      'illicit/violent': Array<'text'>;

      /**
       * The applied input type(s) for the category 'self-harm'.
       */
      'self-harm': Array<'text' | 'image'>;

      /**
       * The applied input type(s) for the category 'self-harm/instructions'.
       */
      'self-harm/instructions': Array<'text' | 'image'>;

      /**
       * The applied input type(s) for the category 'self-harm/intent'.
       */
      'self-harm/intent': Array<'text' | 'image'>;

      /**
       * The applied input type(s) for the category 'sexual'.
       */
      sexual: Array<'text' | 'image'>;

      /**
       * The applied input type(s) for the category 'sexual/minors'.
       */
      'sexual/minors': Array<'text'>;

      /**
       * The applied input type(s) for the category 'violence'.
       */
      violence: Array<'text' | 'image'>;

      /**
       * The applied input type(s) for the category 'violence/graphic'.
       */
      'violence/graphic': Array<'text' | 'image'>;
    }

    /**
     * A list of the categories along with their scores as predicted by model.
     */
    export interface CategoryScores {
      /**
       * The score for the category 'harassment'.
       */
      harassment: number;

      /**
       * The score for the category 'harassment/threatening'.
       */
      'harassment/threatening': number;

      /**
       * The score for the category 'hate'.
       */
      hate: number;

      /**
       * The score for the category 'hate/threatening'.
       */
      'hate/threatening': number;

      /**
       * The score for the category 'illicit'.
       */
      illicit: number;

      /**
       * The score for the category 'illicit/violent'.
       */
      'illicit/violent': number;

      /**
       * The score for the category 'self-harm'.
       */
      'self-harm': number;

      /**
       * The score for the category 'self-harm/instructions'.
       */
      'self-harm/instructions': number;

      /**
       * The score for the category 'self-harm/intent'.
       */
      'self-harm/intent': number;

      /**
       * The score for the category 'sexual'.
       */
      sexual: number;

      /**
       * The score for the category 'sexual/minors'.
       */
      'sexual/minors': number;

      /**
       * The score for the category 'violence'.
       */
      violence: number;

      /**
       * The score for the category 'violence/graphic'.
       */
      'violence/graphic': number;
    }
  }
}

export interface ModerationCreateParams {
  /**
   * Input (or inputs) to classify. Can be a single string, an array of strings, or
   * an array of multi-modal input objects similar to other models.
   */
  input:
    | string
    | Array<string>
    | Array<ModerationCreateParams.UnionMember0 | ModerationCreateParams.UnionMember1>;

  /**
   * The content moderation model you would like to use. Learn more in
   * [the moderation guide](/docs/guides/moderation), and learn about available
   * models [here](/docs/models/moderation).
   */
  model?:
    | (string & {})
    | 'omni-moderation-latest'
    | 'omni-moderation-2024-09-26'
    | 'text-moderation-latest'
    | 'text-moderation-stable';
}

export namespace ModerationCreateParams {
  /**
   * An object describing an image to classify.
   */
  export interface UnionMember0 {
    /**
     * Contains either an image URL or a data URL for a base64 encoded image.
     */
    image_url: UnionMember0.ImageURL;

    /**
     * Always `image_url`.
     */
    type: 'image_url';
  }

  export namespace UnionMember0 {
    /**
     * Contains either an image URL or a data URL for a base64 encoded image.
     */
    export interface ImageURL {
      /**
       * Either a URL of the image or the base64 encoded image data.
       */
      url: string;
    }
  }

  /**
   * An object describing text to classify.
   */
  export interface UnionMember1 {
    /**
     * A string of text to classify.
     */
    text: string;

    /**
     * Always `text`.
     */
    type: 'text';
  }
}

export declare namespace Moderations {
  export {
    type ModerationCreateResponse as ModerationCreateResponse,
    type ModerationCreateParams as ModerationCreateParams,
  };
}
