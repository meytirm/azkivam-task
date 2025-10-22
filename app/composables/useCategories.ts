import { useApi } from '~/composables/useApi'

export const useCategories = () => {
  const api = useApi()

  function findAll() {
    return api.post('/categories')
  }

  return { findAll }
}
