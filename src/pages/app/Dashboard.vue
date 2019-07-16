<template>
  <q-page class="flex flex-center column" id="page-chekin">
    <q-field :count="11" helper="Apenas número" class="q-my-md">
      <q-input :maxlength="11" placeholder="Digite o CPF" v-model="cpf" autofocus />
    </q-field>
    <q-btn label="Enviar" color="positive" @click="addUID"></q-btn>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { executeConfirmAsync, executeAsync } from "../viewHelper";

export default {
  name: "qrcodepage",
  data() {
    return {
      cpf: ""
    };
  },
  computed: {
    ...mapGetters({
      listamap: 'painel/listamap',
      ncadastro: "painel/ncadastro",
      loading: "loading",
      error: "error",
      user: "currentUser"
    })
  },
  async mounted() {
    this.$q.loading.show()
    await this.$store.dispatch("painel/loadUid")
    await this.$store.dispatch("painel/painelJornada")
    this.$q.loading.hide()
    console.log(this.listamap)
  },
  methods: {
    async addUID() {
//122
      for (let i = 0; i < listaUid.length; i++) {
        const element = listaUid[i];

        var data = {
          uid: element
        };

        this.$store.dispatch("painel/salvaUid", { data });
      }
    }
  }
};
</script>
