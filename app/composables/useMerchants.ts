import { useApi } from '~/composables/useApi'

export const useMerchants = () => {
  const api = useApi()

  function findAll() {
    return api.post('/merchants')
  }

  return { findAll }
}
