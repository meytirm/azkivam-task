<template>
  <UCard
    variant="soft"
    :ui="{
      root: 'h-[350px]',
      body: 'p-4 sm:p-4 flex flex-col h-full',
    }"
  >
    <div class="flex justify-center">
      <NuxtImg
        class="h-[150px] w-[150px] object-contain"
        :src="product.imageUrl"
        alt="تصویر محصول"
      />
    </div>
    <div class="mt-4 flex flex-col justify-between grow">
      <div
        class="text-gray-800 text-sm ellipsis cursor-default"
        :title="product.name"
      >
        {{ product.name }}
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-gray-400 text-sm">
          شروع قیمت از:
        </div>
        <div class="font-bold">
          {{ product.minPrice }} <span class="text-sm">تومان</span>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Product } from '~~/types/products'

defineProps<{ product: Product }>()
</script>

<style scoped>
.ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;     /* number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.75;
}
</style>
