interface Merchant {
  id: number
  name: string
  enabled: boolean | null
  description: string | null
}

export interface MerchantResponse {
  data: Merchant[]
}
