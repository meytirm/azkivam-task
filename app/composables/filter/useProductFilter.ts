import { useFilter } from '~/composables/filter/useFilter'

export function useProductFilter() {
  const filters = [
    {
      key: 'merchantIds',
      parse: (value: string) => value.split(',').map(val => +val),
      stringify: (value: number[]) => value.join(','),
      defaultValue: [],
    },
  ]
  const { clearAllFilters, isFilterSelected } = useFilter(filters)

  return { clearAllFilters, isFilterSelected }
}
