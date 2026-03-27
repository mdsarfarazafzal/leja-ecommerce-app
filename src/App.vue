<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue';
import { Toaster } from '@steveyuowo/vue-hot-toast';
import "@steveyuowo/vue-hot-toast/vue-hot-toast.css";
</script>

<template>

  <Navbar />
  <RouterView />
  <Toaster />
</template>

<style lang="scss">
@use '@/assets/scss/main.scss'
</style>
