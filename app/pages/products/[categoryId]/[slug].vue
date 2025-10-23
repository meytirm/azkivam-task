<template>
  <UPage
    right="lg"
    :ui="{
      right: 'lg:col-span-3',
      center: 'lg:col-span-7',
    }"
  >
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
    <template #right>
      <div>
        <UPageAside>
          <FilterRack :categories="categoriesData" />
        </UPageAside>
      </div>
    </template>
  </UPage>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'
import type { Product } from '~~/types/products'
import { useInfiniteScroll } from '~/composables/useInfinitieScroll'
import { useCategories } from '~/composables/useCategories'

const route = useRoute()
const categoryId = route.params.categoryId as string
console.log(categoryId)
const products = useProducts()
const categoriesApi = useCategories()
const { data } = await useAsyncData(`products-${categoryId}`, () => products.findByCategoryId(1, 12, +categoryId))
const { data: categories } = await useAsyncData('categories', () => categoriesApi.findAll())
const categoriesData = categories.value ? categories.value.data : []

const initialData = data.value ? data.value.data : []

const productApiFunc = (page: number, size: number) => products.findByCategoryId(page, size, +categoryId).then(res => res.data)

const { items, isLoading } = useInfiniteScroll<Product>(productApiFunc, initialData || [])
</script>

<style scoped>

</style>
