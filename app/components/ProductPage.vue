<template>
  <UPage
    :ui="{
      left: 'lg:col-span-3',
      center: 'lg:col-span-7',
    }"
  >
    <template #default>
      <div>
        <UModal
          v-model:open="filterModal"
          fullscreen
          title="Modal fullscreen"
        >
          <template #body>
            <FilterRack
              :categories="categoriesData"
              :merchants="merchantsData"
            />
          </template>
        </UModal>
        <span
          class="flex items-center gap-2 cursor-pointer lg:hidden"
          @click="filterModal = true"
        >
          <UIcon
            name="mdi:mixer-settings"
            class="size-5"
          />
          فیلترها
        </span>
        <USeparator class="my-4" />
      </div>
      <ProductSkeleton v-if="pending" />
      <ProductsRack
        v-if="items.length > 0"
        :products="items"
      />
      <UAlert
        v-if="items.length === 0 && (!pending) && !error"
        title="محصولی پیدا نشد!"
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
        <UPageAside
          :ui="{
            root: 'pt-1',
          }"
        >
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
const filterModal = ref<boolean>(false)

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
  return products.value ? products.value : []
})

const { items, isLoading } = useInfiniteScroll<Product>(productApiFunction, initialData, pageSize)
</script>

<style scoped>

</style>
