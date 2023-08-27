import { DateTime, Localizations, Many, One, Timestamped } from "./base";

export type Image = Timestamped & {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats?: unknown;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: unknown;
};

export type Component = {
  __component: string;
  id: number;
};

export type Json = {
  [key: string]: string | number | boolean | Json | Json[];
};

export type DynamicZone = Component[];

export type ContentType =
  | Record<
      string,
      | string
      | number
      | boolean
      | Image
      | DynamicZone
      | Component
      | One<unknown>
      | Many<unknown>
      | Json
      | DateTime
    >
  | {
      localizations?: Localizations<string, unknown>;
    };

export type TypeMapper = Record<string, ContentType>;
