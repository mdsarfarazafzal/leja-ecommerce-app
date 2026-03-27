import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Cart, Product } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const cart = ref(new Map<number, Cart>())

  const getCart = computed(() => cart.value)

  const subTotal = computed(() => {
    let sum = 0
    cart.value.forEach((value) => (sum += value.quantity * value.product.price))
    return sum
  })

  const shipping = ref(9)

  const total = computed(() => subTotal.value + shipping.value)

  function save() {
    localStorage.setItem('cart', JSON.stringify(Array.from(cart.value.entries())))
  }

  function init() {
    if (localStorage.getItem('cart'))
      cart.value = new Map<number, Cart>(JSON.parse(localStorage.getItem('cart')!))
  }

  function addToCart(product: Product) {
    const existing = cart.value.get(product.id)
    if (existing) {
      cart.value.set(product.id, { product, quantity: existing.quantity + 1 })
    } else {
      cart.value.set(product.id, { product, quantity: 1 })
    }
    save()
  }

  function removeFromCart(product: Product) {
    const existing = cart.value.get(product.id)

    if (existing?.quantity! > 1) {
      cart.value.set(product.id, { product, quantity: existing!.quantity - 1 })
    } else if (existing?.quantity! === 1) {
      deleteFromCart(product)
    } else {
      return
    }
    save()
  }

  function deleteFromCart(product: Product) {
    cart.value.delete(product.id)
    save()
  }

  function clearCart() {
    cart.value.clear()
    save()
  }

  function emailOrders() {
    let list: any[] = []
    cart.value.forEach((value, key) => {
      list.push({
        name: value.product.title,
        units: value.quantity,
        price: value.product.price,
        image_url: value.product.images[0],
      })
    })
    return list
  }

  return {
    addToCart,
    getCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    init,
    subTotal,
    total,
    shipping,
    emailOrders,
  }
})
