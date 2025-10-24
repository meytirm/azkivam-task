<template>
  <UApp :locale="fa_ir">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { fa_ir } from '@nuxt/ui/locale'
</script>
