import { useApi } from '~/composables/useApi'
import type { CategoryResponse } from '~~/types/categories'

export const useCategories = () => {
  const api = useApi()

  function findAll() {
    return api.post<CategoryResponse>('/categories')
  }

  return { findAll }
}
