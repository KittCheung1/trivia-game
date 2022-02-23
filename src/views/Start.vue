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
  <main class="container">

    <StartForm @onAuthSuccess="handleAuthSuccess" />
 
  </main>
</template>

<style>
.container{
  display: flex;
  justify-content: center;
  margin:auto;
}
</style>