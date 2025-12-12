<script setup lang="ts">
const props = defineProps<{
  cuisines: Cuisine[]
  modelValue: string[]
  search: string
  inputSize?: 'default' | 'small' | 'medium' | 'large'
}>()

const emit = defineEmits([
  'update:modelValue',
  'update:search'
])

// --- Mise à jour de la recherche ---
function onSearchInput (value: string | undefined) {
  emit('update:search', value ?? '')
}

// --- Toggle checkbox ---
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
      label="Rechercher une recette"
      type="text"
      :size="inputSize"
      :model-value="search"
      @update:model-value="onSearchInput"
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

<style lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  --button-color: var(--color-text-btn);
  --button-bg-color: var(--color-primary);
  --button-border-color: var(--color-primary);
  padding: rem(8) rem(20);
  color: var(--button-color);
  border-radius: rem(20);
  text-decoration: none;
  font-size: var(--font-size-base);


  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: rem(10);
    justify-content: center;
      padding-top: rem(20);

  }

  &__item {
    display: flex;
    align-items: center;
    gap: 6px;
    
    padding: rem(8) rem(20);
    background: var(--color-secondary);
    border-radius: rem(20);
    cursor: pointer;
  }

  &__checkbox {
    accent-color: var(--color-primary);
  }
}
</style>
