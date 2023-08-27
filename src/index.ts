import { stringify } from "qs";
import { OffsetResult } from "./types/base";
import { TypeMapper } from "./types/content";
import { Query } from "./types/query";

export class Reader<M extends TypeMapper> {
  constructor(
    private url: string,
    private get = (url: string) => fetch(url).then((res) => res.json())
  ) {}

  async read<K extends keyof M, Q extends Query<M[K]>>(key: K, query: Q) {
    const url = `${this.url}/api/${key as string}?${stringify(query)}`;
    const value = await this.get(url);
    return value as Promise<OffsetResult<M[K]>>;
  }
}
