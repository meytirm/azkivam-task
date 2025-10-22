export function debounce(func: (...args: never[]) => void, wait: number) {
  let timeout: number | null = null

  return (...args: never[]) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}
