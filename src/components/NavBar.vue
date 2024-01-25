<template>
  <div class="flex justify-between items-center p-8">
    <h1 class="text-xl text-gray-600 font-bold">Anotações</h1>
    <router-link to="/">
    <button>
      <CloseIcon />
    </button>
    </router-link>
  </div>
</template>

<script setup>
import CloseIcon from "vue-material-design-icons/Close.vue";
</script>
