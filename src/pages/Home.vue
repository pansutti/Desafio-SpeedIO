<template>
  <section class="flex flex-col items-center justify-center flex-1">
    <PaperclipIcon class="w-6 h-6 mb-2" />
    <h1 class="text-3xl text-blue-500 font-bold">Anotações</h1>

    <router-link to="/form">
      <button
        type="button"
        class="bg-blue-500 rounded-full h-14 text-white px-6 mt-8"
      >
        + Criar anotação
      </button>
    </router-link>
    <router-link to="/anotation">
      <button
        type="button"
        class="bg-blue-500 rounded-full h-14 text-white px-8 mt-8"
      >
        Ver Anotações
      </button>
    </router-link>
  </section>
</template>

<script setup>
import PaperclipIcon from "vue-material-design-icons/PaperClip.vue";
</script>
