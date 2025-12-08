import type { SanityDocument } from '@sanity/client'
import type { SanityImageSource } from '@sanity/image-url'

type SanityBook = SanityDocument & {
  title: string;
  slug: { current : string }
  publishedAt: string;
  image: SanityImageSource;
  body: string;
  author: SanityAuthor;
  categories: SanityCategorie[];
}

type SanityAuthor = SanityDocument & {
  name: string;
  slug: string;
  portrait: SanityImageSource;
}

type SanityCategorie = SanityDocument & {
  label: string;
  slug: string;
}
