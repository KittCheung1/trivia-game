<template>

<!-- <h1>{{question.question}}</h1> -->
<!-- <button @click="nextQuestion">Next question</button> -->
</template>

<script setup>
const emit = defineEmits(['answered'])

const props = defineProps({
    question:{type: Object, required:true}
})

const nextQuestion = ()=>{
    console.log('hello from nextQeustion')
    emit('answered')
}

</script>

<style>


</style>