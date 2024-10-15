// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as EditsAPI from './edits';
import * as GenerationsAPI from './generations';
import * as VariationsAPI from './variations';

export class Images extends APIResource {
  generations: GenerationsAPI.Generations = new GenerationsAPI.Generations(this._client);
  edits: EditsAPI.Edits = new EditsAPI.Edits(this._client);
  variations: VariationsAPI.Variations = new VariationsAPI.Variations(this._client);
}

export namespace Images {
  export import Generations = GenerationsAPI.Generations;
  export import GenerationCreateParams = GenerationsAPI.GenerationCreateParams;
  export import Edits = EditsAPI.Edits;
  export import EditCreateParams = EditsAPI.EditCreateParams;
  export import Variations = VariationsAPI.Variations;
  export import VariationCreateParams = VariationsAPI.VariationCreateParams;
}
