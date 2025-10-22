import { useApi } from '~/composables/useApi'

type RequestType = {
  merchantIds: number[]
}

export const useProducts = () => {
  const api = useApi()

  function findAll(page: number, size: number, body?: RequestType) {
    return api.post('/products', {
      params: {
        page,
        size,
      },
      body: body,
    })
  }
  function findByCategoryId(page: number, size: number, id: number, body?: RequestType) {
    return api.post(`/products/${id}`, {
      params: {
        page,
        size,
      },
      body: body,
    })
  }

  return { findAll, findByCategoryId }
}
