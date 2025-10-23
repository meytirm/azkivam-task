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
    <div>فروشگاه‌ها</div>
    <UInput
      icon="i-lucide-search"
      size="md"
      variant="outline"
      placeholder="جستجوی فروشگاه"
    />
    <UCheckboxGroup
      v-model="selectedMerchants"
      :items="merchantsFiltered"
      label-key="name"
      value-key="id"
    />
  </UCard>
</template>

<script setup lang="ts">
import type { Category } from '~~/types/categories'
import type { Merchant } from '~~/types/merchants'
import type { CheckboxGroupItem } from '#ui/components/CheckboxGroup.vue'
import { useState } from '#app'

const router = useRouter()
const props = defineProps<{
  categories: Category[]
  merchants: Merchant[]
}>()

const accordionState = useState<string[]>('accordionState')
const selectedMerchants = ref([])
const merchantsFiltered = props.merchants as CheckboxGroupItem[]

const parenCategories = computed(() => props.categories
  .filter(category => category.parent === null).map(parentCategory => ({
    ...parentCategory,
    children: props.categories.filter(category => category.parent === parentCategory.id),
  })))

watch(selectedMerchants, (value) => {
  router.push({
    query: { merchantIds: value },
  })
})
</script>

<style scoped>

</style>
