import type { SanityDocument } from '@sanity/client'

export type SanityPageBooks = SanityDocument & {
  title: string;
  intro?: string;
  metaTitle: string;
  metaDescription: string;
}