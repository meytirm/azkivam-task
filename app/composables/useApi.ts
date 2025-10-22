import { ofetch, type FetchOptions } from 'ofetch'

type RequestType = BodyInit | Record<string, never> | null | undefined

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase

  const api = ofetch.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  })

  function get<ResponseType>(url: string, options?: FetchOptions<'json'>): Promise<ResponseType> {
    return api<ResponseType>(url, {
      method: 'GET',
      ...options,
    })
  }

  function post<ResponseType>(url: string, options?: FetchOptions<'json'>, body?: RequestType): Promise<ResponseType> {
    return api<ResponseType>(url, {
      method: 'POST',
      body: body,
      ...options,
    })
  }

  return {
    get,
    post,
  }
}
