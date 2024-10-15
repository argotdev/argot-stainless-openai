// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as AudioAPI from './audio';
import * as TranscriptionsAPI from './transcriptions';
import * as TranslationsAPI from './translations';
import { type Response } from '../../_shims/index';

export class Audio extends APIResource {
  transcriptions: TranscriptionsAPI.Transcriptions = new TranscriptionsAPI.Transcriptions(this._client);
  translations: TranslationsAPI.Translations = new TranslationsAPI.Translations(this._client);

  /**
   * Generates audio from the input text.
   */
  speech(body: AudioSpeechParams, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.post('/audio/speech', { body, ...options, __binaryResponse: true });
  }
}

export interface AudioSpeechParams {
  /**
   * The text to generate audio for. The maximum length is 4096 characters.
   */
  input: string;

  /**
   * One of the available [TTS models](/docs/models/tts): `tts-1` or `tts-1-hd`
   */
  model: (string & {}) | 'tts-1' | 'tts-1-hd';

  /**
   * The voice to use when generating the audio. Supported voices are `alloy`,
   * `echo`, `fable`, `onyx`, `nova`, and `shimmer`. Previews of the voices are
   * available in the
   * [Text to speech guide](/docs/guides/text-to-speech/voice-options).
   */
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

  /**
   * The format to audio in. Supported formats are `mp3`, `opus`, `aac`, `flac`,
   * `wav`, and `pcm`.
   */
  response_format?: 'mp3' | 'opus' | 'aac' | 'flac' | 'wav' | 'pcm';

  /**
   * The speed of the generated audio. Select a value from `0.25` to `4.0`. `1.0` is
   * the default.
   */
  speed?: number;
}

export namespace Audio {
  export import AudioSpeechParams = AudioAPI.AudioSpeechParams;
  export import Transcriptions = TranscriptionsAPI.Transcriptions;
  export import TranscriptionCreateResponse = TranscriptionsAPI.TranscriptionCreateResponse;
  export import TranscriptionCreateParams = TranscriptionsAPI.TranscriptionCreateParams;
  export import Translations = TranslationsAPI.Translations;
  export import TranslationCreateResponse = TranslationsAPI.TranslationCreateResponse;
  export import TranslationCreateParams = TranslationsAPI.TranslationCreateParams;
}
