<template>
  <UPageHero
    title="تسک ازکی‌وام"
    :links="links"
  />
</template>

<script setup lang="ts">
import type { ButtonProps } from '#ui/components/Button.vue'

const links = ref<ButtonProps[]>([
  {
    label: 'نمایش',
    to: '/products',
    icon: 'i-lucide-square-play',
  },
])
</script>

<style scoped>

</style>
