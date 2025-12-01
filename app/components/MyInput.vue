<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  label?: string
  type: 'text' | 'email' | 'password'
}>()

</script>


<template>
  <div class="inputGroup">
    <label v-if="label">{{label}}</label>
    <input v-model="model" :type="type">
  </div>
</template>

<style lang="scss">
.inputGroup {
    display: flex;
    flex-direction: column;
    gap: rem(8);
}

</style>