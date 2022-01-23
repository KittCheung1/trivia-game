<script setup>

</script>

<template>
  <div id="nav">
    <router-link :to="{name:'Start'}">Start</router-link>
    <router-link :to="{name:'Trivia'}">Trivia</router-link>
    <router-link :to="{name: 'Record'}">Record</router-link>
  </div>
  <router-view></router-view>
</template>

<style>

#app{
  text-align: center;
}
#nav{
  padding: 30px;
}

#nav a{
  font-weight: bold;
  color: rgb(37, 39, 43);
  padding: 10px;
  border-radius: 4px;
}

#nav a.router-link-exact-active{
  color: white;
  background: rgb(29, 29, 196);
}
</style>
