<template>
  <UCard>
    <div class="font-bold mb-8 text-xl">
      فیلترها
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
              query: merchantIdsQuery }"
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
</script>

<style scoped>

</style>
