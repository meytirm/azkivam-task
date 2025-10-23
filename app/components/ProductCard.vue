<template>
  <UCard
    variant="soft"
    :ui="{
      root: 'min-h-[300px]',
    }"
  >
    <NuxtImg
      :src="product.imageUrl"
      alt="تصویر محصول"
    />
    <div>{{ product.name }}</div>
    <div>
      <div>شروع قیمت از:</div>
      <div>{{ product.minPrice }} <span>تومان</span></div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Product } from '~~/types/products'

defineProps<{ product: Product }>()
</script>

<style scoped>

</style>
