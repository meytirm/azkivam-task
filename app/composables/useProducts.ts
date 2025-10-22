import { useApi } from '~/composables/useApi'
import type { ProductResponse } from '~~/types/products'

type RequestType = {
  merchantIds: number[]
}

export const useProducts = () => {
  const api = useApi()

  function findAll(page: number = 1, size: number = 5, body?: RequestType) {
    return api.post<ProductResponse>('/products', {
      params: {
        page,
        size,
      },
      body: body,
    })
  }
  function findByCategoryId(page: number = 1, size: number = 5, id: number, body?: RequestType) {
    return api.post<ProductResponse>(`/products/${id}`, {
      params: {
        page,
        size,
      },
      body: body,
    })
  }

  return { findAll, findByCategoryId }
}
