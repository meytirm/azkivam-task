import { useApi } from '~/composables/useApi'
import type { MerchantResponse } from '~~/types/merchants'

export const useMerchants = () => {
  const api = useApi()

  function findAll() {
    return api.get<MerchantResponse>('/merchants')
  }

  return { findAll }
}
