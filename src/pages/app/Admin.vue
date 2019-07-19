<template>
  <q-page class="flex flex-center column" id="page-chekin">
    <q-field :count="11" helper="Apenas número" class="q-my-md">
      <q-input :maxlength="11" placeholder="Digite o CPF" v-model="cpf" autofocus />
    </q-field>
    <q-btn label="Enviar" color="positive" @click="lerCpf"></q-btn>
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
      loading: "loading",
      error: "error",
      user: "currentUser"
    })
  },
  methods: {
    async enviarCpf() {
      var cpf = this.cpf;

      var data = {
        cpf: cpf
      };

      this.$store.dispatch("salvaCpf", { data });
      this.cpf = "";
    },

    async lerCpf() {
      this.$store.dispatch("lerCpf")
    },

    async enviarCpf2() {
      var cpf = [ ];

      for (let i = 0; i < cpf.length; i++) {
        const element = cpf[i];

        var data = {
          cpf: element
        };

        this.$store.dispatch("salvaCpf", { data });
      }
    }
  }
};
</script>
