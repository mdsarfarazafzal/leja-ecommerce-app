import { useAuthStore } from '@/stores/auth'
import type { AuthTokens, Category, Product, User } from '@/types'
import ApiClient from 'sarfaraz-api-wrapper'

const api = new ApiClient({
  baseUrl: 'https://api.escuelajs.co/api/v1',
  getToken: () => localStorage.getItem('access_token'),
})

export const productService = {
  getAll(): Promise<Product[]> {
    return api.get('/products')
  },
}

export const categoryService = {
  getAll(): Promise<Category[]> {
    return api.get('/categories')
  },
}

export const userService = {
  create(data: {
    email: string
    password: string
    avatar: string
    name: string
    role?: 'admin' | 'customer'
  }): Promise<User> {
    return api.post<User>('/users', data)
  },
  login(data: { email: string; password: string }): Promise<AuthTokens> {
    return api.post<AuthTokens>('/auth/login', data)
  },
  profile(): Promise<User> {
    return api.get<User>('/auth/profile')
  },
  save(data: { name: string; avatar: string }): Promise<User> {
    const user = useAuthStore()
    return api.request<User>(`/users/${user.getUser?.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
}
