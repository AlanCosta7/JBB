<template>
    <q-page>
      <q-layout class="flex column">
        <div class="bg-primary cardtop">
          <router-link to="/">
          </router-link>
        </div>
        <div class="gt-md">
        </div>
        <div class="flex flex-center">
          <div class="flex flex-center column shadow-4 cardlogin" v-show="!currentUser">
            <h2 class="text-primary text-bold">Login</h2>
            <p class="subtitulo">Acesso para inscritos</p>
            <form @submit.prevent="onSignin" class="column flex flex-center q-pa-md">
              <q-field class="q-mb-sm">
                <q-input name="email" placeholder="Email" id="email" v-model="email" type="email" required></q-input>
              </q-field>
              <q-field class="q-mb-sm">
                <q-input name="password" placeholder="Senha" id="password" v-model="password" type="password" required></q-input>
              </q-field>
              <q-field class="q-mb-sm">
                <q-btn color="positive" type="submit" :disabled="loading" :loading="loading">
                  Entrar
                  <span slot="loader" class="custom-loader">
                    <q-icon name="cached">cached</q-icon>
                  </span>
                </q-btn>
              </q-field>
            </form>
  
          </div>
          <div class="flex flex-center column shadow-4 cardlogin" v-show="currentUser">
            <h2 class="text-primary text-bold">Redirecionando...</h2>
            <p class="subtitulo">Você já está conectado!</p>
            <!-- <div>
                    <p class="q-mt-lg q-mb-none text-center">O que você quer?</p>
                    <q-btn class="q-ma-lg" color="negative" flat @click="logout()">Desconectar</q-btn>
                    <q-btn class="q-ma-lg" color="primary" :to="'/app/projects'">Acessar seu ambiente</q-btn>
                  </div> -->
          </div>
        </div>
      </q-layout>
    </q-page>
  </template>
  
  <script>
    import Vuex from 'vuex'
    import { firebase } from '../../plugins/firebase.js'
  
    export default {
      name: 'PageLogin',
      meta: { title: 'PG - Login' },
      data() {
        return {
          email: '',
          password: ''
        }
      },
      mounted() {
        if (this.currentUser) {
          const rediretDelay = 2000
          this.redirectToApp(rediretDelay)
          return
        }
      },
  
      computed: {
        ...Vuex.mapGetters({
          currentUser: 'currentUser',
          loading: 'loading',
          error: 'error',
        }),
      },
      methods: {
        ...Vuex.mapActions(['logout']),
        redirectToApp(redirectDelay) {
          this.$q.loading.show({ delay: 300 })
          setTimeout(() => {
            this.$q.loading.hide()
            this.$router.push('/')
          }, redirectDelay)
        },
        onSignin() {
          this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
  
        },
        onDismissed() {
          this.$store.dispatch('clearError')
        }
      },
      watch: {
        currentUser(newUser, oldUser) {
          if (newUser) {
            // user is logged, so... lets redirect to App
            this.redirectToApp(1000)
          }
        }
      }
    }
  </script>
  
  <style scope>
  
    .cardtop {
      width: 100%;
      height: 200px;
      padding: 2em 1rem;
      text-align: center;
    }
    .cardlogin {
      position: relative;
      margin-top: -100px;
      border-radius: 2px;
      background-color: white;
      padding: 2rem 2rem;
    }
  
    .subtitulo {
      font-size: 1.5em;
    }
  
    .firebaseui-idp-button {
      max-width: 300px;
      min-height: 60px;
      border-radius: 30px;
    }
  
    .firebaseui-idp-text {
      font-size: 18px;
    }
  
    h1 {
      font-size: 56px;
      font-weight: 200;
    }
  
    h2 {
      font-size: 28px;
      font-weight: 300;
      margin: 0;
      padding: 0;
    }
  
    a {
      text-decoration: none;
      color: black;
    }
  
    .base-social {
      margin-bottom: 1em;
    }
  
    @media only screen and (max-width: 480px) {
      h1 {
        font-size: 10vw;
      }
      h2 {
        font-size: 10vw;
      }
  
      .q-layout-footer {
        position: relative;
        margin: 1rem 0;
      }
  
      .q-layout-footer .q-btn {
        display: block;
      }
  
      .base-social {
        width: 100vw;
        text-align: center;
      }
  
      .base-social a {
        width: 16vw;
        margin: 0 4vw;
      }
  
      .base-social img {
        width: 100%;
      }
  
      /* .firebaseui-idp-text {
      font-size: 1rem;
    } */
      .firebaseui-idp-button {
        max-width: 100%;
        min-height: 60px;
        border-radius: 30px;
      }
  
      .firebaseui-list-item {}
  
      .firebaseui-card-content {
        padding: 0;
      }
      .idea {
        height: 100px;
      }
    }
  </style>