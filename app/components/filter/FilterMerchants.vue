<template>
  <div class="flex flex-col gap-6">
    <div class="text-gray-400 text-sm">
      فروشگاه‌ها
    </div>
    <UInput
      v-model="searchMerchant"
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

const props = defineProps<{
  merchants: Merchant[]
}>()
const router = useRouter()
const merchantIdsFromQuery = useState<number[]>('merchantIdsFromQuery')
const searchMerchant = ref<string>('')

const selectedMerchants = ref(merchantIdsFromQuery.value)
const merchantsFiltered = computed(() => {
  return props.merchants.filter(merchant => merchant.name.toLowerCase()
    .includes(searchMerchant.value.toLowerCase())) as CheckboxGroupItem[]
})

watch(selectedMerchants, (value) => {
  const queryValue = value.join(',')
  let merchantIdsQuery
  if (queryValue) {
    merchantIdsQuery = { merchantIds: queryValue }
  }
  router.push({
    query: merchantIdsQuery,
  })
})
</script>

<style scoped>

</style>
