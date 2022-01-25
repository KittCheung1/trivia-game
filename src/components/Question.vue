<script setup>
import store from '../store';


let test = await store.dispatch("loadQuestions");
console.log(test);
let result = test.map(a => a.question);
console.log(result);

</script>

<template>
<p>{{load}}</p>
</template>

<style>

</style>