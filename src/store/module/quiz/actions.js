import { $firestore } from 'plugins/firebase'
import { assert, mapQuerySnapshot, getCommonsIds, addDocQuiz, addId } from '../../shared/helper'
import { pick } from 'lodash-es'

export const watchQuiz = async ({ commit }) => {
  let listaQuiz = []

  commit('startLoading')
  var lista = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12'] //'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40']
  
  for (let i = 0; i < lista.length; i++) {
    const element = lista[i];

    const cards = await $firestore
    .collection('quiz').doc('jbb').collection(element)
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "quiz"', err)
    })
    .then(mapQuerySnapshot)
    listaQuiz.push(cards) 
  }
  commit('setQuiz', listaQuiz) 

  commit('stopLoading')
}

//Parei aqui
export const addQuiz = async ({rootState, commit}, {data}) => {
  var validKeys = ['nome', 'photoURL', 'uid', 'pontos']
  const newCard = pick(data, validKeys)

  const {uid} = getCommonsIds({ rootState })
  assert(uid, 'projectId')

 const docRef = await addDocQuiz(data)
 const docRefId = docRef.id
 
 await addId(docRefId)

 return docRef.id
}

export const salvaQuiz = async ({rootState, commit}, {id, data}) => {
  var lista = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40']
  const newCard = pick(data, validKeys)

  const {uid} = getCommonsIds({ rootState })
  assert(uid, 'projectId')
  await $firestore
    .collection('usuario')
    .doc(uid)
    .collection('map')
    .doc(id)
    .update(newCard)

}

export const addIndex = async ({ commit }, payload) => {
  commit('setIndex', payload)
}

export const addPontos = async ({ commit }, payload) => {
  commit('setPontos', payload)
}

export const loadRanking = async ({ rootState, commit }) => {
  const { uid } = getCommonsIds({ rootState })
  assert(uid, 'projectId')
  commit('startLoading')

  const cards = await $firestore
    .collection('ranking')
    .doc('jbb')
    .collection('id')
    .get()
    .catch(err => {
      console.error('Erro ao tentar carregar "Ranking"', err)
    })
    .then(mapQuerySnapshot)

  commit('setRanking', cards)
  commit('stopLoading')
}


export const uploadQuiz = async ({rootState, commit}, {userRanking, data}) => {
  var validKeys = ['nome', 'photoURL', 'uid', 'pontos']
  const newCard = pick(data, validKeys)

  const {uid} = getCommonsIds({ rootState })
  assert(uid, 'projectId')

  await $firestore
    .collection('ranking')
    .doc('jbb')
    .collection('id')
    .doc(userRanking)
    .update(data)

}