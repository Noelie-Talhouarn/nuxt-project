<script setup lang="ts">
const props = defineProps<{
  href?: string
  variant?: 'default' | 'purple' | 'transparent' | 'carousel'
  size?: 'default' | 'small' | 'medium' | 'large'
}>()

const emit = defineEmits(['ClickAndHover'])

function handleClickAndHover () {
  emit('ClickAndHover')
}
</script>

<template>
  <a
    v-if="href"
    :href="href"
    class="button"
    :class="{
      '-purple': variant === 'purple',
      '-transparent': variant === 'transparent',
      '-carousel': variant === 'carousel',
      small: props.size === 'small',
      medium: props.size === 'medium',
      large: props.size === 'large',
    }"
    @click="handleClickAndHover"
    @mouseenter="handleClickAndHover"
  >
    <slot/>
  </a>
  <button
    v-else
    class="button"
    :class="{
      '-purple': variant === 'purple',
      '-transparent': variant === 'transparent',
      '-carousel': variant === 'carousel',

      small: props.size === 'small',
      medium: props.size === 'medium',
      large: props.size === 'large',
    }"
    @click="handleClickAndHover"
    @mouseenter="handleClickAndHover"
  >
    <slot/>
  </button>
</template>

<style lang="scss">
.button {
  --button-color: var(--color-text-btn);
  --button-bg-color: var(--color-primary);
  --button-border-color: var(--color-primary);
  padding: rem(8) rem(20);
  background: var(--button-bg-color);
  color: var(--button-color);
  border: rem(2) solid var(--color-primary);
  border-radius: rem(20);
  text-decoration: none;
  font-size: var(--font-size-base);
  cursor: pointer;
  &:hover {
    --button-color: var(--color-primary);
    --button-bg-color: black;
    color: white;
  }
  &:hover {
    --button-color: var(--color-text);
    --button-bg-color: var(--color-third);
    color: var(--color-primary);
  }

  &.-purple {
    --button-bg-color: var(--color-secondary);

    border: none;
    color: var(  --color-text-btn);
  }

  &.-transparent {
    --button-bg-color: var(--color-third);
    border: rem(2) solid var(--color-secondary);

    color: var(--color-primary);
  }
    &.-carousel {
    --button-bg-color: var(--color-third);
    border: rem(2) solid var(--color-secondary);

    color: var(--color-primary);
    &.active {
      background-color: var(--color-secondary);
      color: var(  --color-text-btn);
    }
  }
  &.small {
    padding: rem(5) rem(10);
  }
  &.medium {
    padding: rem(7) rem(12);
  }
  &.large {
    padding: rem(9) rem(14);
  }
}
</style>
