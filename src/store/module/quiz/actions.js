import { $firestore } from 'plugins/firebase'
import { assert, mapQuerySnapshot, getCommonsIds, addDoc } from '../../shared/helper'
import { pick } from 'lodash-es'

export const watchQuiz = async ({ commit }) => {
  let listaQuiz = []

  commit('startLoading')
  var lista = ['p1'] //'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40']
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
    commit('setQuiz', cards) 

   // console.log(listaQuiz)
  }

  commit('stopLoading')
}

export const addQuiz = async ({rootState, commit}, {data}) => {
  var lista = ['pontos']
  const newCard = pick(data, validKeys)
  //console.log(newCard)

  const {uid} = getCommonsIds({ rootState })
  assert(uid, 'projectId')

  const docRef = await addDoc(uid, newCard)
  return docRef.id

}

export const salvaQuiz = async ({rootState, commit}, {id, data}) => {
  var lista = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40']
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
