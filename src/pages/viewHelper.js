export async function executeAsync({
                                     instance,
                                     promiseFn,
                                     messageSuccess = null,
                                     messageError = null,
                                     timeout = 1500
                                   }) {
  instance.$q.loading.show()

  // RUN!
  const calledPromise = promiseFn()

  // SUCCESS
  calledPromise.then(value => {
    instance.$q.loading.hide()
    if (messageSuccess) {
      instance.$q.notify({ message: messageSuccess, type: 'positive', timeout })
    }
    return value
  })

  // ERROR
  calledPromise.catch(error => {
    instance.$q.loading.hide()
    if (messageError) {
      instance.$q.notify({ message: messageError, type: 'negative', timeout })
    }
    return Promise.reject(error)
  })

  return calledPromise
}

export async function executeConfirmAsync({
                                            instance,
                                            promiseFn,
                                            message,
                                            messageSuccess = null,
                                            messageError = null,
                                            timeout = 1500
                                          }) {
  try {
    await instance.$q.dialog({ title: 'Atenção!', message, ok: true, cancel: true })
    return await executeAsync({ instance, promiseFn, messageSuccess, messageError, timeout })
  } catch (error) {
    console.debug('Ação cancelada.')
  }
}
