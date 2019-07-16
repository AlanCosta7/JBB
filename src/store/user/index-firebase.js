import { LocalStorage } from 'quasar'
import { $auth, $firestore } from '../../plugins/firebase'
import { Notify } from 'quasar'
import { assert, mapQuerySnapshot, getCommonsIds, addCpf, addCadastro, addUid } from '../shared/helper'
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
      return state.eleicao
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

    async addUID({ rootState, commit }) {

      let lista = [
        {uid: "0Hl2IwI6KuUhz94i0BikEeBS2Lf1"}, {uid: "0hVl6T1fKgVTERozlSucGjBrdHt2"}, {uid: "1MEgngCf94ZpeEp4h3k8LgZNueX2"}, {uid: "1bBkJHjTaIOyQFTEhJKZGTUUfkD2"}, {uid: "2OIf5tj5qATNhFxWykEoZBO3y7y2"}, {uid: "3Db4r4xzTsPk3gI5hgMLNWz3Q6N2"}, {uid: "3dvAUkBFgrU20cxR1o45Zdom6Tx2"}, {uid: "5nMCcgzpcsSnpSOw9MkGNNrMU0I3"}, {uid: "68nAG1B5ZjTnLSD8xUHizgPAVAq2"}, {uid: "6KD2u2VBYAg1iy59wdHZSWJ8TrY2"}, {uid: "6vSQGeIwFlMIgGeNgPmeTViK1rN2"}, {uid: "7DjSUbCFwWQG942V1GnuU92T87L2"}, {uid: "7tbXL9zVxAekDeZCoT1UXntjxxT2"}, {uid: "9IpYq4Wev0RgoP1VYLH07e0Xmut1"}, {uid: "9O8wDfkbE9R5YTptpNp86p0VLw12"}, {uid: "A5XvM08N1dQ2aU9NHU6qQ6rfQ0C3"}, {uid: "AbOujW1RwpNAZGRnR9tBhV9iTlt1"}, {uid: "AjZ3GlmqVEdomJxSAqEhv4eW50F2"}, {uid: "Bya2uR5ivsVH4Xf888dJjLGsPLo2"}, {uid: "CAFQRNQ17rZafXtGFPnw0qWKcRz1"}, {uid: "DtZzyU0slzVmXGHsb2xYZjV8en33"}, {uid: "EGTxQEGKBLMTqgDGUUlgZNgEskz1"}, {uid: "FWkb1rInb1Tn2f0cGGOhTkxS97H3"}, {uid: "H7Uy6DhOcBO8f0GGXSG9IUTj6TE3"}, {uid: "HBBX7lpXEuZCqxOR03a77KZ5Qvl1"}, {uid: "HZroBL1h5pMSilzsUoGdAI9T9vI2"}, {uid: "J3U3nUUwwoQGcLzDTr3OE4OI9E52"}, {uid: "KoJZOmlwHyMRvx9B1dzic2bGm073"}, {uid: "LuB0ZBqWk9NhyoGbyUjLAqy4WeU2"}, {uid: "MLdJn8sXruYegiZAiRrgP0oPf1A2"}, {uid: "Ni7l4Oq7SZMXYFsHPGpzFh7EQP82"}, {uid: "NoDXHBbvoFOZwlMGOo3F6caBL7V2"}, {uid: "OLnijssIdxfplQ5pIFLt4yq0WB33"}, {uid: "OnKIEdj6pbY1UcM7RfortrGevFH2"}, {uid: "QJDwYCEumaWqji4S9AjDj9nSm6z1"}, {uid: "RGSWIzxdiGVO8YXCFnEljuXhRFI3"}, {uid: "SVW7Rxz9rjTMdT41ruuEzL8ROT42"}, {uid: "T74LoGVzRmNGRgU0JJbfPwcgeIE2"}, {uid: "Tislib5a0DepthOGzhcAZg4Sw6w1"}, {uid: "UL0Knu7wPDX0qpdipVnxx62EL2q1"}, {uid: "UxPHp9KxpMc2O9ysYwl9WKaacRt2"}, {uid: "ViBmErFf3NXjqJ8jOWzuJ6k8Oho1"}, {uid: "WVLHp7PBkZP2D7fqNTwhgscHgeV2"}, {uid: "Wq4KguvSz8g2XjULU723AMpVIaA2"}, {uid: "X42VTe3RDvhPc7I9q7vliQKDYfA3"}, {uid: "YZGT8EXQ24fDHQyFrltJghzYwet1"}, {uid: "Z3knafXPExhiMrzcAuxjjZI9ow72"}, {uid: "Z80mFmG3hDOKSZokHtinUmvnkjA2"}, {uid: "br8MmwLZ5oYYPhbaFuxfbSCzHu82"}, {uid: "dVZILwZAehdIEHrnzn0bi5GQc2w1"}, {uid: "duwV5EMbGgXmQEgmgqLrsaWpudE2"}, {uid: "eQH0wuPN8LXjBReA2Xol0rkrhgQ2"}, {uid: "ec5hJK15h5cs9xkmj2oSTPh7H7e2"}, {uid: "fYZuvW2MfzR6hXMK0T4KK6ecK5m2"}, {uid: "fhnAyNwBKGO1B93WYakFehqTh733"}, {uid: "gZ09H00bcyW7JUyoSbCgO9nKCL22"}, {uid: "gb1D4eyzPWUAZiZUFfroqOepGtp1"}, {uid: "gemfj3XUI1MN3gOn1xUHjZShLnI3"}, {uid: "gjbBJBQhvcct74nYyIYE5tCyVVw1"}, {uid: "hMKs629jDXNlp7cadhSPOFmsnUq2"}, {uid: "jNdl3N25V3ct61rE4aOxgM3YZLZ2"}, {uid: "kOL5IPxWy0S6VhISEkR4dctpaiJ3"}, {uid: "kOvO6KfC9oZU8S4e31lWgXYMvhw1"}, {uid: "lkyG8iXo3cSLgjtH5wq6pvLRFEb2"}, {uid: "ln3Waik4HjMYcKZATYHA0URDt5J2"}, {uid: "mOR80mi9PqUsvUdlF3XXLpCs3bb2"}, {uid: "mxHTCXk95he8nt3EajJRrFOYtEg2"}, {uid: "o1bxBI7C4xUZ2swmqhH5GC0AvNA2"}, {uid: "o2B38tjTu0fZUEkPDAbnKhHvm6X2"}, {uid: "oX9Z63sJw9YVXH7QZA3YnhhFjAs2"}, {uid: "obieEgdJnAZ0mOx0DBRnn2MX4xe2"}, {uid: "p0YjANqRjqYHkMnEK6kDUun8IOC2"}, {uid: "ppzSLd2VVEMxvB0HpBEdnRvN9wI2"}, {uid: "pwtjFR45TkUAd3GxP1Oindwl8Sq2"}, {uid: "qbOex6bfDeQQhOi5u2zVBLxUENK2"}, {uid: "qhUZfhSNTmTXr16iSPjN2YgWUPD2"}, {uid: "qrBLc9ju6UPjWwIDYtEDQNXnoe72"}, {uid: "sOYXrzrtCXau56vKJnRMrVc1dXb2"}, {uid: "sTaTfqRglwhCtCcQj5emgJa4Ldh1"}, {uid: "uDCezc18saV0XyYDTigJ3Ya9T5j2"}, {uid: "uH9MnQW4HSNI2C6m9ZiKX5FxyV92"}, {uid: "z2plJC3YNKfz5ktlcyX0nE0hep02"}, {uid: "z8hbLDsAzUUA3u93Asw9MczBXjk2"}      
      ]

      for (let i = 0; i < lista.length; i++) {
        const element = lista[i]
        const docRef = await addUid(element)  
        
      }
      return docRef
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


