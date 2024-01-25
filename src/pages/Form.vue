<template>
  <form class="flex flex-col items-center">
    <div>
      <textarea
        class="px-4 min-w-80 resize-y block h-44 p-2 rounded-2xl resize-field"
        placeholder="Exp.: Ao ligar falar com Luiza"
        v-model="anotacoes"
      ></textarea>
    </div>
    <div class="flex flex-col min-w-80">
  <label class="my-4" for="potencialNegocio">Potencial de negócio</label>
  <div style="position: relative;">
    <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(70%); color: #000000;">R$</span>
  </div>
    <input
      class="pl-10 resize-y block h-14 rounded-full"
      type="number"
      placeholder="00.00"
      v-model="potencialNegocio"
    />
  
      <label class="my-4" for="categorizacao">Categorização</label>
      <div class="custom-select">
        <select
          class="pl-4 w-full resize-y block h-14 rounded-full"
          v-model="categorizacao"
        >
          <option value="poucoImportante">Pouco Importante</option>
          <option value="medioImportante">Médio Importante</option>
          <option value="muitoImportante">Muito Importante</option>
        </select>
        <ChevronDown class="custom-arrow" />
      </div>
      <label class="my-4" for="lembrete">Lembrete</label>
      <input
        class="pl-4 resize-y block h-14 rounded-full resize-field"
        placeholder="dd/mm/aaaa"
        type="text"
        v-model="lembrete"
        @input="formatarData"
      />
    </div>
    <div
      v-if="missingFields.length"
      class="text-red-500 fixed gap-4 items-center text-center bottom-32"
    >
      Falta preencher: {{ missingFields.join(", ") }}
    </div>
    <div class="flex fixed gap-4 items-center bottom-0 pt-28 pb-8">
      <router-link to="/">
        <button
          class="w-14 bg-red-500 h-14 rounded-full flex justify-center items-center"
          type="delete"
        >
          <TrashCan class="text-white" />
        </button>
      </router-link>
      <router-link to="/anotation">
        <button
          class="w-64 bg-blue-500 h-14 rounded-full flex items-center justify-center px-4"
          @click="salvarAnotacao"
          :disabled="isFormInvalid"
        >
          <span class="text-white">Salvar</span>
        </button>
      </router-link>
    </div>
  </form>
</template>

<script setup>
import TrashCan from "vue-material-design-icons/TrashCan.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import { ref, computed } from "vue";
import { adicionarAnotacao } from "../services/IndexDB";

const anotacoes = ref("");
const potencialNegocio = ref();
const categorizacao = ref("");
const lembrete = ref("");
const isFormInvalid = computed(() => {
  return (
    !anotacoes.value ||
    !lembrete.value ||
    !potencialNegocio.value ||
    !categorizacao.value
  );
});

const missingFields = computed(() => {
  const missing = [];
  if (!anotacoes.value) {
    missing.push("Anotações");
  }
  if (!potencialNegocio.value) {
    missing.push("Potencial de negócio");
  }
  if (!categorizacao.value) {
    missing.push("Categorização");
  }
  if (!lembrete.value) {
    missing.push("Lembrete");
  }
  return missing;
});

const formatarData = () => {
  let valor = lembrete.value;
  valor = valor.replace(/\D/g, "");
  
  if (valor.length > 2) {
    valor = valor.substring(0, 2) + "/" + valor.substring(2);
  }
  if (valor.length > 5) {
    valor = valor.substring(0, 5) + "/" + valor.substring(5, 9);
  }
  lembrete.value = valor;
};

const salvarAnotacao = () => {
  if (isFormInvalid.value) {
    return;
  }
  adicionarAnotacao({
    anotacoes: anotacoes.value,
    potencialNegocio: potencialNegocio.value,
    categorizacao: categorizacao.value,
    lembrete: lembrete.value,
  })
    .then(() => {
      anotacoes.value = "";
      potencialNegocio.value = 0;
      categorizacao.value = "";
      lembrete.value = "";
    })
    .catch((error) => {
      console.error("Erro ao salvar anotação:", error);
    });
};
</script>
