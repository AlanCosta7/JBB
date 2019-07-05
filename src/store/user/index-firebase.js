import { LocalStorage } from 'quasar'
import { $auth, $firestore } from '../../plugins/firebase'
import { Notify } from 'quasar'
import { assert, mapQuerySnapshot, getCommonsIds, addDoc, addCadastro } from '../shared/helper'
import { pick } from 'lodash-es'

export default {
  namespaced: false,
  state: { 
    cpf: [],
    currentUser: null, 
    currentCadastrado: null,   
    loading: false,
  },
  getters: {
    inscrito(state, getters){
      return getters.cpf.filter(c => c.cpf === getters.currentCadastrado)
    },
    loading(state) {
      return state.loading
    },
    cpf(state) {
      return state.cpf
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
    setCpf (state, payload) {
      state.cpf = payload
    },
    startLoading (state) {
      state.loading = true
    },
    stopLoading (state) {
      state.loading = false
    },
    setUser(state, payload) {
      state.currentUser = payload
      LocalStorage.set('user', JSON.stringify(payload))
    },
    setUserCadastrado(state, payload) {
      state.currentCadastrado = payload
      LocalStorage.set('cadastro', JSON.stringify(payload))
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

    
    async salvaCadastro ({rootState, commit}, {data}) {
      const validKeys = ['cpf', 'cidade', 'uf', 'bairro', 'logradouro', 'cep']
      const newCard = pick(data, validKeys)
      //console.log(newCard)

      const {uid} = getCommonsIds({ rootState })
      assert(uid, 'projectId')

      const docRef = await addCadastro(uid, newCard)
      return docRef.id

    },

    async loadCadastro ({ rootState, commit }) {
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

        commit('setUserCadastrado', cards)
        
      commit('stopLoading')
    },

    async loadCpf ({ commit }, state) {
      commit('startLoading')
    
      const cpf = await $firestore
        .collection('inscritos')
        .get()
        .catch(err => {
          console.error('Erro ao tentar carregar "cadastro"', err)
        })
        .then(mapQuerySnapshot)
      commit('setCpf', cpf)
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
