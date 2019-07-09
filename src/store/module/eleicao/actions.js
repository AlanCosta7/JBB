import { $firestore } from 'plugins/firebase'
import { assert, mapQuerySnapshot, getCommonsIds, addDocVoto } from '../../shared/helper'
import { pick } from 'lodash-es'

export const watchCentrooeste = async ({ commit }) => {

  commit('startLoading')

  const cards = await $firestore
    .collection('eleicao')
    .doc('regiao')
    .collection('centrooeste')
    .doc('centrooeste')
    .collection('candidato')
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "eleição"', err)
    })
    .then(mapQuerySnapshot)

  commit('setCentrooeste', cards) 
  commit('stopLoading')
}


export const watchNorte = async ({ commit }) => {

  commit('startLoading')

  const cards = await $firestore
    .collection('eleicao')
    .doc('regiao')
    .collection('norte')
    .doc('norte')
    .collection('candidato')
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "eleição"', err)
    })
    .then(mapQuerySnapshot)

  commit('setNorte', cards) 
  commit('stopLoading')
}


export const watchNordeste = async ({ commit }) => {

  commit('startLoading')

  const cards = await $firestore
    .collection('eleicao')
    .doc('regiao')
    .collection('nordeste')
    .doc('nordeste')
    .collection('candidato')
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "eleição"', err)
    })
    .then(mapQuerySnapshot)

  commit('setNordeste', cards) 
  commit('stopLoading')
}


export const watchSul = async ({ commit }) => {

  commit('startLoading')

  const cards = await $firestore
    .collection('eleicao')
    .doc('regiao')
    .collection('sul')
    .doc('sul')
    .collection('candidato')
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "eleição"', err)
    })
    .then(mapQuerySnapshot)

  commit('setSul', cards) 
  commit('stopLoading')
}


export const watchSuldeste = async ({ commit }) => {

  commit('startLoading')

  const cards = await $firestore
    .collection('eleicao')
    .doc('regiao')
    .collection('sudeste')
    .doc('sudeste')
    .collection('candidato')
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "eleição"', err)
    })
    .then(mapQuerySnapshot)

  commit('setSuldeste', cards) 
  commit('stopLoading')
}

export const salvaVoto = async ({rootState, commit}, {data}) => {
  const validKeys = ['Centro', 'Norte', 'Nordeste', 'Suldeste', 'Sul', 'Usuario']
  const newCard = pick(data, validKeys)

  const {uid} = getCommonsIds({ rootState })
  assert(uid, 'projectId')

  const docRef = await addDocVoto(uid, newCard)
  return docRef.id

}


export const loadVoto = async ({rootState, commit}) => {
  const {uid} = getCommonsIds({ rootState })
  assert(uid, 'projectId')

  const votoUId = await $firestore
    .collection('eleicao')
    .doc('resultado')
    .collection(uid)
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "eleição"', err)
    })
    .then(mapQuerySnapshot)

    for (let i = 0; i < votoUId.length; i++) {
      const element = votoUId[i].data.Usuario;
        
        if (element === uid) {
          commit('startVoto', true)

        } else {

        } 
    }

}
