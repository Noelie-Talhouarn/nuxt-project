<script setup lang="ts">
const activeMenu = ref(false)
function toggleMenu() {
  activeMenu.value = !activeMenu.value
}
function closeMenu () {
  activeMenu.value = false
}

// ============================
// AUTH avec JWT dans le cookie
// ============================
const cookie = useCookie('recipe_token')

const user = computed(() => {
  if (!cookie.value) return null

  try {
    const parts = cookie.value.split('.')
    if (!parts[1]) return null

    return JSON.parse(atob(parts[1]))
  } catch {
    return null
  }
})

const isLoggedIn = computed(() => !!user.value)

function logout () {
  cookie.value = null
  navigateTo('/login')
}
</script>


<template>
  <header class="header">
    <div class="header__container">

      <!-- LOGO -->
      <NuxtLink to="/" class="header__logo" @click="closeMenu">
        <IconLogo class="header__logo-icon" />
      </NuxtLink>

      <button 
        class="header__burger"
        :class="{ 'header__burger--active': activeMenu }"
        @click="toggleMenu"
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>


      <!-- NAVIGATION -->
      <nav 
        class="header__nav"
        :class="{ 'header__nav--open': activeMenu }"
      >
        <ul class="header__menu">
          <li class="header__item">
            <NuxtLink class="header__link" to="/" @click="closeMenu">Accueil</NuxtLink>
          </li>

          <li class="header__item">
            <NuxtLink class="header__link" to="/recipes" @click="closeMenu">Recettes</NuxtLink>
          </li>

          <li v-if="isLoggedIn" class="header__item">
            <NuxtLink class="header__link" to="/dashboard" @click="closeMenu">
              Dashboard
            </NuxtLink>
          </li>
        </ul>

        <!-- AUTH BUTTONS -->
        <div class="header__auth">

          <!-- Connecté -->
          <template v-if="isLoggedIn">
            <span class="header__email">{{ user?.email }}</span>
            <button class="header__btn header__btn--logout" @click="logout">
              Déconnexion
            </button>
          </template>

          <!-- Non connecté -->
          <template v-else>
            <NuxtLink class="header__btn header__btn--login" to="/login" @click="closeMenu">
              Se connecter
            </NuxtLink>

            <NuxtLink class="header__btn header__btn--register" to="/register" @click="closeMenu">
              S'inscrire
            </NuxtLink>
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
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  z-index: 1000;

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
    width: 48px;
    height: 48px;
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

    span {
      height: 3px;
      width: 100%;
      background: #000;
      border-radius: 5px;
      transition: 0.3s;
    }

    &--active {
      span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
      span:nth-child(2) { opacity: 0; }
      span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
    }

    @media (min-width: 1024px) {
  .header__burger {
    display: none;
  }
}

  }

  /* NAVIGATION */
  &__nav {
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    width: 100%;
    background: white;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
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
      color: #000;
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

    &--login {
      color: #444;
      border: 1px solid #444;

      &:hover {
        background: #444;
        color: white;
      }
    }

    &--register {
      background: #000;
      color: white;

      &:hover {
        background: #333;
      }
    }

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
