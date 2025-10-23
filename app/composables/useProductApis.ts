export function useProductApis(categoryId: string, merchantNumberIds: Ref<number[]>, pageSize: number) {
  const productApi = useProducts()

  let productApiFunction = (page: number, size: number) => productApi.findAll(page, size, {
    merchantIds: merchantNumberIds.value,
  })
  if (categoryId) {
    productApiFunction = (page: number, size: number) => productApi.findByCategoryId(page, size, +categoryId, {
      merchantIds: merchantNumberIds.value,
    })
  }
  const { data: products, error, pending, refresh } = useAsyncData(`products-${categoryId}`,
    () => productApiFunction(1, pageSize), {
      watch: [merchantNumberIds],
    })

  return { productApiFunction, products, error, pending, refresh }
}
