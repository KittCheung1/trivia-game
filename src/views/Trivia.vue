<script setup>
import Question from "../components/Question.vue"

</script>




<template>
  <main class="container">
    <Question />
  </main>
</template>




<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: auto;
}

select {
  border-style: solid;
  border-color: black;
  border-width: 1px;
}
</style>