import { debounce } from '~/utils/debounce'
import type { UnwrapRef } from 'vue'

export function useInfiniteScroll<T>(
  asyncFunc: (page: number, size: number) => Promise<T[]>,
  initialData: T[] = [],
  pageSize: number = 12,
) {
  const page = ref(1)
  const items = ref<T[]>([...initialData])
  const isLoading = ref(false)
  const isFinished = ref(false)

  async function onScroll() {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
    if (nearBottom) {
      if (isLoading.value || isFinished.value) return
      isLoading.value = true
      page.value++
      try {
        const res = await asyncFunc(page.value, pageSize)
        items.value.push(...res as UnwrapRef<T[]>)
        if (res.length === 0) {
          isFinished.value = true
        }
      }
      catch (e) {
        console.log(e)
      }
      finally {
        isLoading.value = false
      }
    }
  }

  const debounced = debounce(onScroll, 100)

  onMounted(() => {
    window.addEventListener('scroll', () => debounced())
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { items, isLoading }
}
