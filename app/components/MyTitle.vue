<script setup lang="ts">
const props = defineProps<{
  as: 'h1' | 'h2' | 'h3'
  size?: 'default' | 'small' | 'medium' | 'large'
}>()
</script>

<template>


  <component :is="as" class="title" :class="{ large: props.size === 'large',small: props.size === 'small' }">
    <slot/>
  </component>
</template>

<style lang="scss">
.title {
  font-size: rem(50);
  font-weight: bold;
  line-height: rem(60);
  &.large {
    font-size: rem(60);
  }
  &.small {
    font-size: rem(20);
  }
   &.medium {
    font-size: rem(40);
  }
}
</style>
