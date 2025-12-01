<script lang="ts" setup>


const isNavOpen = ref(false)

const onMenuClick = () => {
  isNavOpen.value = !isNavOpen.value
}
</script>

<template>
  <MyButton @click="onMenuClick">{{ isNavOpen ? "Close" : "Menu" }}</MyButton>
  <nav v-if="isNavOpen">
    <ul>
      <li><a href="/">Accueil</a></li>
      <li><a href="/">Recettes</a></li>
      <li><a href="/About">A propos</a></li>
      <MyButton>Suscribe</MyButton>
    </ul>
  </nav>
</template>

<style lang="scss"></style>
