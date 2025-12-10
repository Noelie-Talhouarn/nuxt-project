import type { SanityDocument } from '@sanity/client'
import type { SanityImageSource } from '@sanity/image-url'

type SanityHomeHero = {
  title: string;
  subtitle?: string;
  image?: SanityImageSource;
}

type SanityHome = SanityDocument & {
  title: string;
  description?: string;
  hero: SanityHomeHero;
}
