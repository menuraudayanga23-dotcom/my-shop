<template>
  <div @click="$emit('select', product)" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 transition cursor-pointer overflow-hidden hover:-translate-y-1">
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
</template>

<script setup lang="ts">
import type { Product } from '../types'
defineProps<{ product: Product }>()
defineEmits(['select'])
</script>