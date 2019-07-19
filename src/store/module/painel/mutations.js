
export const setListaMap = (state, payload) => {
  state.listamap = payload
}
export const setListaUID = (state, payload) => {
  state.listauid = payload
}

export const setNCadastro = (state, payload) => {
  state.ncadastro = payload
}

export const startLoading = state => {
  state.loading = true
}

export const stopLoading = state => {
  state.loading = false
}

export const setResultado = (state, payload) => {
  state.resultado = payload
}
