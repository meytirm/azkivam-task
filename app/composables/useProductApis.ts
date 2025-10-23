export function useProductApis(categoryId: string, merchantNumberIds: Ref<number[]>) {
  const productApi = useProducts()

  let productApiFunction = (page: number, size: number) => productApi.findAll(page, size, {
    merchantIds: merchantNumberIds.value,
  })
  if (categoryId) {
    productApiFunction = (page: number, size: number) => productApi.findByCategoryId(page, size, +categoryId, {
      merchantIds: merchantNumberIds.value,
    })
  }
  const { data: products } = useAsyncData(`products-${categoryId}`,
    () => productApiFunction(1, 12), {
      watch: [merchantNumberIds],
    })

  return { productApiFunction, products }
}
