export interface Category {
  id: number
  name: string
  slug: string
  image: string
  creationAt: string
  updatedAt: string
}

export interface Product {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: Category
  images: string[]
  creationAt: string
  updatedAt: string
}

export interface User {
  id: number
  email: string
  name: string
  role: 'admin' | 'customer'
  avatar: string
  creationAt: string
  updatedAt: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface Cart {
  product: Product
  quantity: number
}

export interface Order {
  id: number
  cart: Cart[]
  user: User
  name: string
  email: string
  address: string
  price: number
}
