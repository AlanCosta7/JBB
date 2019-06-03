import Vue from 'vue'
import Vuex from 'vuex'

import { $db } from '../plugins/firebase'
import { Loading, QSpinnerFacebook } from 'quasar'
import { LocalStorage, SessionStorage } from 'quasar'
import user from './user/index-firebase'
import maps from './maps/index-maps'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, maps
  },
  state: {
    inscricao: "https://www.pallua.com.br/captacao/projeto/evento_despertar_2019",
    video: '',
    loading: false,
    listaSudeste: [],
    listaSul: [],
    listaNordeste: [],
    listaNorte: [],
    listaCentro: [],
    listaTimeLine: [],
    listaChat: [],
    listaUsuarios: [],
    listaEquipe: [],
    loadChat: false,
    error: null,
    inscrito: false
  },
  mutations: {
    setListaEquipe(state, listaEquipe) {
      state.listaEquipe.push(listaEquipe)
    },
    setListaSudeste(state, listaSudeste) {
      state.listaSudeste.push(listaSudeste)
    },
    setListaSul(state, listaSul) {
      state.listaSul.push(listaSul)
    },
    setListaNordeste(state, listaNordeste) {
      state.listaNordeste.push(listaNordeste)
    },
    setListaNorte(state, listaNorte) {
      state.listaNorte.push(listaNorte)
    },
    setListaCentro(state, listaCentro) {
      state.listaCentro.push(listaCentro)
    },
    setListaTimeLine(state, listaTimeLine) {
      state.listaTimeLine.unshift(listaTimeLine)
    },
    setListaChat(state, listaChat) {
      state.listaChat.push(listaChat)
    },
    setListaUsuarios(state, listaUsuarios) {
      state.listaUsuarios.push(listaUsuarios)
    },
    setVideo(state, payload) {
      state.video = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setLoadChat(state, payload) {
      state.loadChat = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    setInscrito(state, payload) {
      state.inscrito = payload
    }
  },
  actions: {
    assistirVideoPromo({commit, getters}) {
      const video = getters.video
      return $db.ref('videopromo').once('value').then(function(snapshot) { 
        commit('setVideo', snapshot.val())
      })
      .catch
    },
    assistirVideo({commit, getters}) {
      const video = getters.video
      return $db.ref('video/nome').once('value').then(function(snapshot) { 
        commit('setVideo', snapshot.val())
      })
      .catch
    },
    customLoading() {
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'primary',
        spinnerSize: 140,
      })
    },
    fecharload() {
      Loading.hide()
    },
    addListaCandidatos({ getters, commit }) {
      var listaSudeste = getters.listaSudeste
      var listaSul = getters.listaSul
      var listaNordeste = getters.listaNordeste
      var listaNorte = getters.listaNorte
      var listaCentro = getters.listaCentro
      var listaUsuarios = getters.listaUsuarios

      //SUDESTE
      firebase.database().ref('eleicao/sudeste').on('value', function (snapshot) {
        var item = snapshot.val()
        var arr = Object.keys(item).map(function (key) { return item[key] })
        listaSudeste.length = 0

        for (var j = 0; j < arr.length; j++) {
          for (var y = 0; y < listaUsuarios.length; y++) {
            if (arr[j] == listaUsuarios[y].uid) {
              commit('setListaSudeste', listaUsuarios[y])
            }
          }
        }

      })

      //Sul
      firebase.database().ref('eleicao/sul').on('value', function (snapshot) {
        var item = snapshot.val()
        var arr = Object.keys(item).map(function (key) { return item[key] })
        listaSul.length = 0

        for (var j = 0; j < arr.length; j++) {
          for (var y = 0; y < listaUsuarios.length; y++) {
            if (arr[j] == listaUsuarios[y].uid) {
              commit('setListaSul', listaUsuarios[y])
            }
          }
        }

      })


      //NORDESTE
      firebase.database().ref('eleicao/nordeste').on('value', function (snapshot) {
        var item = snapshot.val()
        var arr = Object.keys(item).map(function (key) { return item[key] })
        listaNordeste.length = 0

        for (var j = 0; j < arr.length; j++) {
          for (var y = 0; y < listaUsuarios.length; y++) {
            if (arr[j] == listaUsuarios[y].uid) {
              commit('setListaNordeste', listaUsuarios[y])
            }
          }
        }

      })

      //NORTE
      firebase.database().ref('eleicao/norte').on('value', function (snapshot) {
        var item = snapshot.val()
        var arr = Object.keys(item).map(function (key) { return item[key] })
        listaNorte.length = 0

        for (var j = 0; j < arr.length; j++) {
          for (var y = 0; y < listaUsuarios.length; y++) {
            if (arr[j] == listaUsuarios[y].uid) {
              commit('setListaNorte', listaUsuarios[y])
            }
          }
        }

      })

      //CENTRO
      firebase.database().ref('eleicao/centrooeste').on('value', function (snapshot) {
        var item = snapshot.val()
        var arr = Object.keys(item).map(function (key) { return item[key] })
        listaCentro.length = 0

        for (var j = 0; j < arr.length; j++) {
          for (var y = 0; y < listaUsuarios.length; y++) {
            if (arr[j] == listaUsuarios[y].uid) {
              commit('setListaCentro', listaUsuarios[y])
            }
          }
        }

      })
    },
    signInscricao({ commit, getters }, payload) {
      commit('setLoading', true)
      commit('clearError')
      var userData = {
        email: payload.email,
        nomecompleto: payload.nomecompleto,
        rg: payload.rg,
        modelestado: payload.modelestado,
        igreja: payload.igreja,
        telefone: payload.telefone,
        datanascimento: payload.datanascimento,
      }
      var updates = {}
      var uid = getters.user.uid
      updates['/usuarios/' + uid + '/inscricao'] = userData

      firebase.database().ref().update(updates)
        .catch(
          error => {
            commit('setLoading', false)
            var errorCode = error.code;
            var errorMessage = error.message;
            commit('setError', errorMessage)
          }
        )

      var uid = getters.user.uid
      firebase.database().ref('/usuarios/' + uid + '/user/').update({
        inscrito: true
      })
      this.$router.push('/')
    },
    setarUsuarios({ getters, commit }) {
      var user = getters.user
      var useruid = user.uid
      var userlogado = firebase.database().ref('/usuarios/' + useruid + '/user').on('value', function (snapshot) {
        var item = snapshot.val()
        commit('setUsuario', item)
        LocalStorage.set('usuario', JSON.stringify(item))
      })
    },
    async carregaTimeLine({ getters, commit }) {

      commit('setLoading', true)
      const listaTimeLine = getters.listaTimeLine
      $db.ref('/posts/').on('value', function (snapshot) {
        var item = snapshot.val()
        var arr = Object.keys(item).map(function (key) { return item[key] })
        listaTimeLine.length = 0
        for (var j = 0; j < arr.length; j++) {
          commit('setListaTimeLine', arr[j])
          
        }

      })
      commit('setLoading', false)

    },
    carregaChat({ getters, commit }) {
      commit('setLoadChat', true)
      const listaChat = getters.listaChat
      firebase.database().ref('/chat/').on('value', function (snapshot) {
        var item = snapshot.val()
        var arr = Object.keys(item).map(function (key) { return item[key] })
        listaChat.length = 0
        for (var j = 0; j < arr.length; j++) {
          commit('setListaChat', arr[j])
        }
        commit('setLoadChat', false)
      })
    },
    clearError({ commit }) {
      commit('clearError')
    },
  },
  getters: {
    video(state) {
      return state.video
    },
    inscricao(state) {
      return state.inscricao
    },
    inscrito(state) {
      return state.inscrito
    },
    listaEquipe(state) {
      return state.listaEquipe
    },
    listaSudeste(state) {
      return state.listaSudeste
    },
    listaSul(state) {
      return state.listaSul
    },
    listaNordeste(state) {
      return state.listaNordeste
    },
    listaNorte(state) {
      return state.listaNorte
    },
    listaCentro(state) {
      return state.listaCentro
    },
    listaTimeLine(state) {
      return state.listaTimeLine
    },
    listaChat(state) {
      return state.listaChat
    },
    listaUsuarios(state) {
      return state.listaUsuarios
    },
    loading: state => state.loading,
    loadChat(state) {
      return state.loadChat
    },
    error(state) {
      return state.error
    }
  }
})
