<script setup lang="ts">
import type { SanityBook } from '~/types/api/cms/book'


const BOOKS_QUERY = groq`*[
  _type == "book"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, cover, publishedAt}`


const { data: books } = await useLazySanityQuery<SanityBook[]>(BOOKS_QUERY)

</script>

<template>
  <main class="books">
    <MyTitle class="books__title" as="h1" size="medium">Nos Livres de recettes</MyTitle>

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
    font-weight: bold;
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