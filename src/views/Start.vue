<script setup>
import { useRouter } from "vue-router";
import StartForm from '../components/StartForm.vue';



const router = useRouter()
const handleAuthSuccess = () => {
  router.push("trivia")
  console.log("user is available")
}
</script>


<template>
  <main class="container mx-auto px-4">
    <h1 class="mb-3 text-2xl">Login to get started</h1>

    <StartForm @onAuthSuccess="handleAuthSuccess" />
 
  </main>
</template>

<style>
</style>