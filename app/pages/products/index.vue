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
          <FilterRack
            :categories="categoriesData"
            :merchants="merchantsData"
          />
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

const products = useProducts()
const categoriesApi = useCategories()
const merchantsApi = useMerchants()
const { data } = await useAsyncData('products', () => products.findAll(1, 12))
const { data: categories } = await useAsyncData('categories', () => categoriesApi.findAll())
const { data: merchants } = await useAsyncData('merchants', () => merchantsApi.findAll())

const categoriesData = categories.value ? categories.value.data : []

const merchantsData = merchants.value ? merchants.value.data : []

const initialData = computed(() => data.value ? data.value.data : [])

const productApiFunc = (page: number, size: number) => products.findAll(page, size).then(res => res.data)

const { items, isLoading } = useInfiniteScroll<Product>(productApiFunc, initialData)
</script>

<style scoped>

</style>
