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
import type { Product } from '~~/types/products'

const route = useRoute()
const categoryId = route.params.categoryId as string
const pageSize = 12

const merchantNumberIds = computed(() => {
  const merchantIds = (route.query.merchantIds) as string[] | string | undefined
  if (Array.isArray(merchantIds)) {
    return merchantIds.map((id: string) => +id)
  }
  if (merchantIds) {
    return [+merchantIds]
  }
  return []
})

// const products = useProducts()
const { productApiFunction, products } = useProductApis(categoryId, merchantNumberIds, pageSize)
const categoriesApi = useCategories()
const merchantsApi = useMerchants()

const { data: categories } = await useAsyncData('categories', () => categoriesApi.findAll())
const { data: merchants } = await useAsyncData('merchants', () => merchantsApi.findAll())

const categoriesData = categories.value ? categories.value.data : []
const merchantsData = merchants.value ? merchants.value.data : []
const initialData = computed(() => products.value ? products.value.data : [])

const productApiFunc = (page: number, size: number) => productApiFunction(page, size).then(res => res.data)

const { items, isLoading } = useInfiniteScroll<Product>(productApiFunc, initialData, pageSize)
</script>

<style scoped>

</style>
