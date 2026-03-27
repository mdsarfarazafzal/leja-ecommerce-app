import { userService } from '@/services/api'
import type { User } from '@/types'
import { toast } from '@steveyuowo/vue-hot-toast'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from './order'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const getUser = computed(() => user.value)
  const router = useRouter()
  const isEditing = ref(false)
  const orders = useOrderStore()

  const edit = computed(() => isEditing.value)

  function toggleEdit() {
    isEditing.value = !isEditing.value
  }

  async function create(data: { email: string; password: string; name: string; avatar: string }) {
    try {
      const res = await userService.create({ ...data, role: 'customer' })
      if (res.id) {
        toast.success('Welcome!')
        router.push('/login')
      }
    } catch (error) {
      console.error('Error creating user')
      toast.error('Failed')
    }
  }

  async function init() {
    if (localStorage.getItem('access_token')) {
      user.value = await userService.profile()
    }
  }

  async function login(data: { email: string; password: string }) {
    try {
      const res = await userService.login(data)
      localStorage.setItem('access_token', res.access_token)
      user.value = await userService.profile()
      return true
    } catch (error) {
      console.error('Error loggin in')
      return false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('cart')
    localStorage.removeItem('orders')
    router.push('/')
    location.reload()
  }

  async function save(data: { name: string; avatar: string }) {
    toast.loading('Updating...')
    const res = await userService.save(data)
    if (res.id) {
      user.value = await userService.profile()
      toggleEdit()
    }
  }

  return { create, login, isAuthenticated, getUser, logout, init, toggleEdit, edit, save }
})
