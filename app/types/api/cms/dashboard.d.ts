import type { SanityDocument } from '@sanity/client'

export type SanityDashboard = SanityDocument & {
  title?: string;
  metaTitle: string;
  metaDescription: string;
}