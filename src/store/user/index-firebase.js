import { LocalStorage } from 'quasar'
import { $auth } from '../../plugins/firebase'
import { Notify } from 'quasar'

export default {
  namespaced: false,
  state: { currentUser: null },
  getters: {
    currentUser(state) {
      return state.currentUser
    },
    isAuthenticated(state) {
      return !!state.currentUser
    }
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
      LocalStorage.set('user', JSON.stringify(payload))
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
        position: 'top',
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
