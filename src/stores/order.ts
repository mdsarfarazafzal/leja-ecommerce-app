import type { Cart, Order } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCartStore } from './cart'
import { toast } from '@steveyuowo/vue-hot-toast'
import { useRouter } from 'vue-router'
import emailjs from '@emailjs/browser'
import { useAuthStore } from './auth'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])
  const getOrders = computed(() => orders.value)
  const cart = useCartStore()
  const router = useRouter()
  const user = useAuthStore()
  function save() {
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }

  function init() {
    orders.value = JSON.parse(localStorage.getItem('orders')!) ?? []
  }

  async function addOrder(order: Order) {
    toast.loading('Ordering...')
    orders.value.unshift(order)
    const templateParams = {
      email: order.email,
      order_id: order.id,
      cost: {
        shipping: 9,
        total: order.price,
      },
      orders: cart.emailOrders(),
    }
    await emailjs.send(
      import.meta.env.VITE_SERVICE_KEY,
      import.meta.env.VITE_TEMPLATE_KEY,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )
    save()
    toast.success('Thank You')
    router.push('/')
    cart.clearCart()
  }

  return { getOrders, addOrder, init }
})
