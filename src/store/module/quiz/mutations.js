
export const setQuiz = (state, payload) => {
  state.listaQuiz = payload
}

export const setPontos = (state, payload) => {
  state.pontos = payload
}

export const startLoading = state => {
  state.loading = true
}

export const stopLoading = state => {
  state.loading = false
}

export const setIndex = (state, payload) => {
  state.index = payload
}