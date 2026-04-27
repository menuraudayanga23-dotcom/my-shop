import { ref } from 'vue'
import type { Product, ProductsResponse } from '../types'

export function useProducts() {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts(category?: string, search?: string) {
    loading.value = true
    error.value = null
    try {
      let url = 'https://dummyjson.com/products?limit=50'
      if (category) url = `https://dummyjson.com/products/category/${category}?limit=50`
      if (search) url = `https://dummyjson.com/products/search?q=${search}&limit=50`
      const res = await fetch(url)
      const data: ProductsResponse = await res.json()
      products.value = data.products
    } catch (e) {
      error.value = 'Failed to load products'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    const res = await fetch('https://dummyjson.com/products/categories')
    const data = await res.json()
    categories.value = data.map((c: { slug: string }) => c.slug)
  }

  return { products, categories, loading, error, fetchProducts, fetchCategories }
}