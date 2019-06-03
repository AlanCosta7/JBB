
export default {
    state: {
        minhaposicao: {}
    },
    getters: {
        minhaposicao(state) { return state.minhaposicao },
    },
    mutations: {
        setPosition(state, payload) {
            state.minhaposicao = payload
        }
    },
    actions: {
        minhaposicao({commit}) {
            if (navigator.geolocation) { // Se o navegador do usuário tem suporte ao Geolocation
                navigator.geolocation.getCurrentPosition(function (position) {
                    var latcoor = position.coords.latitude
                    var loncoor = position.coords.longitude
                    var latlog = { lat: latcoor, lng: loncoor }
                    var texto = 'Minha posição'
                    var minhaposicao = { position: latlog, texto: texto }
                    commit('setPosition', minhaposicao) 
                })
            } else {
                    output.innerHTML = "<p>Seu navegador não suporta Geolocalização</p>";
                    return;
            }
        }
    }
}