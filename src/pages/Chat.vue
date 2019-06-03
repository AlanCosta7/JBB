<template>
        <q-page>                   
            <q-scroll-area id="scroll" style="width: 100%">
                <q-list class="items-end row">
                    <q-item v-for='item in listaChat' class="col-12 itemchart" :key='item.id'  > 
                          <q-chat-message
                            :name=item.nome
                            :avatar=item.avatar
                            :text="[item.texto]"
                            :stamp=item.data
                            :sent="isSent(item) ? true : false"
                          />
                    </q-item>
                </q-list>   
            </q-scroll-area>             
               <q-inner-loading :visible="loadChat">
                    <q-spinner-comment size="100px" color="orange"></q-spinner-comment>
                </q-inner-loading>
            <div class="absolute-bottom editar">
                <form @submit.prevent="onChat"> 
                    <div class="row input">
                        <q-input
                            inverted
                            class="col-10"
                            type="textarea"
                            v-model="texto"
                        />
                        <q-btn color="green" 
                            type="submit" 
                            icon="send"
                            :disabled="loadChat" 
                            :loading="loadChat" 
                            class="justify-center btnSalvar col-2">
                        <span slot="loader" class="custom-loader">
                            <q-icon name="cached"/>
                        </span>
                        </q-btn>
                    </div>
                </form>        
                <div class="row btns">
                    <q-btn color="primary" @click="dashboard()" outline icon="dashboard" class="btn col"></q-btn>
                    <q-btn color="primary" @click="aovivo()" outline class="btn col-6">ao vivo<q-spinner-rings color="red" :size="30" /></q-btn>
                    <q-btn color="primary" @click="chat()" outline icon="forum" class="btn col"></q-btn>
                </div>
            </div>
        </q-page>
    </template>
    
    <script>
    import { $db, $storage } from '../plugins/firebase'
    import moment from 'moment'

    export default {
      name: 'PageIndex',
            data () {
                return {
                    texto: '',
                }
            },
            mounted() {
              this.$store.dispatch('carregarUsuario') 
              this.$store.dispatch('carregaTimeLine') 
              this.$store.dispatch('carregaChat') 
              this.$store.dispatch('carregaListaUsuario') 
    
            var width = window.innerWidth;
            var height = window.innerHeight;  
            
            document.getElementById('scroll').style.height = height - 135 + 'px'
            },
            computed: {
                loading () {
                    return this.$store.getters.loading
                },
                loadChat () {
                    return this.$store.getters.loadChat
                },
                error () {
                    return this.$store.getters.error
                },
                usuario () {
                    return this.$store.getters.usuario
               },
               listaChat () {
                return this.$store.getters.listaChat
               },
                user() {
                    return this.$store.getters.user      
                }
            },
            methods: {
              isSent (item) {
                var user = this.user
                return (item.email === user.email)
              },
              messageDate (item) {
                return moment(item.createdAt).format('DD/MM, hh:mm:ss')
              },  
              aovivo() {
                this.$router.push('/aovivo')
              },
              dashboard() {
                this.$router.push('/index')
              },
              chat() {
                this.$router.push('/chat')
              },
              onChat (item) { 
                    var user = this.user
                    var uid = user.uid
                    var postData = {
                        texto: this.texto,
                        data: this.messageDate(item),
                        avatar: this.usuario.imageUrl,
                        email: this.user.email,
                        uid: this.user.uid, 
                        nome: this.usuario.nome,
                        }
    
                    var newPostKey = $db.ref().child('chat').push().key
                    var updates = {}    
                    updates['/chat/' + newPostKey] = postData
                    
                    let imageUrl
                    var key = newPostKey
                    return $db.ref().update(updates)
                    .then(     
                            this.texto = ""
                        )
                    .then((data) => {
                        const key = newPostKey
                        return key
                    })
                    .then(key => {
                            const filename = this.image.name
                            const ext = filename.slice(filename.lastIndexOf('.'))
                            $storage.ref('chat/' + key + ext).put(this.image)  
                        .then(     
                            this.clearForm() 
                        )
                        .catch(function(error) {
                            // [START onfailure]
                            console.error('Upload failed:', error);
                            // [END onfailure]
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                },
                clearForm () {
                    this.image = null,
                    this.imageUrl = null
                },
                onDismissed () {
                    this.$store.dispatch('clearError')
                }, 
            }
    
    }    
</script>
<style>
      .input {
        width: 100%;
        position: absolute;
        bottom: 42px;
      }  
      .btn {
        width: 100%;
      }
      .btns {
        width: 100%;
        position: absolute;
        bottom: 0
      }
      .image {
        width: 100%;
        height: auto;  
        position: absolute;
        display:flex;
        bottom: 80px;
      }
      .imagemPerfil {
        object-fit: cover;
        border-radius: 100%;
        width: 35px;
        height: 35px;
      }
      .nome {
        padding-left: 10%;
        font-size: 0.75em;
        font-weight: bold
      }
      .postImagem {
        width: 100%; 
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
    
      }
      .post {
        background-color: #E1E9F8;  
        border-radius: 15px;
        width: 100%;
      }
      .postint {
        width: 100%;  
        padding: 3%
      }
      .texto {
        padding: 5%;
        width: 100%;
      }
      .editar {
        background: white  
      }
      .itemchart {
        display: inline;
      }

</style>