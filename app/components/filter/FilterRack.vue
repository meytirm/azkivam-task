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
            :href="`/products/${category.id}/${category.slug}`"
            exact-active-class="font-bold text-black"
          >{{ category.name }}</NuxtLink>
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

const accordionState = useState<string[]>('accordionState')

const parenCategories = computed(() => props.categories
  .filter(category => category.parent === null).map(parentCategory => ({
    ...parentCategory,
    children: props.categories.filter(category => category.parent === parentCategory.id),
  })))
</script>

<style scoped>

</style>
