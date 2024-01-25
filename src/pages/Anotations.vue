<template>
  <section class="flex flex-col items-center">
    <div v-if="anotacoesRecuperadas.length">
      <ul class="list-none min-w-80">
        <li
          v-for="anotacao in anotacoesRecuperadas.slice().reverse()"
          :key="anotacao.id"
          class="mb-4"
        >
          <div
            class="bg-white rounded-2xl p-4 flex items-center justify-between"
          >
            <div class="mr-4">
              <PaperClip />
            </div>
            <div class="flex-1">
              <router-link :to="{ name: 'editAnotationForm', params: { id: anotacao.id } }">
              <button
                class="text-blue-500"
                @click="anotacao.id"
              >
                <p class="text-lg font-semibold mb-2 truncate max-w-48">
                  {{ anotacao.anotacoes }}
                </p>
              </button>
            </router-link>
              <p class="text-sm text-gray-500">
                {{ anotacao.lembrete }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <button
                class="text-red-500"
                @click="prepararExclusao(anotacao.id)"
              >
                <TrashCan />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="text-lg font-semibold">Nenhuma anotação encontrada.</p>
    </div>
    <dialog :open="mostrarPopup" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md">
  <p class="text-lg font-semibold mb-4">Tem certeza que deseja excluir esta anotação?</p>
  <div class="flex justify-end space-x-4">
    <button @click="cancelarExclusao" class="text-blue-500">Cancelar</button>
    <button @click="executarExclusao" class="text-red-500">Excluir</button>
  </div>
</dialog>

    <div class="fixed bottom-0 items-center p-8 ">
      <router-link to="/form">
        <button
          class="w-80 bg-blue-500 h-14 rounded-full flex items-center justify-center"
        >
          <span class="text-white">+ Criar anotação</span>
        </button>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import TrashCan from "vue-material-design-icons/trashcan.vue";
import PaperClip from "vue-material-design-icons/paperclip.vue";
import { ref, onMounted } from "vue";
import { obterAnotacoes, deletarAnotacao } from "../services/IndexDB";

const anotacoesRecuperadas = ref([]);

const mostrarPopup = ref(false);
let anotacaoParaExcluir = null;

const carregarAnotacoes = () => {
  obterAnotacoes()
    .then((anotacoesArmazenadas) => {
      console.log("Anotações salvas:", anotacoesArmazenadas);
      anotacoesRecuperadas.value = anotacoesArmazenadas;
    })
    .catch((error) => {
      console.error("Erro ao carregar anotações:", error);
    });
};

const prepararExclusao = (id) => {
  anotacaoParaExcluir = id;
  mostrarPopup.value = true;
};

const cancelarExclusao = () => {
  mostrarPopup.value = false;
  anotacaoParaExcluir = null;
};

const executarExclusao = () => {
  if (anotacaoParaExcluir !== null) {
    excluirAnotacao(anotacaoParaExcluir);
    mostrarPopup.value = false;
    anotacaoParaExcluir = null;
  }
};

const excluirAnotacao = (id) => {
  deletarAnotacao(id)
    .then(() => {
      carregarAnotacoes();
      console.log("Anotação deletada com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao deletar anotação:", error);
    });
};

onMounted(() => {
  carregarAnotacoes();
});
</script>
