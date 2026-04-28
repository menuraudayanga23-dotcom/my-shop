<template>
  <div :class="{ dark: isDark }">
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

      <!-- Navbar -->
      <nav class="bg-white dark:bg-gray-900 shadow sticky top-0 z-10">
        <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span class="text-xl font-bold text-blue-600 dark:text-blue-400">BuyZone</span>
          <div class="flex items-center gap-3">
            <button @click="cartOpen = true" class="px-3 py-1.5 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm border border-blue-200 dark:border-blue-700">
              🛒 Cart ({{ cart.length }})
            </button>
            <button @click="isDark = !isDark" class="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              {{ isDark ? '☀️ Light' : '🌙 Dark' }}
            </button>
          </div>
        </div>
      </nav>

      <!-- Main content -->
      <main class="max-w-6xl mx-auto px-4 py-8">

        <!-- Search and filter -->
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            v-model="search"
            placeholder="Search products..."
            class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 dark:text-white outline-none"
          />
          <select
            v-model="selectedCategory"
            class="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 dark:text-white outline-none"
          >
            <option value="">All categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <!-- Result count -->
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ filteredProducts.length }} products found</p>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-20 text-gray-400 text-lg">
          Loading products...
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-20 text-red-400 text-lg">
          {{ error }}
        </div>

        <!-- Product grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            @click="selectedProduct = product"
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 transition cursor-pointer overflow-hidden"
          >
            <img :src="product.thumbnail" :alt="product.title" class="w-full h-44 object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 dark:text-white truncate">{{ product.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 capitalize mb-2">{{ product.category }}</p>
              <div class="flex items-center justify-between">
                <span class="text-blue-600 dark:text-blue-400 font-bold">${{ product.price }}</span>
                <span class="text-yellow-500 text-sm">★ {{ product.rating }}</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      <!-- Product detail modal -->
      <div v-if="selectedProduct" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="selectedProduct = null">
        <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full overflow-hidden">
          <img :src="selectedProduct.thumbnail" :alt="selectedProduct.title" class="w-full h-56 object-cover" />
          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedProduct.title }}</h2>
            <p class="text-gray-500 dark:text-gray-400 capitalize mt-1">{{ selectedProduct.category }}</p>
            <p class="text-gray-700 dark:text-gray-300 mt-3 text-sm leading-relaxed">{{ selectedProduct.description }}</p>
            <div class="flex items-center justify-between mt-4">
              <span class="text-3xl font-bold text-blue-600 dark:text-blue-400">${{ selectedProduct.price }}</span>
              <span class="text-yellow-500 text-sm">★ {{ selectedProduct.rating }} · {{ selectedProduct.stock }} in stock</span>
            </div>
            <button @click="addToCart(selectedProduct)" class="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium">
              Add to Cart
            </button>
            <button @click="selectedProduct = null" class="mt-2 w-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 py-2 rounded-lg text-sm">
              Close
            </button>
          </div>
        </div>
      </div>

      <!-- Cart modal -->
      <div v-if="cartOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="cartOpen = false">
        <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Cart</h2>
          <div v-if="cart.length === 0" class="text-center text-gray-400 py-8">Your cart is empty</div>
          <div v-else class="flex flex-col gap-3 max-h-80 overflow-y-auto">
            <div
              v-for="item in cart"
              :key="item.id"
              class="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg p-3"
            >
              <img :src="item.thumbnail" :alt="item.title" class="w-12 h-12 object-cover rounded" />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ item.title }}</p>
                <p class="text-sm text-blue-600 dark:text-blue-400">${{ item.price }}</p>
              </div>
              <button @click="removeFromCart(item.id)" class="text-red-400 hover:text-red-600 text-xl font-bold">×</button>
            </div>
          </div>
          <button @click="cartOpen = false" class="mt-4 w-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 py-2 rounded-lg text-sm">
            Close
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
  rating: number
  stock: number
}

const products = ref<Product[]>([])
const categories = ref<string[]>([])
const loading = ref(false)
const error = ref('')
const search = ref('')
const selectedCategory = ref('')
const selectedProduct = ref<Product | null>(null)
const cart = ref<Product[]>([])
const cartOpen = ref(false)
const isDark = ref(false)

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.value.toLowerCase())
    const matchCat = selectedCategory.value === '' || p.category === selectedCategory.value
    return matchSearch && matchCat
  })
})

async function fetchProducts() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('https://dummyjson.com/products?limit=50')
    const data = await res.json()
    products.value = data.products
  } catch (e) {
    error.value = 'Failed to load products. Check your internet.'
  } finally {
    loading.value = false
  }
}

async function fetchCategories() {
  const res = await fetch('https://dummyjson.com/products/categories')
  const data = await res.json()
  const allowedCategories = [
  'smartphones',
  'laptops',
  'beauty',
  'fragrances',
  'furniture',
  'groceries'
]
categories.value = data
  .map((c: { slug: string }) => c.slug)
  .filter((slug: string) => allowedCategories.includes(slug))
}

function addToCart(product: Product) {
  if (!cart.value.find(p => p.id === product.id)) {
    cart.value.push(product)
  }
}

function removeFromCart(id: number) {
  cart.value = cart.value.filter(p => p.id !== id)
}

onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})
</script>