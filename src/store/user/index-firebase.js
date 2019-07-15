import { LocalStorage } from 'quasar'
import { $auth, $firestore } from '../../plugins/firebase'
import { Notify } from 'quasar'
import { assert, mapQuerySnapshot, getCommonsIds, addCpf, addCadastro } from '../shared/helper'
import { pick } from 'lodash-es'

export default {
  namespaced: false,
  state: {
    eleicao: false,
    inscrito: false,
    currentUser: null,
    currentCadastrado: null,
    loading: false,
    checkin: null
  },
  getters: {
    checkin(state) {
      var uid = state.currentUser.uid
      return state.checkin = uid
    },
    inscrito(state) {
      return state.inscrito
    },
    eleicao(state) {
      return state.eleicao[0].data.jbb
    },
    loading(state) {
      return state.loading
    },
    currentUser(state) {
      return state.currentUser
    },
    currentCadastrado(state) {
      return state.currentCadastrado
    },
    isAuthenticated(state) {
      return !!state.currentUser
    }
  },
  mutations: {
    setEleicao(state, payload){
      state.eleicao = payload
    },
    setInscrito(state, payload) {
      state.inscrito = payload
    },
    startLoading(state) {
      state.loading = true
    },
    stopLoading(state) {
      state.loading = false
    },
    setUser(state, payload) {
      state.currentUser = payload
      LocalStorage.set('user', JSON.stringify(payload))
    },
    setUserCadastrado(state, payload) {
      state.currentCadastrado = payload
    }
  },
  actions: {
    signUserIn({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      this.$router.push('/')
      return $auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => handleSuccess(commit, user))
        .catch(error => handleError(commit, error))
    },


    async salvaCadastro({ rootState, commit }, { data }) {
      const validKeys = ['cpf', 'cidade', 'uf', 'bairro', 'logradouro', 'cep']
      const newCard = pick(data, validKeys)

      const { uid } = getCommonsIds({ rootState })
      assert(uid, 'projectId')

      const docRef = await addCadastro(uid, newCard)
      return docRef.id

    },


    async salvaCpf({ rootState, commit }, { data }) {
      const validKeys = ['cpf']
      const newCard = pick(data, validKeys)

      const listaCpf = await $firestore
        .collection('inscritos')
        .get()
        .catch(err => {
          console.error('Erro ao tentar carregar "cadastro"', err)
        })
        .then(mapQuerySnapshot)

      var listaGeral = []

      for (let i = 0; i < listaCpf.length; i++) {
        const element = listaCpf[i].data.cpf
        if (element === newCard.cpf) {
          listaGeral.push(element)
        }
      }

      console.log(listaGeral)

      if (listaGeral.length == 0) {
        const docRef = await addCpf(newCard)
        Notify.create({
          message: 'CPF cadastrado com sucesso',
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          textColor: 'white',
          position: 'bottom',
        })
        return docRef.id
      } else {
        Notify.create({
          message: 'esse cpf já foi cadastrado',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          textColor: 'white',
          position: 'bottom',
        })
      }

    },

    async loadCadastro({ rootState, commit }) {
      const { uid } = getCommonsIds({ rootState })
      assert(uid, 'projectId')
      commit('startLoading')

      const cards = await $firestore
        .collection('usuario')
        .doc(uid)
        .collection('cadastro')
        .get()
        .catch(err => {
          console.error('Erro ao tentar carregar "cadastro"', err)
        })
        .then(mapQuerySnapshot)
      if (cards.length > 0) {
        let meuCard = cards[0].data.cpf

        commit('setUserCadastrado', meuCard)
      }

      commit('stopLoading')
    },

    async loadCpf({ commit, getters }) {
      commit('startLoading')
      let currentCadastrado = getters.currentCadastrado

      const cpf = await $firestore
        .collection('inscritos')
        .get()
        .catch(err => {
          console.error('Erro ao tentar carregar "cadastro"', err)
        })
        .then(mapQuerySnapshot)

      for (let i = 0; i < cpf.length; i++) {
        const element = cpf[i].data.cpf
        if (element === currentCadastrado) {

          var meuCpf = true
        }

        commit('setInscrito', meuCpf)
      }

      commit('stopLoading')
    },


    signInWithRedirect({ commit }, { provider }) {
      commit('setLoading', true)
      commit('clearError')
      this.$router.push('/')
      return $auth
        .signInWithRedirect(provider)
        .then(user => handleSuccess(commit, user))
        .catch(error => handleError(commit, error))
    },
    async deleteAccount({ commit }) {
      return $auth.currentUser.delete().then(result => {
        commit('setUser', null)
      })
    },
    async logout({ commit }) {
      commit('setLoading', true)
      await $auth.signOut()

      Notify.create({
        message: 'Você foi deslogado com sucesso!',
        timeout: 1000,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        position: 'bottom',
      })

      commit('setUser', null)
      this.$router.push('/')
      LocalStorage.clear()
      commit('setLoading', false)
    },

    async loadEleicao({ rootState, commit }) {
      commit('startLoading')

      const cards = await $firestore
        .collection('eleicao')
        .doc('boleano')
        .collection('jbb')
        .get()
        .catch(err => {
          console.error('Erro ao tentar carregar "cadastro"', err)
        })
        .then(mapQuerySnapshot)

        commit('setEleicao', cards)

      commit('stopLoading')
    }
  }
}

function handleSuccess(commit, user) {
  commit('setLoading', false)
  commit('setUser', user)
  Notify.create({
    message: 'Você foi logado com sucesso!',
    timeout: 1000,
    type: 'positive',
    color: 'positive',
    textColor: 'white',
    position: 'top',
  })
}

function handleError(commit, error) {
  commit('setLoading', false)
  commit('setError', error)
  console.log(error)
}


