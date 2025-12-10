<script setup lang="ts">
import type { SanityBook } from '~/types/api/cms/book'

const BOOK_QUERY = groq`*[_type == "book" && slug.current == $slug][0]{ slug, title, cover, body, author->{ name }, categories[] -> {...} }`
const { params } = useRoute()

const { data: book } = await useLazySanityQuery<SanityBook>(BOOK_QUERY, params)
const { urlFor } = useSanityImage()


</script>

<template>
  <section v-if="book" class="book">
    
    <MyButton href="/books" variant="purple" size="small">Retour aux livres</MyButton>

    <img
      v-if="book.cover"
      :src="urlFor(book.cover)?.width(550).height(310).url()"
      :alt="book?.title"
      class="book__cover"
      width="550"
      height="310"
    />

    <MyTitle as="h1" size="medium" v-if="book.title" class="book__title">
      {{ book.title }}
    </MyTitle>

    <div class="book__content">
      <p  class="book__author">
        Fais par {{ book.author.name }}
      </p>

      <p class="book__categories-title">Catégories :</p>

      <ul class="book__categories">
        <li 
          v-for="(categorie, index) in book.categories" 
          :key="index" 
          class="book__category"
        >
          {{ categorie.label }}
        </li>
      </ul>

      <SanityContent v-if="book.body" :blocks="book.body" />
    </div>
  </section>
</template>

<style lang="scss">

  .book {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  

  &__cover {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: 12px;
  }

  &__title {
   color: var(--color-secondary);
    margin-bottom: 1rem;
  }

  &__content {
    font-size: 1rem;
    line-height: 1.6;
  }

  &__published,
  &__author {
    margin-bottom: rem(1);
    color: #666;
  }

  &__categories-title {
    margin-top: 1rem;
    font-weight: 600;
  }

  &__categories {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;

    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
  }

  &__category {
    background-color: var(--color-text-btn);
    border: rem(1) solid var(--color-secondary);
    color: var(--color-secondary);
    padding: rem(7);
    border-radius: 6px;
    font-size: .875rem;
  }

  }
</style>