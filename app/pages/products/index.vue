<template>
  <UPage>
    <template #default>
      <ProductsRack
        :products="items"
      />
      <div
        class=" h-[300px] w-full bg-white"
      >
        <ProductSkeleton v-if="isLoading" />
      </div>
    </template>
  </UPage>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'
import type { Product } from '~~/types/products'
import { useInfiniteScroll } from '~/composables/useInfinitieScroll'

const products = useProducts()
const { data } = await useAsyncData('products', () => products.findAll(1, 12))

const initialData = data.value ? data.value.data : []

const productApiFunc = (page: number, size: number) => products.findAll(page, size).then(res => res.data)

const { items, isLoading } = useInfiniteScroll<Product>(productApiFunc, initialData || [])
</script>

<style scoped>

</style>
