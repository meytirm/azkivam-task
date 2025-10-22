<template>
  <div>
    <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~~/types/products'
import ProductCard from '~/components/ProductCard.vue'

defineProps<{ products: Product[] }>()
</script>

<style scoped>

</style>
