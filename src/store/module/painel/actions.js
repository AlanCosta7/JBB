import { $firestore } from 'plugins/firebase'
import { assert, mapQuerySnapshot, getCommonsIds, addDocQuiz, addUid } from '../../shared/helper'
import { pick } from 'lodash-es'
import { Notify } from 'quasar'

export const salvaUid = async ({ commit }, { data }) => {

  const validKeys = ['uid']
  const newCard = pick(data, validKeys)

  const listaUid = await $firestore
    .collection('listaUID')
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "cadastro"', err)
    })
    .then(mapQuerySnapshot)

  var listaGeral = []

  for (let i = 0; i < listaUid.length; i++) {
    const element = listaUid[i].data.uid
    if (element === newCard.uid) {
      listaGeral.push(element) 
    }
  }

  if (listaGeral.length == 0) {
    const docRef = await addUid(newCard)  
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

}


export const loadUid = async({ commit }) => {
  commit('startLoading')

  const uid = await $firestore
    .collection('usuario')
    .get()
    .then(mapQuerySnapshot)
    .catch(err => {
      console.error('Erro ao tentar carregar "cadastro"', err)
    })

    console.log(uid)

  commit('stopLoading')
}