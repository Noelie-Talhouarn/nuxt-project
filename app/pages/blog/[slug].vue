<script setup lang="ts">
const route = useRoute()
console.log(route)

</script>

<template>
    <div>
        <h1>article ??{{ route.params.slug }}</h1>
    </div>
</template>