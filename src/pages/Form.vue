<template>
  <form class="mx-[30px]">
    <div>
      <textarea class="w-full resize-y block h-44 p-2 rounded-2xl" placeholder="Exp.: Ao ligar falar com Luiza" v-model="anotacoes" required></textarea>
    </div>
    <div class="flex flex-col">
      <label class="py-4" for="potencialNegocio">Potencial de negócio</label>
      <input class="resize-y block h-14 rounded-full" type="number" placeholder="R$: 00,00" v-model="potencialNegocio" required />
    </div>
    <div class="flex flex-col">
      <label class="py-4" for="categorizacao">Categorização</label>
      <select class="resize-y block h-14 rounded-full" v-model="categorizacao" required>
        <option value="poucoImportante">Pouco Importante</option>
        <option value="medioImportante">Médio Importante</option>
        <option value="muitoImportante">Muito Importante</option>
      </select>
    </div>
    <div class="flex flex-col">
      <label class="py-4" for="lembrete">Lembrete</label>
      <input class="resize-y block h-14 rounded-full" placeholder="Selecione uma Data" type="date" v-model="lembrete" required />
    </div>
    <div class="flex items-center justify-between bottom-0 pt-24 pb-8">
  <router-link to="/">
    <button class="w-14 bg-red-500 h-14 rounded-full flex justify-center items-center" type="delete">
      <TrashCan />
    </button>
  </router-link>
  <router-link to="/anotation">
    <button class="w-72 bg-blue-500 h-14 rounded-full flex items-center justify-center px-4">
      <span class="text-white">Salvar</span>
    </button>
  </router-link>
</div>
  </form>
</template>

<script setup>
import TrashCan from "vue-material-design-icons/trashcan.vue";
</script>