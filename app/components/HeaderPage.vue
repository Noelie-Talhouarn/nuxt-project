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
        :class="{ 'header__burger--active': activeMenu }"
        aria-label="Menu"
        @click="toggleMenu"
      >
        <span/><span/><span/>
      </button>

      <!-- NAVIGATION -->
      <nav 
        class="header__nav"
        :class="{ 'header__nav--open': activeMenu }"
        @click.self="closeMenu"
      >

        <ul class="header__menu header-list">
          <li v-for="(item, index) in navigation" :key="index">
            <NuxtLink :to="item.url" 
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
  height: 80px;
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
    color: var(--color-text);
  }

 /* BURGER MOBILE */
&__burger {
  width: 32px;
  height: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2000; /* IMPORTANT : la croix reste visible */

  span {
    height: 3px;
    width: 100%;
    background: var(--color-text);
    border-radius: 5px;
    transition: 0.3s;
  }

  &--active {
    span:nth-child(1) { transform: translateY(15px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
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
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 30px;
    transform: translateX(-100%);
    transition: 0.4s ease;

    &--open {
      transform: translateX(0);
    }

    @media (min-width: 1024px) {
      position: static;
      height: auto;
      width: auto;
      background: transparent;
      padding-top: 0;
      transform: none;
      flex-direction: row;
      align-items: center;
      gap: 40px;
    }
  }

  &__menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: 1024px) {
      flex-direction: row;
      gap: 35px;
    }
  }

  &__link {
    font-size: 20px;
    font-weight: 500;
    color: #222;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      color: var(--color-secondary);
      text-decoration: underline;
    }


    @media (min-width: 1024px) {
      font-size: 16px;
    }
  }

  /* AUTH BUTTONS */
  &__auth {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
      gap: 15px;
    }
  }

  &__email {
    font-size: 14px;
    color: #666;
  }

  &__btn {
    padding: 10px 18px;
    border-radius: 8px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    transition: 0.2s;

    &--logout {
      border: 1px solid red;
      color: red;

      &:hover {
        background: red;
        color: white;
      }
    }
  }
}

</style>