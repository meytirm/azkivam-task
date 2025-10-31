interface Filter<T> {
  key: string
  parse: (value: string) => T
  stringify: (value: T) => string
  defaultValue: T
}
let initializedFilter = false

// eslint-disable-next-line
export function useFilter(filters: Filter<any>[]) {
  const router = useRouter()
  const route = useRoute()
  filters.forEach((filter) => {
    const queryVal = route.query[filter.key] as string | undefined
    const parsed = queryVal ? filter.parse(queryVal) : filter.defaultValue
    const state = useState(`${filter.key}FromQuery`, () => parsed)

    if (!initializedFilter) {
      initializedFilter = true
      watch(state, (newVal) => {
        const query = { ...route.query }
        const stringified = filter.stringify(newVal)

        if (stringified) query[filter.key] = stringified
        // eslint-disable-next-line
        else delete query[filter.key]
        router.replace({ query })
      }, { deep: true })
    }
  })

  function clearAllFilters() {
    filters.forEach((filter) => {
      const filterValues = useState(`${filter.key}FromQuery`)
      filterValues.value = filter.defaultValue
    })
    return router.push({ query: {} })
  }

  const isFilterSelected = computed(() => {
    return filters.some((filter) => {
      const filterValues = useState(`${filter.key}FromQuery`)
      return JSON.stringify(filterValues.value) !== JSON.stringify(filter.defaultValue)
    })
  })

  return { clearAllFilters, isFilterSelected }
}
