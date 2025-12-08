<script setup lang="ts">
import type { SanityBook } from '~/types/api/cms/book'

const BOOK_QUERY = groq`*[_type == "book" && slug.current == $slug][0]{ slug, title, cover, body, author->{ name }, categories[] -> {...} }`
const { params } = useRoute()

const { data: book } = await useLazySanityQuery<SanityBook>(BOOK_QUERY, params)
const { urlFor } = useSanityImage()

</script>

<template>
  <main
    v-if="book"
    class="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4"
  >
    <a href="/" class="hover:underline">&larr; Back to books</a>
    <img
      v-if="book.cover"
      :src="urlFor(book.cover)?.width(550).height(310).url()"
      :alt="book?.title"
      class="aspect-video rounded-xl"
      width="550"
      height="310"
    />
    <h1 v-if="book.title" class="text-4xl font-bold mb-8">{{ book.title }}</h1>
    <div class="prose">
      <p v-if="book.publishedAt">
        Published: {{ new Date(book.publishedAt).toLocaleDateString() }}
      </p>
      <p v-if="book.author.name">
        Fais par: {{ book.author.name }}
      </p>
      <p>categories</p>
      <ul v-for="(categorie, index) in book.categories" :key="index">
        <li>{{ categorie.label }}</li>
      </ul>
      <SanityContent v-if="book.body" :blocks="book.body" />
    </div>
  </main>
</template>