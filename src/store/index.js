import Vue from 'vue'
import Vuex from 'vuex'

import { $db } from '../plugins/firebase'
import { Loading, QSpinnerFacebook } from 'quasar'
import { LocalStorage, SessionStorage } from 'quasar'
import user from './user/index-firebase'
import jornada from './module/jornada'
import quiz from './module/quiz'
import eleicao from './module/eleicao'
import painel from './module/painel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, jornada, quiz, eleicao, painel
  },
  state: {
    inscricao: "https://www.pallua.com.br/captacao/projeto/evento_despertar_2019",
    video: '',
    loading: false,
    error: null
  },
  mutations: {
    setVideo(state, payload) {
      state.video = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
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
  },
  getters: {
    video(state) {
      return state.video
    },
    inscricao(state) {
      return state.inscricao
    },
    loading: state => state.loading,
    error(state) {
      return state.error
    },
    userRanking(state) {
      var ranking = state.quiz.ranking
      var uid = state.user.currentUser.uid
      for (let i = 0; i < ranking.length; i++) {
        const element = ranking[i]
        if (uid == element.data.uid) {
          var id = element.id
          console.log(id)

          return id
        }   
        
      }  
    }
  }
})
