<script setup lang="ts">
const props = defineProps<{
  cuisines: Cuisine[]
  modelValue: string[]      
  search?: string           
}>()

const emit = defineEmits([
  'update:modelValue',
  'update:search'
])

// Toggle d’un filtre (checkbox)
function toggleFilter (value: string) {
  const newFilters = [...props.modelValue]

  const index = newFilters.indexOf(value)
  if (index === -1) newFilters.push(value)
  else newFilters.splice(index, 1)

  emit('update:modelValue', newFilters)
}
</script>

<template>
  <div class="filters">

    <!-- 🔎 Barre de recherche -->
    <MyInput
      v-if="search !== undefined"
      type="text"
      :value="search"
      @input="emit('update:search', ($event.target as HTMLInputElement).value)"
      placeholder="Rechercher..."
    />

    <!-- 🏷️ Liste des filtres -->
    <div class="filters__list">
      <label
        v-for="cuisine in cuisines"
        :key="cuisine.name"
        class="filters__item"
      >
        <input
          class="filters__checkbox"
          type="checkbox"
          :checked="modelValue.includes(cuisine.name)"
          @change="toggleFilter(cuisine.name)"
        >
        <span class="filters__label">{{ cuisine.name }}</span>
      </label>
    </div>

  </div>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 2rem 0;

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 6px;
     --button-color: var(--color-text-btn);
  --button-bg-color: var(--color-secondary);
  padding: rem(8) rem(20);
  background: var(--button-bg-color);
  color: var(--button-color);
  border-radius: rem(20);
  text-decoration: none;
  font-size: var(--font-size-base);
  cursor: pointer;

  }

  &__checkbox {
    accent-color: var(--color-secondary);
  }

}
</style>
