<template>
  <div>
    <nav class="border-b border-b-gray-100 py-6 px-8 mb-4">
      <ul class="flex items-center gap-2">
        <li>
          <NuxtLink
            to="/"
            exact-active-class="font-bold"
          >خانه</NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/products"
            exact-active-class="font-bold"
          >
            محصولات
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <UContainer>
      <slot />
    </Ucontainer>
  </div>
</template>

<script setup lang="ts">
import { useProductFilter } from '~/composables/filter/useProductFilter'

useState('accordionState', () => [])

useProductFilter()
</script>

<style scoped>

</style>
