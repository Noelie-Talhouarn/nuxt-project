<script setup lang="ts">
import type { SanitySiteSettings } from '~/types/api/cms/profilSetting'

import IconFacebook from './icons/IconFacebook.vue'
import IconInsta from './icons/IconInsta.vue'
import IconTiktok from './icons/IconTiktok.vue'
import IconYoutube from './icons/IconYoutube.vue'

defineProps<{
  logo: SanitySiteSettings['logo']
  navigation: SanitySiteSettings['navigation']
}>()

const { urlFor } = useSanityImage()

</script>

<template>
  <footer class="footer">
    <nav class="footer__nav-container">
    
      <NuxtLink to="/">
        <img v-if="logo && urlFor(logo)" :src="urlFor(logo)?.url()" alt="" >
      </NuxtLink>
      <ul class="footer__nav">
        <li 
          v-for="(item, index) in navigation" 
          :key="index"
          class="footer__nav-item"
        >
          <NuxtLink :to="item.url" class="footer__link">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>


      <ul class="footer__social">
        <li class="footer__social-item">
          <a href="/" class="footer__social-link"><IconTiktok /></a>
        </li>
        <li class="footer__social-item">
          <a href="/" class="footer__social-link"><IconFacebook /></a>
        </li>
        <li class="footer__social-item">
          <a href="/" class="footer__social-link"><IconInsta /></a>
        </li>
        <li class="footer__social-item">
          <a href="/" class="footer__social-link">
            <IconYoutube /></a>
        </li>
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
   color: var(--color-text-btn);
 }

 &__nav-item {
   color: var(--color-text-btn);
   text-decoration: none;
   font-size: rem(15);
 }


 &__link {
   color: var(--color-text-btn);
   font-size: rem(15);
 }

 &__social {
   display: flex;
   gap: rem(16);
   list-style: none;
   padding: 0;
 }

 &__social-link {
   display: flex;
   align-items: center;
   color: var(--color-text-btn);
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
