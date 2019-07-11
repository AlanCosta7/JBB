import { $firestore } from 'plugins/firebase'
import { get } from 'lodash-es'

export function assert(data, label) {
  const msg = `${label} inválido.`
  const details = { [label]: data }
  console.assert(data, msg, details)
  if (!data) {
    throw new Error(msg, details)
  }
}

export function getCommonsIds({ rootState }) {
  const uid = get(rootState, 'user.currentUser.uid')
  return { uid }
}

export function mapQuerySnapshot(querySnapshot) {
  return querySnapshot.docs.map(doc => {
    if (!doc.exists) {
      return null
    }

    return {
      id: doc.id,
      data: doc.data()
    }
  })
}

export function mapDocumentSnapshot(docSnapshot) {
  if (!docSnapshot.exists) {
    console.warn('documento não encontrado:', docSnapshot)
    return null
  }

  return {
    id: docSnapshot.id,
    data: docSnapshot.data()
  }
}

export async function addDoc(uid, jornada) {

  const docRef = await $firestore
    .collection('usuario')
    .doc(uid)
    .collection('map')
    .add(jornada) 

  console.info('Doc adicionado:', docRef)
  return docRef
}

export async function addDocVoto(uid, newCard) {

  const docRef = await $firestore
    .collection('eleicao')
    .doc('resultado')
    .collection(uid)
    .add(newCard) 

  console.info('Doc adicionado:', docRef)
  return docRef
}

export async function addDocQuiz(data) {

  const docRef = await $firestore
    .collection('ranking')
    .doc('jbb')
    .collection('id')
    .add(data) 
    
  console.info('Doc adicionado:', docRef)
  return docRef
}

export async function addId(data) {

  const docRef = await $firestore
    .collection('ranking')
    .doc('jbb')
    .collection('id')
    .doc(data)
    .update({id:data}) 
    
  console.info('Doc adicionado:', docRef)
  return docRef
}

export async function addCadastro(uid, newCard) {

  const docRef = await $firestore
    .collection('usuario')
    .doc(uid)
    .collection('cadastro')
    .add(newCard) 

  console.info('Doc adicionado:', docRef)
  return docRef
}

export async function addCpf(newCard) {

  const docRef = await $firestore
    .collection('inscritos')
    .add(newCard) 

  console.info('Doc adicionado:', docRef)
  return docRef
}

export async function updateDoc(pid, collectionName, docId, docData) {
  assert(pid, 'projectId')

  const documentRef = $firestore
    .collection('projects')
    .doc(pid)
    .collection(collectionName)
    .doc(docId)

  await documentRef.update(docData)
  console.info('Doc atualizado:', docId)

  return documentRef
}