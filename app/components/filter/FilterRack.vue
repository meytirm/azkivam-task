<template>
  <UCard>
    <div class="flex items-center justify-between mb-8">
      <span class="font-bold text-xl">
        فیلترها
      </span>
      <span
        v-if="isFilterSelected"
        class="text-xs text-red-500 flex items-center gap-1 cursor-pointer"
        @click="$router.push('/products')"
      >
        <UIcon name="i-lucide-trash" />
        پاک کردن فیلتر
      </span>
    </div>
    <div class="font-bold text-sm mb-4">
      دسته‌بندی‌ها
    </div>
    <UAccordion
      v-model="accordionState"
      :items="parenCategories"
      label-key="name"
      type="multiple"
    >
      <template #content="{ item }">
        <p
          v-for="category in item.children"
          :key="category.id"
          class="pb-3.5 text-sm text-muted"
        >
          <NuxtLink
            :to="{
              name: 'products-categoryId-slug',
              params: { categoryId: category.id, slug: category.slug },
              query: merchantIdsQuery,
            }"
            exact-active-class="font-bold"
          >
            {{ category.name }}
          </NuxtLink>
        </p>
      </template>
    </UAccordion>
    <USeparator
      class="my-8"
    />
    <FilterMerchants :merchants="merchants" />
  </UCard>
</template>

<script setup lang="ts">
import type { Category } from '~~/types/categories'
import type { Merchant } from '~~/types/merchants'
import { useState } from '#app'

const props = defineProps<{
  categories: Category[]
  merchants: Merchant[]
}>()

const route = useRoute()

const merchantIdsFromQuery = useState<number[]>('merchantIdsFromQuery')
const accordionState = useState<string[]>('accordionState')
const merchantIdsQuery = ref<{ merchantIds: string } | undefined>(undefined)

const parenCategories = computed(() => props.categories
  .filter(category => category.parent === null).map(parentCategory => ({
    ...parentCategory,
    children: props.categories.filter(category => category.parent === parentCategory.id),
  })))

watch(merchantIdsFromQuery, (value) => {
  const merchantIdsToString = value.join(',')
  if (!merchantIdsToString) {
    merchantIdsQuery.value = undefined
    return
  }
  merchantIdsQuery.value = { merchantIds: merchantIdsToString }
}, { immediate: true })

const isFilterSelected = computed(() => {
  const hasQuery = Object.keys(route.query).length > 0
  const hasParams = Object.keys(route.params).length > 0
  return hasQuery || hasParams
})
</script>

<style scoped>

</style>
