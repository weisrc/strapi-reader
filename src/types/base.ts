export type Locale = string;

export type DateTime = string & {
  __type: "DateTime";
};

export type Timestamped<T = Record<never, never>> = T & {
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type Publishable<T = Record<never, never>> = T &
  Timestamped & {
    publishedAt: DateTime;
  };

export type Localizations<L extends string, T> = Entry<T & { locale: L }>[];

export type Localized<L extends string, T> = T &
  Publishable & {
    locale: L;
    localizations: Localizations<L, T>;
  };

export type Entry<T> = {
  id: number;
  attributes: T;
};

export type One<T> = {
  data: Entry<T>;
  meta: Record<string, unknown>;
};

export type Many<T> = {
  data: Entry<T>[];
  meta: Record<string, unknown>;
};

export type PageResult<T> = Many<T> & {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type OffsetResult<T> = Many<T> & {
  meta: {
    pagination: {
      offset: number;
      limit: number;
      total: number;
    };
  };
};
