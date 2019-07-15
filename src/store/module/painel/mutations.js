
export const setNCadastro = (state, payload) => {
  state.ncadastro = payload
}

export const startLoading = state => {
  state.loading = true
}

export const stopLoading = state => {
  state.loading = false
}