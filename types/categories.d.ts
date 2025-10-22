interface Category {
  id: number
  name: string
  slug: string
  enabled: boolean
  priority: number
  mapped: boolean
  parent: number | null
  description?: string | null // optional field (only present in one item)
}

export interface CategoryResponse {
  data: Category[]
}
