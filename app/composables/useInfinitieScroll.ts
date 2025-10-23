import { debounce } from '~/utils/debounce'
import type { UnwrapRef } from 'vue'

export function useInfiniteScroll<T>(
  asyncFunc: (page: number, size: number) => Promise<T[]>,
  initialData: T[] = [],
  pageSize: number = 12,
) {
  const page = ref(1)
  const items = ref<T[]>([...initialData])
  const loading = ref(false)

  async function onScroll() {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
    if (nearBottom) {
      loading.value = true
      page.value++
      try {
        const res = await asyncFunc(page.value, pageSize)
        items.value.push(...res as UnwrapRef<T[]>)
      }
      catch (e) {
        console.log(e)
      }
      finally {
        loading.value = false
      }
    }
  }

  const debounced = debounce(onScroll, 1000)

  onMounted(() => {
    window.addEventListener('scroll', () => debounced())
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { items, loading }
}
