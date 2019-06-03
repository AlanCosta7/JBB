<template>
    <q-page>
      <q-layout>
        <q-btn
            v-if="telacheia"
            color="secondary"
            @click="toggleFullscreen()"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            :label="$q.fullscreen.isActive ? 'Sair da Tela Cheia' : 'Tela Cheia'"
        />

        <q-modal v-model="votar" >
            <q-select
                filter
                multiple
                float-label="Sudeste"
                image
                inverted
                color="blue-10"
                v-model="sudeste"
                :options="listaUsuarios"
            />

            <q-select
                filter
                multiple
                float-label="Sul"
                image
                inverted
                color="blue-10"
                v-model="sul"
                :options="listaUsuarios"
            />
            
            <q-select
                filter
                multiple
                float-label="Norte"
                image
                inverted
                color="blue-10"
                v-model="norte"
                :options="listaUsuarios"
            />

            <q-select
                filter
                multiple
                float-label="Nordeste"
                image
                inverted
                color="blue-10"
                v-model="nordeste"
                :options="listaUsuarios"
            />
            
            <q-select
                filter
                multiple
                float-label="Centro-Oste"
                image
                inverted
                color="blue-10"
                v-model="centrooeste"
                :options="listaUsuarios"
            />
            <div class="btn">
                <q-btn color="red" round icon="close" push @click="votar = false"></q-btn>
                <q-btn color="green" round icon="done" push @click="salve()"></q-btn>
            </div>
        </q-modal>

        <q-modal v-model="votaritemSD" content-css="padding: 50px">
            <q-modal-layout>
            <h5>Você tem certeza que quer votar no(a) {{editedItem.nome}}</h5>
            <q-btn label="Não" color="negative" @click.native ="votaritemSD = false"></q-btn>
            <q-btn label="Sim" color="positive" @click.native="votarsimSD(editedItem)"></q-btn>
           </q-modal-layout>
        </q-modal>
        <q-modal v-model="votaritemS" content-css="padding: 50px">
            <q-modal-layout>
            <h5>Você tem certeza que quer votar no(a) {{editedItem.nome}}</h5>
            <q-btn label="Não" color="negative" @click.native ="votaritemS = false"></q-btn>
            <q-btn label="Sim" color="positive" @click.native="votarsimS(editedItem)"></q-btn>
           </q-modal-layout>
        </q-modal>
        <q-modal v-model="votaritemND" content-css="padding: 50px">
            <q-modal-layout>
            <h5>Você tem certeza que quer votar no(a) {{editedItem.nome}}</h5>
            <q-btn label="Não" color="negative" @click.native ="votaritemND = false"></q-btn>
            <q-btn label="Sim" color="positive" @click.native="votarsimND(editedItem)"></q-btn>
           </q-modal-layout>
        </q-modal>
        <q-modal v-model="votaritemN" content-css="padding: 50px">
            <q-modal-layout>
            <h5>Você tem certeza que quer votar no(a) {{editedItem.nome}}</h5>
            <q-btn label="Não" color="negative" @click.native ="votaritemN = false"></q-btn>
            <q-btn label="Sim" color="positive" @click.native="votarsimN(editedItem)"></q-btn>
           </q-modal-layout>
        </q-modal>
        <q-modal v-model="votaritemC" content-css="padding: 50px">
            <q-modal-layout>
            <h5>Você tem certeza que quer votar no(a) {{editedItem.nome}}</h5>
            <q-btn label="Não" color="negative" @click.native ="votaritemC = false"></q-btn>
            <q-btn label="Sim" color="positive" @click.native="votarsimC(editedItem)"></q-btn>
           </q-modal-layout>
        </q-modal>

        <q-list class="flex flex-center items-start cardeleicao">
                <h4>Sudeste</h4>
                <q-item v-for='item in listaSudeste' :key='item.id' class="row">   
                    <q-card class="flex flex-center row">
                        <q-card-media class="col">
                            <img :src=item.imageUrl class="imgemCard"/>
                        </q-card-media>
                        <p class="col-8 nome">{{item.nome}}</p>
                        <div v-if="participouSD">
                            <q-knob
                            disable
                            size="50px"
                            v-model=item.voto
                            :min="min"
                            :max="max"/>
                        </div>
                        <q-btn v-if="!participouSD" icon="favorite_border" flat round class="col" @click="votacaoSD(item)"></q-btn>
                    </q-card>
                </q-item>
        </q-list>       
        
        <q-list class="flex-center row items-start cardeleicao">
                <h4>Sul</h4>
                <q-item v-for='item in listaSul' :key='item.id'>  
                    <q-card class="flex flex-center row">
                        <q-card-media class="col">
                            <img :src=item.imageUrl class="imgemCard"/>
                        </q-card-media>
                        <p class="col-8 nome">{{item.nome}}</p>
                        <div v-if="participouS">
                                <q-knob
                                disable
                                size="50px"
                                v-model=item.voto
                                :min="min"
                                :max="max"
                              /></div>
                        <q-btn v-if="!participouS" icon="favorite_border" flat round class="col" @click="votacaoS(item)"></q-btn>
                    </q-card>
                </q-item>
        </q-list> 

        <q-list class="flex-center row items-start cardeleicao">
                <h4>Nordeste</h4>
                <q-item v-for='item in listaNordeste' :key='item.id'>  
                    <q-card class="flex flex-center row">
                        <q-card-media class="col">
                            <img :src=item.imageUrl class="imgemCard"/>
                        </q-card-media>
                        <p class="col-8 nome">{{item.nome}}</p>
                        <div v-if="participouND">
                                <q-knob
                                disable
                                size="50px"
                                v-model=item.voto
                                :min="min"
                                :max="max"
                              /></div>
                        <q-btn v-if="!participouND" icon="favorite_border" flat round class="col" @click="votacaoND(item)"></q-btn>
                    </q-card>
                </q-item>
        </q-list> 

        <q-list class="flex-center row items-start cardeleicao">
                <h4>Norte</h4>
                <q-item v-for='item in listaNorte' :key='item.id'>  
                    <q-card class="flex flex-center row">
                        <q-card-media class="col">
                            <img :src=item.imageUrl class="imgemCard"/>
                        </q-card-media>
                        <p class="col-8 nome">{{item.nome}}</p>                        
                        <div v-if="participouN">
                                <q-knob
                                disable
                                size="50px"
                                v-model=item.voto
                                :min="min"
                                :max="max"
                              /></div>
                        <q-btn v-if="!participouN" icon="favorite_border" flat round class="col" @click="votacaoN(item)"></q-btn>
                    </q-card>
                </q-item>
        </q-list> 

        <q-list class="flex-center row items-start cardeleicao">
                <h4>Centro-Oeste</h4>
                <q-item v-for='item in listaCentro' :key='item.id'>  
                    <q-card class="flex flex-center row">
                        <q-card-media class="col">
                            <img :src=item.imageUrl class="imgemCard"/>
                        </q-card-media>
                        <p class="col-8 nome">{{item.nome}}</p>                        
                        <div v-if="participouC">
                                <q-knob
                                disable
                                size="50px"
                                v-model=item.voto
                                :min="min"
                                :max="max"
                              />
                        </div>
                        <q-btn v-if="!participouC" icon="favorite_border" flat round class="col" @click="votacaoC(item)"></q-btn>
                    </q-card>
                </q-item>
        </q-list> 

      </q-layout>
    </q-page>
