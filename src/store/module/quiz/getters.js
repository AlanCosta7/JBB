export const listaQuiz = state => state.listaQuiz
export const index = state => state.index
export const pontos = state => state.pontos
export const loading = state => state.loading
export const ranking = state => state.ranking


export const currentPergunta = state => {
    if (Array.isArray(state.listaQuiz) && state.listaQuiz.length > 0) {
      return state.listaQuiz[state.index]
    }
    return null
  }
