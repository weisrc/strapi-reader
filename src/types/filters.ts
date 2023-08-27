import { DateTime, One, Many } from "./base";

type EqualOp = "$eq" | "$ne";

type NumberOp = EqualOp | "$lt" | "$lte" | "$gt" | "$gte";

type StringOp =
  | "$eq"
  | "$eqi"
  | "$ne"
  | "$nei"
  | "$contains"
  | "$notContains"
  | "$containsi"
  | "$notContainsi"
  | "$startsWith"
  | "$startsWithi"
  | "$endsWith"
  | "$endsWithi";

type ArrayOp = "$in" | "$notIn";

type NullOp = "$null" | "$notNull";

type HighOp = "$or" | "$and";

export type Filters<T> = {
  [k in keyof T]?: T[k] extends number
    ? { [op in NumberOp]?: number } & { $between?: [number, number] }
    : T[k] extends boolean
    ? { [op in EqualOp]?: boolean }
    : T[k] extends DateTime
    ? { [op in NumberOp]?: DateTime }
    : T[k] extends string
    ? { [op in StringOp]?: string }
    : T[k] extends unknown[]
    ? { [op in ArrayOp]?: unknown[] }
    : T[k] extends One<unknown>
    ? Filters<T[k]["data"]["attributes"]>
    : T[k] extends Many<unknown>
    ? Filters<T[k]["data"][number]["attributes"]>
    : never;
} & { [op in NullOp]?: boolean } & {
  [op in HighOp]?: Filters<T>[];
} & {
  $not?: Filters<T>;
};
