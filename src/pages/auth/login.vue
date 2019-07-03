<template>
  <q-page class="page-login">
    <q-layout class="flex column bg-tertiary">
      <div class="bg-tertiary cardtop">
      <div class="imagemthinking gt-m">
        <img src="~assets/quasar-logo-full.svg" alt="imagem" aria-hidden="true">
      </div>
        <router-link to="/">
        </router-link>
      </div>
      <div class="flex flex-center">
        <div class="flex flex-center column shadow-6 cardlogin" v-show="!currentUser">
          <h2 class="text-primary text-bold">Entre</h2>
          <p class="subtitulo">A experiência começa agora</p>
          <div id="firebaseui-auth-container"></div>
        </div>
        <div class="flex flex-center column shadow-6 cardlogin" v-show="currentUser">
          <h2 class="text-primary text-bold">Redirecionando...</h2>
          <p class="subtitulo">Você já está conectado!</p>
          <!-- <div>
                  <p class="q-mt-lg q-mb-none text-center">O que você quer?</p>
                  <q-btn class="q-ma-lg" color="negative" flat @click="logout()">Desconectar</q-btn>
                  <q-btn class="q-ma-lg" color="primary" :to="'/app/projects'">Acessar seu ambiente</q-btn>
          </div>-->
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
  meta: { title: 'garage thinking - Login' },
  data() {
    return {}
  },
  mounted() {
    if (this.currentUser) {
      const rediretDelay = 2000
      this.redirectToApp(rediretDelay)
      return
    }
    // Confgiure and add the FirebaseUI Widget
    let signInFlow = 'popup'
    // For iOS full screen apps we use the redirect auth mode.
    if ('standalone' in window.navigator && window.navigator.standalone) {
      signInFlow = 'redirect'
    }

    const uiConfig = {
      signInFlow: signInFlow,
      // signInSuccessUrl: '/auth/success',
      // signInSuccessUrl: '/app/projects',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
        //firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      //tosUrl: '/legal/terms-of-service',
      //privacyPolicyUrl: '/legal/privacy',
      callbacks: {
        uiShown: function() {
          // The widget is rendered.

          // Update text content of buttons
          updateLabels()
          function updateLabels() {
            const elGoogle = document.querySelector('.firebaseui-idp-google .firebaseui-idp-text-long')
            const elFacebook = document.querySelector('.firebaseui-idp-facebook .firebaseui-idp-text-long')
            // const elEmail = document.querySelector('.firebaseui-idp-password .firebaseui-idp-text-long')
            const elementsExists = elGoogle && elFacebook /* && elEmail */
            if (!elementsExists) {
              window.requestAnimationFrame(updateLabels)
            } else {
              elGoogle.textContent = 'Acessar com Google'
              elFacebook.textContent = 'Acessar com Facebook'
              // elEmail.textContent = 'Acessar com Email'
            }
          }
        }
      }
    }
    this.$firebaseui.start('#firebaseui-auth-container', uiConfig)
  },
  computed: {
    ...Vuex.mapGetters(['currentUser'])
  },
  methods: {
    ...Vuex.mapActions(['logout']),
    redirectToApp(redirectDelay) {
      this.$q.loading.show({ delay: 300 })
      setTimeout(() => {
        this.$q.loading.hide()
        this.$router.replace({ name: 'jornada' })
      }, redirectDelay)
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

<style scoped>
.page-login .imagemthinking {
  position: absolute;
  left: 2.5rem;
  top: 0px;
}


.page-login .cardtop {
  width: 100%;
  height: 200px;
  padding: 2em 1rem;
  text-align: center;
}

.page-login .base-logo {
  max-width: 200px;
}

.page-login .cardlogin {
  position: relative;
  border-radius: 5px;
  background-color: white;
  padding: 2rem 2rem;
}

.page-login .subtitulo {
  font-size: 1.5em;
}

.page-login .firebaseui-idp-button {
  max-width: 300px;
  min-height: 60px;
  border-radius: 30px;
}

.page-login .firebaseui-idp-text {
  font-size: 18px;
}

.page-login h1 {
  font-size: 56px;
  font-weight: 200;
}

.page-login h2 {
  font-size: 28px;
  font-weight: 300;
  margin: 0;
  padding: 0;
}

@media only screen and (max-width: 480px) {
  .page-login h1 {
    font-size: 10vw;
  }
  .page-login h2 {
    font-size: 10vw;
  }

  .page-login .q-layout-footer .q-btn {
    display: block;
  }

  .page-login .firebaseui-idp-button {
    max-width: 100%;
    min-height: 60px;
    border-radius: 30px;
  }

  /* .firebaseui-list-item {
  } */

  .page-login .firebaseui-card-content {
    padding: 0;
  }
}
</style>
