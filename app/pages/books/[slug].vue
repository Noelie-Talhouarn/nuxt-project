<script setup lang="ts">
import type { SanityBook } from '~/types/api/cms/book'

const BOOK_QUERY = groq`*[_type == "book" && slug.current == $slug][0]{ slug, title, prix, cover, body, metaDescription, publishedAt,
 author->{ name }, categories[] -> {...} }`
const { params } = useRoute()

const { data: book } = await useLazySanityQuery<SanityBook>(BOOK_QUERY, params)
const { urlFor } = useSanityImage()


useHead(() => ({
  title: book.value?.title ?? 'Titre du site',
  meta: [
    {
      name: 'description',
      content: book.value?.metaDescription ?? 'Description du site'
    }
  ]
}))

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
      <p class="book__published" v-if="book.publishedAt">
        Publié le {{ new Date(book.publishedAt).toLocaleDateString('fr-FR') }}
      </p>

      <p  class="book__author">
        Fais par {{ book.author.name }}
      </p>
      <div class="book__body">
        <p
          v-for="(block, index) in book.body"
          :key="index"
        >
          <span
            v-for="(child, childIndex) in block.children"
            :key="childIndex"
          >
            {{ child.text }}
          </span>
        </p>
      </div>

      <p  class="book__prix">
        Prix : {{ book.prix }} €
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
  max-width: rem(800);
  margin: 0 auto;
  padding: rem(32);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: rem(24);
  

  &__cover {
    width: 100%;
    object-fit: cover;
    border-radius: rem(12);
  }

  &__title {
   color: var(--color-secondary);
    margin-bottom: rem(16);
  }

  &__content {
    line-height: 1.6;
  }

  &__published,
  &__author {
    margin-bottom: rem(1);
    color: var(--color-primary);
  }

  &__categories-title {
    margin-top: rem(1);
    font-weight: 600;
  }

  &__categories {
    list-style: none;
    padding: 0;
    margin: 0 0 rem(16);

    display: flex;
    flex-wrap: wrap;
    gap: rem(5);
  }

  &__category {
    background-color: var(--color-text-btn);
    border: rem(1) solid var(--color-secondary);
    color: var(--color-secondary);
    padding: rem(7);
    border-radius: rem(6);
  }

  }
</style>