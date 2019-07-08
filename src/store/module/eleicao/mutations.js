export const setRegiao = (state, payload) => {
  state.regiao = payload
}

export const startLoading = state => {
  state.loading = true
}

export const stopLoading = state => {
  state.loading = false
}