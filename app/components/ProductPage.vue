<template>
  <UPage
    right="lg"
    :ui="{
      left: 'lg:col-span-3',
      center: 'lg:col-span-7',
    }"
  >
    <template #default>
      <ProductSkeleton v-if="pending" />
      <ProductsRack
        v-if="items.length > 0"
        :products="items"
      />
      <UAlert
        v-if="items.length === 0 && (!pending)"
        title="There is no products!"
        variant="outline"
        color="info"
      />
      <div v-if="error">
        <UButton @click="refresh()">
          retry
        </UButton>
      </div>
      <div
        class=" h-[300px] w-full bg-white"
      >
        <ProductSkeleton v-if="isLoading" />
      </div>
    </template>
    <template #left>
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

const { productApiFunction, products, pending, error, refresh } = useProductApis(categoryId, merchantNumberIds, pageSize)
const categoriesApi = useCategories()
const merchantsApi = useMerchants()

const { data: categories } = await useAsyncData('categories', () => categoriesApi.findAll())
const { data: merchants } = await useAsyncData('merchants', () => merchantsApi.findAll())

const categoriesData = categories.value ? categories.value.data : []
const merchantsData = merchants.value ? merchants.value.data : []
const initialData = computed(() => {
  if (pending.value) {
    return []
  }
  return products.value ? products.value.data : []
})

const productApiFunc = (page: number, size: number) => productApiFunction(page, size).then(res => res.data)

const { items, isLoading } = useInfiniteScroll<Product>(productApiFunc, initialData, pageSize)
</script>

<style scoped>

</style>
