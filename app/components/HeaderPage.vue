<script setup lang="ts">
import type { SanitySiteSettings } from '~/types/api/cms/profilSetting'
const activeMenu = ref(false)
function toggleMenu () {
  activeMenu.value = !activeMenu.value
}
function closeMenu () {
  activeMenu.value = false
}

defineProps<{
  logo: SanitySiteSettings['logo']
  navigation: SanitySiteSettings['navigation']
}>()

const { urlFor } = useSanityImage()

const { user, isLoggedIn, logout } = useAuth()


// ============================
// AUTH avec JWT dans le cookie
// ============================
// const cookie = useCookie('recipe_token')

// const user = computed(() => {
//   if (!cookie.value) return null

//   try {
//     const parts = cookie.value.split('.')
//     if (!parts[1]) return null

//     return JSON.parse(atob(parts[1]))
//   } catch {
//     return null
//   }
// })

// const isLoggedIn = computed(() => !!user.value)

// function logout () {
//   cookie.value = null
//   navigateTo('/login')
// }
</script>

<template>
  <header class="header">
    <div class="header__container">

      <!-- LOGO -->
      <NuxtLink to="/">
        <img v-if="logo && urlFor(logo)" :src="urlFor(logo)?.url()" alt="" >
      </NuxtLink>
          

      <!-- BOUTON MENU MOBILE -->
      <button 
        class="header__burger"
        :class="{ '-active': activeMenu }"
        aria-label="Menu"
        @click="toggleMenu"
      >
        <span class="header__burger-line"/>
        <span class="header__burger-line"/>
        <span class="header__burger-line"/>
      </button>

      <!-- NAVIGATION -->
      <nav 
        class="header__nav"
        :class="{ 'header__nav-open': activeMenu }"
        @click.self="closeMenu"
      >

        <ul class="header__menu">
          <li v-for="(item, index) in navigation" :key="index">
            <NuxtLink 
              :to="item.url" 
              class="header__link"
              @click="closeMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- AUTH BUTTONS -->
        <div class="header__auth">

          <!-- Connecté -->
          <template v-if="isLoggedIn">
            <span class="header__email">{{ user?.email }}</span>

            <MyButton href="/dashboard" variant="purple" @click="closeMenu">
              Profil
            </MyButton>

            <MyButton variant="transparent" @click="logout">
              Déconnexion
            </MyButton>
          </template>


          <!-- Non connecté -->
          <template v-else>
            <MyButton href="/login" variant="purple"   @click="closeMenu">
              Se connecter
            </MyButton>

            <MyButton   href="/register" variant="transparent" @click="closeMenu">
              S'inscrire
            </MyButton>
          </template>

        </div>

      </nav>
    </div>
  </header>
</template>
<style lang="scss">

.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: rem(80);
  background: var(--color-text-btn);
  z-index: 1000;
  border-bottom: solid rem(2) var(--color-secondary);

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* LOGO */
  &__logo-icon {
    width: rem(60);
    height: rem(60);
    color: var(--color-primary);
  }

 /* BURGER MOBILE */
&__burger {
  width: rem(30);
  height: rem(26);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--color-third);
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2000; /* IMPORTANT : la croix reste visible */

  &-line {
      height: rem(4);
      width: 100%;
      background: var(--color-primary);
      border-radius: rem(2);
      transition: 0.3s;
    }
  
    &.-active {
      .header__burger-line:nth-child(1) {
        transform: translateY(13px) rotate(45deg);
      }
  
      .header__burger-line:nth-child(2) {
        opacity: 0;
      }
  
      .header__burger-line:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }


/* ⬅️ CORRECT : MEDIA QUERY À PART */
@media (min-width: 1024px) {
  .header__burger {
    display: none;
  }
}

  /* NAVIGATION */
  &__nav {
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    width: 100%;
    background: var(--color-text-btn);
    padding-top: rem(80);
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: rem(30);
    transform: translateX(-100%);
    transition: 0.4s ease;

    &-open {
      transform: translateX(0);
    }

    @media (min-width: 1024px) {
      position: static;
      height: auto;
      width: auto;
      background: var(--color-third);
      padding-top: 0;
      transform: none;
      flex-direction: row;
      align-items: center;
      gap: rem(20);
    }
  }

  &__menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: rem(20);

    @media (min-width: 1024px) {
      flex-direction: row;
      gap: rem(30);
    }
  }

  &__link {
    font-size: rem(16);
    font-weight: 500;
    color: var(--color-primary);
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      color: var(--color-secondary);
      text-decoration: underline;
    }


    @media (min-width: 1024px) {
      font-size: rem(16);
    }
  }

  /* AUTH BUTTONS */
  &__auth {
    display: flex;
    flex-direction: column;
    gap: rem(10);

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
      gap: rem(15);
    }
  }

  &__email {
    font-size: rem(14);
    color: var(--color-secondary);
  }

  &__btn {
    padding: rem(10) rem(18);
    border-radius: rem(8);
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    transition: 0.2s;

    &--logout {
      border: rem(1) solid var(--color-delete);
      color: var(--color-delete);

      &:hover {
        background: var(--color-delete);
        color: var(--color-text-btn);
      }
    }
  }
}

</style>