<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import Alert from '@/components/base/Alert.vue';
</script>

<template>
  <Header/>
  <RouterView />
  <Alert/>
</template>

<style>
body{
  background: white;
}
</style>