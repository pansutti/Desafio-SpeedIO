<template>
  <section class="px-[30px]">
    <!-- Exibir as anotações recuperadas -->
    <div v-if="anotacoesRecuperadas.length">
      <ul class="list-none p-0">
        <li
          v-for="anotacao in anotacoesRecuperadas.slice().reverse()"
          :key="anotacao.id"
          class="mb-4"
        >
          <div
            class="bg-white rounded-md p-4 flex items-center justify-between"
          >
            <div class="mr-4">
              <PaperClip />
            </div>
            <div class="flex-1">
              <button
                class="text-blue-500"
                @click="editarAnotacao(anotacao.id)"
              >
                <p class="text-lg font-semibold mb-2">
                  {{ anotacao.anotacoes }}
                </p>
              </button>
              <p class="text-sm text-gray-500">
                {{ formatarData(anotacao.lembrete) }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <button
                class="text-red-500"
                @click="excluirAnotacao(anotacao.id)"
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

    <div class="fixed bottom-0 left-0 right-0 p-8 text-white">
      <router-link to="/form">
        <button
          class="w-full bg-blue-500 h-14 rounded-full flex items-center justify-center"
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

const carregarAnotacoes = () => {
  obterAnotacoes()
    .then((anotacoesArmazenadas) => {
      console.log("Anotações salvas:", anotacoesArmazenadas);
      // Atualiza a referência para as anotações recuperadas
      anotacoesRecuperadas.value = anotacoesArmazenadas;
    })
    .catch((error) => {
      console.error("Erro ao carregar anotações:", error);
    });
};

const excluirAnotacao = (id) => {
  deletarAnotacao(id)
    .then(() => {
      // Recarrega as anotações após a exclusão
      carregarAnotacoes();
      console.log("Anotação deletada com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao deletar anotação:", error);
    });
};

const editarAnotacao = (id) => {
  // Implemente a lógica de edição conforme necessário
  console.log(`Editar anotação com ID ${id}`);
};

const formatarData = (data) => {
  const dataFormatada = new Date(data).toLocaleDateString("pt-BR");
  return dataFormatada;
};

onMounted(() => {
  // Carregar anotações ao montar o componente
  carregarAnotacoes();
});
</script>
