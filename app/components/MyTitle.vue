<script setup lang="ts">
defineProps<{
  as: 'h1' | 'h2' | 'h3'
  size?: 'default' | 'small' | 'medium' | 'large'
}>()
</script>

<template>
  <component
    :is="as"
    class="title"
    :class="`-${size || 'default'}`"
  >
    <slot />
  </component>
</template>

<style lang="scss">
.title {
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-secondary);
  margin: 0;

  /* =========================
     DEFAULT
  ========================= */
  &.-default {
    font-size: rem(22);

    @media (min-width: 480px) {
      font-size: rem(26);
    }

    @media (min-width: 768px) {
      font-size: rem(30);
    }
  }

  /* =========================
     SMALL
  ========================= */
  &.-small {
    font-size: rem(16);

    @media (min-width: 480px) {
      font-size: rem(16);
    }

    @media (min-width: 768px) {
      font-size: rem(18);
    }
  }

  /* =========================
     MEDIUM
  ========================= */
  &.-medium {
    font-size: rem(26);

    @media (min-width: 480px) {
      font-size: rem(30);
    }

    @media (min-width: 768px) {
      font-size: rem(36);
    }
  }

  /* =========================
     LARGE
  ========================= */
  &.-large {
    font-size: rem(30);

    @media (min-width: 480px) {
      font-size: rem(38);
    }

    @media (min-width: 768px) {
      font-size: rem(68);
    }
  }
}
</style>
