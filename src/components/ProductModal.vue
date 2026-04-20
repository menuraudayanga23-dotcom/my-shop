<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full overflow-hidden">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-56 object-cover" />
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ product.title }}</h2>
        <p class="text-gray-500 dark:text-gray-400 capitalize mt-1">{{ product.category }}</p>
        <p class="text-gray-700 dark:text-gray-300 mt-3 text-sm leading-relaxed">{{ product.description }}</p>
        <div class="flex items-center justify-between mt-4">
          <span class="text-3xl font-bold text-blue-600 dark:text-blue-400">${{ product.price }}</span>
          <span class="text-yellow-500 text-sm">★ {{ product.rating }} · {{ product.stock }} in stock</span>
        </div>
        <button @click="$emit('addToCart', product)" class="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium">
          Add to Cart
        </button>
        <button @click="$emit('close')" class="mt-2 w-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 py-2 rounded-lg text-sm">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types'
defineProps<{ product: Product }>()
defineEmits(['close', 'addToCart'])
</script>