<template>
  <q-page class="page-cadastro">
    <q-layout class="flex column bg-tertiary">
      <div class="bg-tertiary cardtop">
        <div class="row flex flex-left gt-m">
          <img
            width="150px"
            src="~assets/landpage/Logo_Despertar2019.png"
            alt="imagem"
            aria-hidden="true"
          />
        </div>
      </div>
      <div class="flex flex-center">
        <div class="flex flex-center row shadow-6 cardlogin" v-show="currentUser">
          <div class="col-xs-12 col-xl-6 q-mx-xl">
              <p class="lulo text-center">Vamos lá! Falta pouco para finalizar.</p>
            <q-field :count="11" helper="Apenas número" class="q-my-md">
              <q-input :maxlength="11" placeholder="Digite seu CPF" v-model="cpf" autofocus />
            </q-field>
            <q-field :count="8" helper="Apenas número" class="q-my-md">
              <q-input :maxlength="8" placeholder="Digite seu CEP" v-model="cep" autofocus />
            </q-field>

            <q-btn
              icon="search"
              label="Pesquisar"
              color="primary"
              :disable="!isCepValid"
              @click="getApiInformations"
            />
          </div>
          <div class="col-xs-12 col-xl-4">
            <q-card inline style="width: 250px" class="bg-white q-pa-md q-my-md">
              <q-card-main>
                <q-card-title>
                  <b>CPF:</b>
                  {{cpf}}
                </q-card-title>
                <q-card-title>
                  <b>Cidade:</b>
                  {{result.localidade}}
                </q-card-title>
                <q-card-title>
                  <b>UF:</b>
                  {{result.uf}}
                </q-card-title>
                <q-card-title>
                  <b>Bairro:</b>
                  {{result.bairro}}
                </q-card-title>
                <q-card-title>
                  <b>Logradouro:</b>
                  {{result.logradouro}}
                </q-card-title>
                <q-card-title>
                  <b>CEP:</b>
                  {{result.cep}}
                </q-card-title>
              </q-card-main>
              <q-card-actions>
                <q-btn label="Enviar" color="positive" :disable="!result.cep || !isCpfValid" @click="enviarCadastro"></q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </q-layout>
  </q-page>
</template>

<style>
</style>

<script>
import { QField, QInput, QBtn } from "quasar"
import { size } from "lodash"
import { cepApi } from "../../support/http"
import Vuex from "vuex"
import { executeConfirmAsync, executeAsync } from '../viewHelper'

export default {
  name: "PageIndex",
  components: { QField, QInput, QBtn },
  data: () => ({
    cpf: "",
    cep: "",
    result: {}
  }),
  computed: {
    ...Vuex.mapGetters(["currentUser", "currentCadastrado"]),
    redirectToApp(redirectDelay) {
      this.$q.loading.show({ delay: 300 });
      setTimeout(() => {
        this.$q.loading.hide();
        this.$router.replace({ name: "inicio" });
      }, redirectDelay);
    },
    isCepValid() {
      return size(this.cep) === 8;
    },
    isCpfValid() {
      return size(this.cpf) === 11;
    }
  },
  async mounted() {
    
    this.$q.loading.show()
    await this.$store.dispatch('loadCadastro')
    this.$q.loading.hide()

     if (this.currentCadastrado) {
      const rediretDelay = 2000;
      this.redirectToApp(rediretDelay);
      return;
    } 
  },
  methods: {
    async enviarCadastro() {
        var cpf = this.cpf
        var result = this.result

        var data = {
            cpf: cpf,
            cidade: result.localidade,
            uf: result.uf,
            bairro: result.bairro,
            logradouro: result.logradouro,
            cep: result.cep
        }

        await executeAsync({
          instance: this,
          promiseFn: () => this.$store.dispatch('salvaCadastro', {data}),
          messageSuccess: 'Cadastro realizado com sucesso',
          messageError: 'Erro ao realizar cadastro'
        })
    },
    getApiInformations() {
      const cep = this.cep;
      this.$q.loading.show();
      if (!this.isCepValid) {
        return;
      }
      cepApi.get(`/${cep}/json`).then(result => {
        this.$q.loading.hide();
        this.result = result.data || {};
      });
    }
  }
};
</script>

<style>
.cardtop {
  width: 100%;
  height: 200px;
  padding: 2em 1rem;
  text-align: center;
}

.cardlogin {
  position: relative;
  border-radius: 5px;
  background-color: white;
  padding: 2rem 2rem;
}

.q-card-container {
  padding: 0;
  margin: 0;
}

.q-card-title {
  font-size: 1em;
  text-align: left;
  padding: 0;
  margin: 0;
}

.styleCard {
  min-width: 100%;
  max-width: 220px;
}
</style>