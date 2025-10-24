<template>
  <div>
    <nav class="border-b border-b-gray-100 py-6 px-8 mb-4">
      <ul class="flex items-center gap-2">
        <li>
          <NuxtLink
            to="/"
            exact-active-class="font-bold"
          >خانه</NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/products"
            exact-active-class="font-bold"
          >
            محصولات
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <UContainer>
      <slot />
    </Ucontainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
useState('accordionState', () => [])
const merchantIdsFromQuery = useState<number[]>('merchantIdsFromQuery', () => [])

const merchantNumberIds = computed(() => {
  const merchantIds = (route.query.merchantIds) as string | undefined
  if (merchantIds) {
    return merchantIds.split(',').map((id: string) => +id)
  }
  return []
})

watch(merchantNumberIds, (value) => {
  merchantIdsFromQuery.value = value
})
</script>

<style scoped>

</style>
