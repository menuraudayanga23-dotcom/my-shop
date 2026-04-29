<template>
  <nav class="bg-white dark:bg-gray-900 shadow sticky top-0 z-10">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <span class="text-xl font-bold text-blue-600 dark:text-blue-400">BuyZone</span>
      <div class="flex items-center gap-3">
        <button @click="$emit('openCart')" class="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm border border-blue-200 dark:border-blue-700">
          🛒 Cart ({{ cartCount }})
        </button>
        <button @click="$emit('toggleDark')" class="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
          {{ isDark ? '☀️ Light' : '🌙 Dark' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{ isDark: boolean; cartCount: number }>()
defineEmits(['toggleDark', 'openCart'])
</script>