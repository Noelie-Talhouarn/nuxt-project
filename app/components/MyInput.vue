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
      'input--small': size === 'small',
      'input--medium': size === 'medium',
      'input--large': size === 'large',
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

  &__label {
    font-size: rem(14);
    font-weight: 600;
    color: var(--color-primary);
  }

  &__field {
    padding: rem(10) rem(14);
    font-size: rem(16);
    border: 1px solid var(--color-secondary);
    border-radius: rem(8);
    background: #fff;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    &::placeholder {
      color: #888;
    }
  }
    &--small {
    max-width: rem(150);
  }

  &--medium {
    max-width: rem(260);
  }

  &--large {
    max-width: rem(350);
  }
}
</style>