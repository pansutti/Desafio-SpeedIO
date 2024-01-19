<template>
  <div class="min-h-screen bg-slate-300 flex flex-col">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>
