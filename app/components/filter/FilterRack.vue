<template>
  <UCard>
    <UAccordion
      :items="parenCategories"
      label-key="name"
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
    <div>فروشگاه‌ها</div>
    <UInput
      icon="i-lucide-search"
      size="md"
      variant="outline"
      placeholder="جستجوی فروشگاه"
    />
  </UCard>
</template>

<script setup lang="ts">
import type { Category } from '~~/types/categories'
import type { Merchant } from '~~/types/merchants'

const props = defineProps<{
  categories: Category[]
  merchants: Merchant[]
}>()

const parenCategories = computed(() => props.categories
  .filter(category => category.parent === null).map(parentCategory => ({
    ...parentCategory,
    children: props.categories.filter(category => category.parent === parentCategory.id),
  })))
</script>

<style scoped>

</style>
