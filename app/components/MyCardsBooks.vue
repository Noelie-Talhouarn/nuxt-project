<script setup lang="ts">
import type { SanityBook } from '~/types/api/cms/book'

const { book } = defineProps<{
  book: SanityBook
}>()

const { urlFor } = useSanityImage()
</script>

<template>
  <div class="card">
    <img
      v-if="book.cover"
      :src="urlFor(book.cover)?.width(600).height(400).url()"
      :alt="book.title"
      class="card__image"
    />

    <div class="card__content">
      <MyTitle class="card__title" as="h3" size="small">
        {{ book.title }}
      </MyTitle>

      <p class="card__description">
        Publié le {{ new Date(book.publishedAt).toLocaleDateString() }}
      </p>

      <div class="card__footer">
        <NuxtLink :to="`/books/${book.slug.current}`">
          <MyButton size="small">Voir le livre</MyButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  background: var(--color-secondary);
  border-radius: rem(12);
  max-width: rem(360);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__image {
    width: 100%;
    height: rem(200);
    object-fit: cover;
    border-radius: rem(12);
  }

  &__content {
    padding: rem(5);
    display: flex;
    flex-direction: column;
    gap: rem(8);
  }

  &__title {
    font-size: rem(5);
    font-weight: 700;
    color: var(--color-text-btn);
  }

  &__description {
    font-size: rem(15);
    color: var(--color-text-btn);
    line-height: 1.4;
    margin: 0;
  }

  &__footer {
    margin-top: rem(8);
    display: flex;
    justify-content: flex-end;
    color: var(--color-text-btn);
  }
}
</style>
