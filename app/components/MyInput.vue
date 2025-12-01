<script setup lang="ts">
const model = defineModel()

defineProps<{
    label?: string
    type: 'text' | 'email' | 'password'
}>()

</script>


<template>
    <div class="inputGroup">
        <label v-if="label">{{label}}</label>
        <input :type="type" v-model="model">
    </div>
</template>

<style lang="scss">
.inputGroup {
    display: flex;
    flex-direction: column;
    gap: rem(8);
}

</style>