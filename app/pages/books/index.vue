<script setup lang="ts">
import type { SanityBook } from '~/types/api/cms/book'
import type { SanityPageBooks } from '~/types/api/cms/pageBooks'
/* ---------- Livres ---------- */
const BOOKS_QUERY = groq`
  *[
    _type == "book"
    && defined(slug.current)
  ]
  | order(publishedAt desc)[0...12]{
    _id,
    title,
    slug,
    cover,
    publishedAt
  }
`

const { data: books } = await useLazySanityQuery<SanityBook[]>(BOOKS_QUERY)

/* ---------- Page SEO listing ---------- */
const PAGEBOOKS_QUERY = groq`
  *[_type == "pageBooks"][0]{
    title,
    intro,
    metaDescription
  }
`

const { data: page } =
  await useLazySanityQuery<SanityPageBooks | null>(PAGEBOOKS_QUERY)

/* ---------- SEO ---------- */
useHead({
  title: page.value?.title ?? 'Livres de cuisine',
  meta: [
    {
      name: 'description',
      content: page.value?.metaDescription ?? ''
    }
  ]
})
</script>


<template>
  <main class="books">
    <MyTitle class="books__title" as="h1" size="medium">{{ page?.title }}</MyTitle>
    <p class="books__intro">{{ page?.intro }}</p>

    <div class="books__grid">
      <MyCardsBooks
        v-for="book in books"
        :key="book._id"
        :book="book"
      />
    </div>
  </main>
</template>

<style lang="scss">
.books {
  max-width: rem(1200);
  margin: 0 auto;
  padding: rem(30) rem(15);

  &__title {
    text-align: center;
    margin-bottom: rem(30);
    color: var(--color-secondary);
  }
  &__intro {
    text-align: center;
    margin-bottom: rem(20);
    font-size: var(--font-size-text);
    color: var(--color-primary);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(25);

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      justify-items: center;
      gap: rem(20);
    }
  }
}
</style>