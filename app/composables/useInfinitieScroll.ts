import { debounce } from '~/utils/debounce'

export const useInfiniteScroll = () => {
  function onScroll() {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
    if (nearBottom) {
      console.log('here')
    }
  }

  const debounced = debounce(onScroll, 1000)

  onMounted(() => {
    window.addEventListener('scroll', () => debounced())
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
}
