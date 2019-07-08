import { $firestore } from 'plugins/firebase'
import { assert, mapQuerySnapshot, getCommonsIds, addDoc } from '../../shared/helper'
import { pick } from 'lodash-es'

export const watchRegiao = async ({ commit }) => {
  commit('startLoading')

  const cards = await $firestore
    .collection('eleicao')
    .doc('regiao')
    .collection()
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "eleição"', err)
    })
    .then(mapQuerySnapshot)

  commit('setRegiao', cards) 
  commit('stopLoading')
}

export const addJornada = async ({rootState, commit}, {data}) => {
  const validKeys = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']
  const newCard = pick(data, validKeys)
  //console.log(newCard)

  const {uid} = getCommonsIds({ rootState })
  assert(uid, 'projectId')

  const docRef = await addDoc(uid, newCard)
  return docRef.id

}

export const salvaJornada = async ({rootState, commit}, {id, data}) => {
  const validKeys = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']
  const newCard = pick(data, validKeys)

  const {uid} = getCommonsIds({ rootState })
  assert(uid, 'projectId')
// console.log(id, newCard)
  await $firestore
    .collection('usuario')
    .doc(uid)
    .collection('map')
    .doc(id)
    .update(newCard)

}

export const loadMaps = async ({ rootState, commit }) => {
  const { uid } = getCommonsIds({ rootState })
  assert(uid, 'projectId')
  commit('startLoading')

  const cards = await $firestore
    .collection('usuario')
    .doc(uid)
    .collection('map')
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "cards"', err)
    })
    .then(mapQuerySnapshot)

  commit('setMaps', cards)
  commit('stopLoading')
}