</template>
      
<script>
import { uid, filter } from 'quasar'
import { $db, $storage } from '../plugins/firebase'
import { mapGetters } from 'vuex'
import Vuex from 'vuex'

export default {
        name: 'VotarPage',
        data () {
            return {
                votaritemSD: false,
                votaritemS: false,
                votaritemND: false,
                votaritemN: false,
                votaritemC: false,
                editedIndex: -1,
                editedItem: {},
                votar: false,
                sudeste: [],
                sul: [],
                norte: [],
                nordeste: [],
                centrooeste: [],
                telacheia: this.$q.platform.is.desktop

            }
        },
        methods: {
            toggleFullscreen () {
              this.$q.fullscreen.toggle()
            },
            salve () {
                $db.ref('eleicao').update({
                    sudeste: this.sudeste,
                    sul: this.sul,
                    norte: this.norte,
                    nordeste: this.nordeste,
                    centrooeste: this.centrooeste
                })
                this.votar = false
            },
            votacaoSD(item){
                this.editedIndex = this.listaUsuarios.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.votaritemSD = true
                },
            votacaoS(item){
                this.editedIndex = this.listaUsuarios.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.votaritemS = true
                },
            votacaoND(item){
                this.editedIndex = this.listaUsuarios.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.votaritemND = true
                },
            votacaoN(item){
                this.editedIndex = this.listaUsuarios.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.votaritemN = true
                },
            votacaoC(item){
                this.editedIndex = this.listaUsuarios.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.votaritemC = true
                },
            votarsimSD(editedItem) {
                if (this.editedIndex > -1) {
                    var listaUsuarios = this.listaUsuarios
                  Object.assign(listaUsuarios[this.editedIndex], this.editedItem)
                  var voto = listaUsuarios[this.editedIndex].voto + 1
               $db.ref('usuarios/' + editedItem.uid + '/user').update({voto: voto})
             }
                var uid = this.user.uid
                $db.ref('usuarios/' + uid + '/user').update({participouSD: true})
                this.$store.dispatch('addListaCandidatos') 
                this.votaritemSD = false   
            }, 
            votarsimS(editedItem) {
                if (this.editedIndex > -1) {
                    var listaUsuarios = this.listaUsuarios
                  Object.assign(listaUsuarios[this.editedIndex], this.editedItem)
                  var voto = listaUsuarios[this.editedIndex].voto + 1
               $db.ref('usuarios/' + editedItem.uid + '/user').update({voto: voto})
            } 
               var uid = this.user.uid
               $db.ref('usuarios/' + uid + '/user').update({participouS: true})
               this.$store.dispatch('addListaCandidatos') 
               this.votaritemS = false   
            },
            votarsimND(editedItem) {
                if (this.editedIndex > -1) {
                    var listaUsuarios = this.listaUsuarios
                  Object.assign(listaUsuarios[this.editedIndex], this.editedItem)
                  var voto = listaUsuarios[this.editedIndex].voto + 1
               $db.ref('usuarios/' + editedItem.uid + '/user').update({voto: voto})
             }
               var uid = this.user.uid
               $db.ref('usuarios/' + uid + '/user').update({participouND: true})
               this.$store.dispatch('addListaCandidatos') 
               this.votaritemND = false   
            },
            votarsimN(editedItem) {
                if (this.editedIndex > -1) {
                    var listaUsuarios = this.listaUsuarios
                  Object.assign(listaUsuarios[this.editedIndex], this.editedItem)
                  var voto = listaUsuarios[this.editedIndex].voto + 1
               $db.ref('usuarios/' + editedItem.uid + '/user').update({voto: voto})
             }
               var uid = this.user.uid
               $db.ref('usuarios/' + uid + '/user').update({participouN: true})
               this.$store.dispatch('addListaCandidatos') 
               this.votaritemN = false   
            },   
            votarsimC(editedItem) {
                if (this.editedIndex > -1) {
                    var listaUsuarios = this.listaUsuarios
                  Object.assign(listaUsuarios[this.editedIndex], this.editedItem)
                  var voto = listaUsuarios[this.editedIndex].voto + 1
               $db.ref('usuarios/' + editedItem.uid + '/user').update({voto: voto})
             }
               var uid = this.user.uid
               $db.ref('usuarios/' + uid + '/user').update({participouC: true})
               this.$store.dispatch('addListaCandidatos') 
               this.votaritemC = false   
            }   
        },
        computed: {
            ...mapGetters({
                loading: 'loading',
                error: 'error',
                user: 'currentUser',
            }),
            participouSD () {
                return this.$store.getters.usuario.participouSD
            },
            participouS () {
                return this.$store.getters.usuario.participouS
            },
            participouND () {
                return this.$store.getters.usuario.participouND
            },
            participouN () {
                return this.$store.getters.usuario.participouN
            },
            participouC () {
                return this.$store.getters.usuario.participouC
            },
            min () {
                return 0
            },
            max () {
                return this.listaUsuarios.length
            },
            listaUsuarios () {
                return this.$store.getters.listaUsuarios
            },
            listaSudeste () {
                return this.$store.getters.listaSudeste
            },
            listaSul () {
                return this.$store.getters.listaSul                
            },
            listaNorte () {
                return this.$store.getters.listaNorte
            },
            listaNordeste () {
                return this.$store.getters.listaNordeste                
            },
            listaCentro () {
                return this.$store.getters.listaCentro                
            },
            admin () {
                return this.$store.getters.user.email = 'alanpc7@gmail.com'
            }
        }
    }
</script>
      
<style>
    .imgemCard {
      object-fit: cover;
      border-radius: 100%;
      width: 50px;
      height: 50px;
    }
    .nome {
        padding-left: 4%
    }
    .btn {
    width: 100%;
    }
    .btns {
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 40px;
    }

</style>
      