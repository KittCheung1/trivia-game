<script setup>
import store from '../store';


let test = await store.dispatch("loadQuestions");
console.log(test);
let result = test.map(a => a.question);
console.log(result);

</script>

<template>
<div> 
    
<p>{{result[0]}}</p>
<p>hejeje</p>

</div>

</template>

<style>

</style>