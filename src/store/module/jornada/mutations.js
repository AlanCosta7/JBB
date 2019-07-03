
export const setJornada = (state, payload) => {
  state.jornada = payload
}

export const setMaps = (state, payload) => {
  state.listaMaps = payload
}

export const startLoading = state => {
  state.loading = true
}

export const stopLoading = state => {
  state.loading = false
}