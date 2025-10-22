<template>
  <UPage>
    <template #default>
      <ProductsRack
        v-if="data && data.data.length > 0"
        :products="data.data"
      />
    </template>
  </UPage>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const products = useProducts()
const { data } = await useAsyncData('products', () => products.findAll(1, 12))
</script>

<style scoped>

</style>
