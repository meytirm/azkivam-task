<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import type { Merchant } from '~~/types/merchants'
import type { CheckboxGroupItem } from '#ui/components/CheckboxGroup.vue'
import { useRoute } from 'nuxt/app'

const props = defineProps<{
  merchants: Merchant[]
}>()
const route = useRoute()
const router = useRouter()
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

const selectedMerchants = ref(merchantNumberIds.value)
const merchantsFiltered = props.merchants as CheckboxGroupItem[]

watch(selectedMerchants, (value) => {
  router.push({
    query: { merchantIds: value },
  })
})
</script>

<style scoped>

</style>
