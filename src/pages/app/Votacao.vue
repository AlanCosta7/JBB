<template>
    <q-page id="page-votacao">
    <div class="q-pa-md row flex flex-center bg-tertiary">
        <div v-if="startvoto"> <h3>Seu voto já foi registrado</h3></div>
        <div v-if="eleicao[0].data.jbb !== true"> <h3>A eleição será na Sexta-feira</h3></div>

      <q-carousel v-model="slide" color="amber" arrows height="470px" v-if="!startvoto && eleicao[0].data.jbb == true">
        <q-carousel-slide class="bg-white">
          <div class="text-center">
            <div class="flex flex-center">
              <div class="column">
                <h3 class="lulobold">Centro Oeste</h3>
                <p class="lulo text-white sizehorario"></p>
                <q-list v-for="item in centrooeste" :key="item.id">
                  <q-item tag="label">
                    <q-item-side>
                    <q-radio color="amber" v-model="checkCentro" :val="item.data.nome" />
                    </q-item-side>
                    <q-item-main>
                        <q-item-tile class="tile left text-black  lulo" label>{{item.data.nome}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </q-carousel-slide>
        
        <q-carousel-slide class="bg-white">
          <div class="text-center">
            <div class="flex flex-center">
              <div class="column">
                <h3 class="lulobold">Norte</h3>
                <p class="lulo text-white sizehorario"></p>
                <q-list v-for="item in norte" :key="item.id">
                  <q-item tag="label">
                    <q-item-side>
                    <q-radio color="amber" v-model="checkNorte" :val="item.data.nome" />
                    </q-item-side>
                    <q-item-main>
                        <q-item-tile class="tile left text-black  lulo" label>{{item.data.nome}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide class="bg-white">
          <div class="text-center">
            <div class="flex flex-center">
              <div class="column">
                <h3 class="lulobold">Nordeste</h3>
                <p class="lulo text-white sizehorario"></p>
                <q-list v-for="item in nordeste" :key="item.id">
                  <q-item tag="label">
                    <q-item-side>
                    <q-radio color="amber" v-model="checkNordeste" :val="item.data.nome" />
                    </q-item-side>
                    <q-item-main>
                        <q-item-tile class="tile left text-black  lulo" label>{{item.data.nome}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </q-carousel-slide>

              
        <q-carousel-slide class="bg-white">
          <div class="text-center">
            <div class="flex flex-center">
              <div class="column">
                <h3 class="lulobold">Sudeste</h3>
                <p class="lulo text-white sizehorario"></p>
                <q-list v-for="item in suldeste" :key="item.id">
                  <q-item tag="label">
                    <q-item-side>
                    <q-radio color="amber" v-model="checkSuldeste" :val="item.data.nome" />
                    </q-item-side>
                    <q-item-main>
                        <q-item-tile class="tile left text-black  lulo" label>{{item.data.nome}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide class="bg-white">
          <div class="text-center">
            <div class="flex flex-center">
              <div class="column">
                <h3 class="lulobold">Sul</h3>
                <p class="lulo text-white sizehorario"></p>
                <q-list v-for="item in sul" :key="item.id">
                  <q-item tag="label">
                    <q-item-side>
                    <q-radio color="amber" v-model="checkSul" :val="item.data.nome" />
                    </q-item-side>
                    <q-item-main>
                        <q-item-tile class="tile left text-black  lulo" label>{{item.data.nome}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <div class="flex flex-center q-ma-md">
        <q-btn :disable="liberado" color="positive" @click="votar()" label="Votar" v-if="!startvoto && eleicao[0].data.jbb == true"></q-btn>
      </div>
    </div>
    </q-page>
</template>
      
<script>
import { mapGetters } from 'vuex'
import { executeConfirmAsync, executeAsync } from '../viewHelper.js'

import Vuex from 'vuex'

export default {
        name: 'VotarPage',
        data () {
            return {
              slide: 0,
              checkCentro: null,
              checkNorte: null,
              checkNordeste: null,
              checkSuldeste: null,
              checkSul: null,
            }
        },
        computed: {
            ...mapGetters({
                eleicao: 'eleicao',
                centrooeste: 'eleicao/centrooeste',
                norte: 'eleicao/norte',
                nordeste: 'eleicao/nordeste',
                sul: 'eleicao/centrooeste',
                suldeste: 'eleicao/suldeste',
                startvoto: 'eleicao/startvoto',
                loading: 'loading',
                error: 'error',
                user: 'currentUser',
            }),
            liberado() {
              var checkCentro = this.checkCentro
              var checkNorte = this.checkNorte
              var checkNordeste = this.checkNordeste
              var checkSuldeste = this.checkSuldeste
              var checkSul = this.checkSul

              if (checkCentro !== null && checkNorte !== null && checkNordeste !== null && checkSuldeste !== null && checkSul !== null) {
                return false  
              }
                return true
            }        
        },
        async created() {
          this.$q.loading.show()
          await this.$store.dispatch('loadEleicao')
          
            console.log(this.eleicao)
          this.$q.loading.hide()
        },
        async mounted() {
            this.$q.loading.show()
            await this.$store.dispatch('eleicao/loadVoto')
            await this.$store.dispatch('eleicao/watchCentrooeste')
            await this.$store.dispatch('eleicao/watchNorte')
            await this.$store.dispatch('eleicao/watchNordeste')
            await this.$store.dispatch('eleicao/watchSul')
            await this.$store.dispatch('eleicao/watchSuldeste')
            this.$q.loading.hide()
        },
        methods: {
          async votar() {

               var data = {
                   Centro: this.checkCentro,
                   Norte: this.checkNorte,
                   Nordeste: this.checkNordeste,
                   Suldeste: this.checkSuldeste,
                   Sul: this.checkSul,
                   Usuario: this.user.uid
               }
               
                await executeAsync({
                    instance: this,
                    promiseFn: () => this.$store.dispatch('eleicao/salvaVoto', {data}),
                    messageSuccess: 'Voto cadastrado com sucesso',
                    messageError: 'Erro ao cadastrar voto'
                }).then(
                    this.$router.push("/app/inicio")
                ) 
            }
        },
    }
</script>
      