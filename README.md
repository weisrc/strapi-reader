# Strapi Reader

Type-safe Reader for Strapi API.

## Installation

```sh
npm install strapi-reader
```

## Usage

```ts
import { Many, Reader } from "strapi-reader";

type Article = {
  title: string;
  slug: string;
  body: string;
  tags: Many<Tag>;
};

type Tag = {
  name: string;
  color: string;
  featured: boolean;
};

const reader = new Reader<{
  articles: Article;
  tags: Tag;
}>("http://localhost:1337/api/");

const res = await reader.read("articles", {})
console.log(res.data[0].attributes.title);
```

## License

MIT License
```