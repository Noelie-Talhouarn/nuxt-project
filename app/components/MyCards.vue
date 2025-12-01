<script setup lang="ts">


defineProps<{
  image: string;
  title: string;
  description: string;
  details: string;
  buttonText: {
    type: string;
    default: 'Voir la recette';
  };
}>()
</script>

<template>
  <div>
    <img :src="image" :alt="title" >

    <MyTitle as="h3" size="small">
      {{ title }}
    </MyTitle>
    <p>{{ description }}</p>
    <div>
      <span>{{ details }}</span>
      <MyButton href="/" variant="purple" size="small">{{
        buttonText
      }}</MyButton>
    </div>
  </div>
</template>

<style lang="scss"></style>
