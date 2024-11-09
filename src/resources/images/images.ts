// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as EditsAPI from './edits';
import { EditCreateParams, Edits } from './edits';
import * as GenerationsAPI from './generations';
import { GenerationCreateParams, Generations } from './generations';
import * as VariationsAPI from './variations';
import { VariationCreateParams, Variations } from './variations';

export class Images extends APIResource {
  generations: GenerationsAPI.Generations = new GenerationsAPI.Generations(this._client);
  edits: EditsAPI.Edits = new EditsAPI.Edits(this._client);
  variations: VariationsAPI.Variations = new VariationsAPI.Variations(this._client);
}

Images.Generations = Generations;
Images.Edits = Edits;
Images.Variations = Variations;

export declare namespace Images {
  export { Generations as Generations, type GenerationCreateParams as GenerationCreateParams };

  export { Edits as Edits, type EditCreateParams as EditCreateParams };

  export { Variations as Variations, type VariationCreateParams as VariationCreateParams };
}
