<template>
  <form class="flex flex-col items-center">
    <div>
      <textarea
        class="pl-4 min-w-80 resize-y block h-44 p-2 rounded-2xl resize-field"
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
    <dialog :open="mostrarPopup" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md">
  <p class="text-lg font-semibold mb-4">Tem certeza que deseja excluir esta anotação?</p>
  <div class="flex justify-end space-x-4">
    <button @click="cancelarExclusao" class="text-blue-500">Cancelar</button>
    <router-link to="/anotation">
    <button @click="executarExclusao" class="text-red-500">Excluir</button>
  </router-link>
  </div>
</dialog>
    <div v-if="missingFields.length" class="text-red-500 items-center text-center pt-8">
      Falta preencher: {{ missingFields.join(', ') }}
    </div>
    <div class="flex gap-4 items-center pt-28">
        <button
          class="w-14 bg-red-500 h-14 rounded-full flex justify-center items-center"
          @click="prepararExclusao()"
        >
          <TrashCan class="text-white" />
        </button>
      <router-link to="/anotation">
      <button
        class="w-72 bg-blue-500 h-14 rounded-full flex items-center justify-center px-4"
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
import { ref, onMounted, computed } from "vue";
import { adicionarAnotacao, obterAnotacoes, deletarAnotacao } from "../services/IndexDB";
import { useRouter } from "vue-router";

const $router = useRouter();

const anotacoes = ref("");
const potencialNegocio = ref();
const categorizacao = ref("");
const lembrete = ref("");
const mostrarPopup = ref(false);


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
    missing.push('Anotações');
  }
  if (!potencialNegocio.value) {
    missing.push('Potencial de negócio');
  }
  if (!categorizacao.value) {
    missing.push('Categorização');
  }
  if (!lembrete.value) {
    missing.push('Lembrete');
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

const carregarAnotacaoParaEdicao = async () => {
  const anotacaoId = $router.currentRoute.value.params.id;

  try {
    console.log('ID da anotação a ser editada:', anotacaoId);

    const anotacaoRecuperada = await obterAnotacaoPorId(anotacaoId);
    console.log('Anotação recuperada para edição:', anotacaoRecuperada);

    anotacoes.value = anotacaoRecuperada.anotacoes;
    potencialNegocio.value = anotacaoRecuperada.potencialNegocio;
    categorizacao.value = anotacaoRecuperada.categorizacao;
    lembrete.value = anotacaoRecuperada.lembrete;
  } catch (error) {
    console.error("Erro ao carregar anotação para edição:", error);
  }
};

const obterAnotacaoPorId = async (id) => {
  try {
    console.log('ID da anotação a ser encontrada:', id);

    const anotacoesArmazenadas = await obterAnotacoes();
    console.log('IDs das anotações armazenadas:', anotacoesArmazenadas.map(a => a.id));

    const anotacaoEncontrada = anotacoesArmazenadas.find(anotacao => parseInt(anotacao.id) === parseInt(id));

    if (anotacaoEncontrada) {
      return anotacaoEncontrada;
    } else {
      console.error('Anotação não encontrada com o ID:', id);
      throw new Error("Anotação não encontrada");
    }
  } catch (error) {
    console.error('Erro ao obter anotação por ID:', error);
    throw error;
  }
};

const salvarAnotacao = async () => {
  try {
    const anotacaoEditada = {
      id: parseInt($router.currentRoute.value.params.id),
      anotacoes: anotacoes.value,
      potencialNegocio: potencialNegocio.value,
      categorizacao: categorizacao.value,
      lembrete: lembrete.value,
    };
    await adicionarAnotacao(anotacaoEditada);
  } catch (error) {
    console.error("Erro ao salvar anotação editada:", error);
  }
};

const prepararExclusao = () => {
  mostrarPopup.value = true;
};

const cancelarExclusao = () => {
  mostrarPopup.value = false;
};

const executarExclusao = () => {
    excluirAnotacao();
    mostrarPopup.value = false;
};

const excluirAnotacao = () => {
    deletarAnotacao(parseInt($router.currentRoute.value.params.id))
      .then(() => {
        console.log("Anotação deletada com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao deletar anotação:", error);
      });
  }


onMounted(() => {
  carregarAnotacaoParaEdicao();
});
</script>