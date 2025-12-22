<script setup lang="ts">
defineProps<{
  recipe: Recipe
}>()
</script>

<template>
  <div class="card">
    <NuxtImg
      :src="`/recipes/` + recipe.image_url"
      alt="Image de recette"
      class="card__image"
    />
    <div class="card__content">
      <MyTitle class="card__title" as="h3" size="small">
        {{ recipe.title }}
      </MyTitle>
      <p class="card__description">
        {{ recipe.description }}
      </p>
      <p class="card__meta">{{ recipe.cuisine_name }} {{ recipe.diet_name }} {{ recipe.goal_name }}</p>

      <div class="card__footer">
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">
          <MyButton size="small">voir la recette</MyButton>
        </NuxtLink>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  background: var(--color-secondary);
  border-radius: rem(12);
  width: 100%;
  max-width: rem(360);
  display: flex;
  flex-direction: column;
  gap: rem(12);

  &__content {
    padding: rem(10);
    display: flex;
    flex-direction: column;
    gap: rem(8);
  }

  &__title {
    font-weight: 700;
    color: var(--color-text-btn);
  }

    &__meta {
      font-size: rem(14);
      color: var(--color-text-btn);
    }

  &__description {
    font-size: rem(15);
    color: var(--color-text-btn);
    line-height: 1.4;
    margin: 0;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: rem(8);
    color: var(--color-text-btn);
  }

}
</style>
