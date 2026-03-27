import { categoryService, productService } from '@/services/api'
import { type Category, type Product } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProductStore = defineStore('products', () => {
  const categories = ref<Category[]>([])
  const products = ref<Product[]>([])
  const getProducts = computed(() => products.value)
  const currentCategory = ref<number | null>(null)
  function setCategory(id: number | null) {
    currentCategory.value = id
  }
  async function fetchCategories() {
    try {
      categories.value = await categoryService.getAll()
    } catch (error) {
      console.error('Error fetching categories.')
    }
  }

  async function fetchProducts() {
    try {
      products.value = await productService.getAll()
    } catch (error) {
      console.error('Error fetching products.')
    }
  }

  function filteredProducts() {
    let list = [...getProducts.value]
    if (currentCategory.value !== null) {
      list = list.filter((item) => item.category.id === currentCategory.value)
    }
    return list
  }

  return {
    fetchCategories,
    categories,
    fetchProducts,
    getProducts,
    currentCategory,
    setCategory,
    filteredProducts,
  }
})
