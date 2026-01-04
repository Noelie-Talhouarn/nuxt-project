<script setup lang="ts">
defineProps<{
  error: {
    statusCode?: number
    message?: string
  }
}>()

function goHome () {
  clearError({ redirect: '/' })
}
</script>

<template>
  <main class="error">
    <div class="error__content">
      <MyTitle as="h1" size="large" class="error__code">
        {{ error?.statusCode || 404 }}
      </MyTitle>

      <MyTitle as="h2" size="medium" class="error__title">
        Page introuvable
      </MyTitle>

      <p class="error__message">
        Désolé, la page que vous cherchez n’existe pas ou a été déplacée.
      </p>

      <MyButton class="error__button" @click="goHome">
        Retour à l’accueil
      </MyButton>
    </div>
  </main>
</template>

<style lang="scss">
.error {
    padding: rem(50);
    display: flex;
    justify-content: center;
    align-items: center;

    background: var(--color-bg, #f7f7f7);
    text-align: center;
    padding: rem(20);

    &__content {
        max-width: rem(480);
    }

    &__code {
        font-size: rem(96);
        font-weight: 800;
        color: var(--color-secondary);
        margin-bottom: rem(10);
    }

    &__title {
        font-size: rem(28);
        margin-bottom: rem(10);
        color: var(--color-primary);
    }

    &__message {
        font-size: rem(16);
        margin-bottom: rem(24);
    }

    &__button {
        padding: rem(12) rem(24);
        border-radius: rem(24);
        border: none;
        cursor: pointer;

        background: var(--color-secondary);
        color: var(--color-text-btn);
        font-size: rem(16);
        font-weight: 600;
    }
}
</style>
