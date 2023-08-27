import { Localized, Many, One } from "./base";
import { Filters } from "./filters";

export type Populate<T> =
  | {
      [k in keyof T]?: T[k] extends One<unknown>
        ? Populate<T[k]["data"]["attributes"]>
        : T[k] extends Many<unknown>
        ? Populate<T[k]["data"][number]["attributes"]>
        : boolean;
    }
  | "*"
  | (keyof T)[]
  | boolean;

export type Sort<T> = `${keyof T & string}${":asc" | ":desc" | ""}`;

export type Offset = {
  offset: number;
  limit?: number;
  withCount?: boolean;
};

export type Query<T> = {
  fields?: (keyof T)[];
  filters?: Filters<T>;
  populate?: Populate<T>;
  sort?: Sort<T> | Sort<T>[];
  pagination?: Offset;
  publicationState?: "live" | "preview";
  locale?: T extends Localized<infer L, unknown> ? L : never;
};
