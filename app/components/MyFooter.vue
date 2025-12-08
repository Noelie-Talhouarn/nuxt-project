<script setup lang="ts">
import IconFacebook from './icons/IconFacebook.vue'
import IconInsta from './icons/IconInsta.vue'
import IconLogo2 from './icons/IconLogo2.vue'
import IconTiktok from './icons/IconTiktok.vue'
import IconYoutube from './icons/IconYoutube.vue'
</script>

<template>
  <footer class="footer">
    <nav class="footer__nav-container">
    
      <a class="footer__logo" href="/">
        <IconLogo2 />
      </a>

   
      <ul class="footer__nav">
        <li class="footer__nav-item"><a href="/">Accueil</a></li>
        <li class="footer__nav-item"><a href="/">Recettes</a></li>
        <li class="footer__nav-item"><a href="/">A propos</a></li>
      </ul>

    
      <ul class="footer__social">
        <li><a href="/"><IconTiktok /></a></li>
        <li><a href="/"><IconFacebook /></a></li>
        <li><a href="/"><IconInsta /></a></li>
        <li><a href="/"><IconYoutube /></a></li>
      </ul>
    </nav>

    
    <p class="footer__text">COPYRIGHT: © 2024 COOKS DELIGHT.</p>
  </footer>
</template>

<style lang="scss">
.footer {
  background: var(--color-secondary);

  padding: rem(20) rem(15);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;


  &__nav-container {
      font-size: var(--font-size-text);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }


  &__logo {
    display: flex;
    align-items: center;
  }


  &__nav {
    display: flex;
    gap: rem(15);
    list-style: none;
    padding: 0;
    margin: 0;

    a {
      color: var(--color-text-btn);
      text-decoration: none;
      font-size: rem(15);
    }
  }


  &__social {
    display: flex;
    gap: 1rem;
    list-style: none;
    padding: 0;

    a {
      display: flex;
      align-items: center;
    }
  }


  &__text {
    font-size: var(--font-size-text);
    margin-top: rem(10);
    text-align: center;
    color: var(--color-text-btn);
    opacity: 0.8;
  }
}
</style>
