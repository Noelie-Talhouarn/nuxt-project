<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  description: string;
  details: string;
  buttonText?: string; // ← optionnelle
}>()
</script>

<template>
  <div class="card">
    <!-- <img class="card__image" :src="image" :alt="title" /> -->
    <div class="card__content">
      <MyTitle class="card__title" as="h3" size="small">
        {{ title }}
      </MyTitle>
      <p class="card__description">{{ description }}</p>
      <div class="card__footer">
        <span>{{ details }}</span>
        <MyButton href="/" size="small">{{
          buttonText
        }}</MyButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  background: var(--color-secondary);
  border-radius: rem(12);
  padding: rem(16);
  border: 1px solid rgba(0, 0, 0, 0.08);
  max-width: rem(360);
  display: flex;
  flex-direction: column;
  gap: rem(12);

  &__image {
    width: 100%;
    height: rem(190);
    object-fit: cover;
    border-radius: rem(10);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: rem(8);
  }

  &__title {
    font-size: rem(22);
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
    color: var(--color-text-btn);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: rem(8);
  }

  &__details {
    font-size: rem(13);
    font-weight: 500;
  }

  &__button {
    font-size: rem(13) ;
    padding: 0 rem(16);
    border-radius: rem(30);
  }
}
</style>
