import type { SanityDocument } from '@sanity/client'
import type { SanityImageSource } from '@sanity/image-url'

export type SanityNavigation = {
  label: string;
  url: string;
}

export type SanitySiteSettings = SanityDocument & {
  title: string;
  description: string;
  logo: SanityImageSource;
  navigation: SanityNavigation[];
}
