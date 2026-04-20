<template>
  <div class="flex flex-col sm:flex-row gap-3 mb-6">
    <input
      :value="search"
      @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
      placeholder="Search products..."
      class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 dark:text-white"
    />
    <select
      :value="selectedCategory"
      @change="$emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
      class="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 dark:text-white"
    >
      <option value="">All categories</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{ search: string; selectedCategory: string; categories: string[] }>()
defineEmits(['update:search', 'update:selectedCategory'])
</script>