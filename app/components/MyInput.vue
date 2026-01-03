<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  label?: string
  type: 'text' | 'email' | 'password'
  size?: 'default' | 'small' | 'medium' | 'large'

}>()

</script>

<template>
  <div 
    class="input"
    :class="{
      '-small': size === 'small',
      '-medium': size === 'medium',
      '-large': size === 'large',
    }"
  >
    <label v-if="label" class="input__label">{{ label }}</label>

    <input
      v-model="model"
      :type="type"
      class="input__field"
    >
  </div>
</template>


<style lang="scss">
.input {
  display: flex;
  flex-direction: column;
  gap: rem(8);
  width: 100%;

  &__label {
    font-size: rem(14);
    font-weight: 600;
    color: var(--color-primary);
  }

  &__field {
    width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    padding: rem(10) rem(14);
    font-size: rem(16);
    border: 1px solid var(--color-secondary);
    border-radius: rem(8);
    background: var(--color-text-btn);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    &::placeholder {
      color: var(--color-primary);
    }
  }
    &.-small {
font-size: rem(14);
  padding: rem(8) rem(12);  }

  &.-medium {
font-size: rem(16);  }

  &.-large {
font-size: rem(18);
  padding: rem(12) rem(16);  }
}
</style>