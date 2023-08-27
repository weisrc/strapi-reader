import { stringify } from "qs";
import { Entry, OffsetResult, Query, TypeMapper } from "./types";

export * from "./types";

export class Reader<M extends TypeMapper> {
  constructor(
    protected url: string,
    protected limit: number = 100,
    protected get = (url: string) => fetch(url).then((res) => res.json())
  ) {}

  getUrl<K extends keyof M, Q extends Query<M[K]>>(key: K, query: Q) {
    return this.url + <string>key + "?" + stringify(query);
  }

  async read<K extends keyof M, Q extends Query<M[K]>>(key: K, query: Q) {
    const url = this.getUrl(key, query);
    const value = await this.get(url);
    return value as Promise<OffsetResult<M[K]>>;
  }

  async list<K extends keyof M, Q extends Query<M[K]>>(key: K, query: Q) {
    let offset = 0;
    const results: Entry<M[K]>[] = [];
    while (true) {
      const res = await this.read(key, {
        ...query,
        offset,
        limit: this.limit,
      });
      results.push(...res.data);
      if (res.data.length < this.limit) {
        return results;
      }
      offset += this.limit;
    }
  }
}
