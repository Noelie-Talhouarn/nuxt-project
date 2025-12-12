<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const div = ref<null | HTMLDivElement>(null)

const percentage = ref(0)

function handleScroll () {
  if (!div.value) return
  const divTop = div.value.offsetTop
  const divBottom = divTop + div.value.offsetHeight
  const screenHeight = window.innerHeight

  const startScroll = divTop
  const endScroll = divBottom - screenHeight

  const totalDistance = endScroll - startScroll

  const progress = (window.scrollY - startScroll) / totalDistance
  // eslint-disable-next-line no-console
  console.log(window.scrollY, divTop)
  percentage.value = Math.min(Math.max(0, Math.round(progress * 100)), 100)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('srcoll', handleScroll)
})
</script>

<template>
  <div ref="div" class="backgroundScroll">
    <div class="backgroundScroll_content">
      <p>{{ percentage }}%</p>
    </div>
  </div>
</template>

<style lang="scss">
.backgroundScroll {
  background: var(--color-secondary);
  min-height: 200vh;
  color: var(--color-text-btn);
  &_content {
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: rem(40);
  }
}
</style>
