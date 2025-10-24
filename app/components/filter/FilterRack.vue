<template>
  <UCard>
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
          <NuxtLink :href="`/products/${category.id}/${category.slug}`">{{ category.name }}</NuxtLink>
        </p>
      </template>
    </UAccordion>
    <USeparator
      class="my-5"
      color="info"
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
