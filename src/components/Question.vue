<script setup>
import { useStore } from 'vuex';

const store = useStore()
const questions = store.getters.questions;
let result = questions.map(a => a.question);
console.log(result);


// let test = await store.dispatch("loadQuestions");
// console.log(test);
// let result = test.map(a => a.question);
// console.log(result);

</script>

<template>
<div> 
    
<p>{{questions}}</p>
<p>hejeje</p>

</div>

</template>

<style>

</style>