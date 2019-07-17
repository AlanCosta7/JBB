<template>
  <q-page class="flex flex-center column" id="page-chekin">
    <q-btn label="Atualizar" color="positive" @click="atualizar"></q-btn>
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
        titulo1_5: 'painel/titulo1_5',
      listamap: 'painel/listamap',
      ncadastro: "painel/ncadastro",
      loading: "loading",
      error: "error",
      user: "currentUser"
    })
  },
  async mounted() {
  },
  methods: {
    async atualizar () {
    this.$q.loading.show()
    await this.$store.dispatch("painel/loadUid")
    await this.$store.dispatch("painel/painelJornada")
    this.$q.loading.hide()
    console.log(this.listamap)
    },
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
