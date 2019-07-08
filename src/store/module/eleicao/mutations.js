export const setCentrooeste = (state, payload) => {
  state.centrooeste = payload
}

export const setNorte = (state, payload) => {
  state.norte = payload
}

export const setNordeste = (state, payload) => {
  state.nordeste = payload
}

export const setSul = (state, payload) => {
  state.sul = payload
}

export const setSuldeste = (state, payload) => {
  state.suldeste = payload
}

export const startLoading = state => {
  state.loading = true
}

export const stopLoading = state => {
  state.loading = false
}

export const startVoto = state => {
  state.startvoto = true
}