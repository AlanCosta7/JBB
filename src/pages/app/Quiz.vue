<template> 
  <q-page class="bg-tertiary">
    <div class="q-pa-md row flex flex-center">
      <q-card color="white" height="370px">
        <q-card-title>
          <p class="lulobold text-black">{{currentPergunta[0].data.pergunta}}</p>
        </q-card-title>
        <q-card-main>
          <div class="text-center">
            <div class="flex flex-center">
              <div class="column">
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="currentPergunta[0].data.check" :val="currentPergunta[0].data.resposta1" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-black lulo" label>{{currentPergunta[0].data.resposta1}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="currentPergunta[0].data.check" :val="currentPergunta[0].data.resposta2" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-black lulo" label>{{currentPergunta[0].data.resposta2}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="currentPergunta[0].data.check" :val="currentPergunta[0].data.resposta3" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-black lulo" label>{{currentPergunta[0].data.resposta3}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="currentPergunta[0].data.check" :val="currentPergunta[0].data.resposta4" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-black lulo" label>{{currentPergunta[0].data.resposta4}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-btn color="positive" @click="salvarResposta(currentPergunta[0])" label="Salvar"></q-btn>
              </div>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
  </q-page> 
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageQuiz",
  meta: { title: "Despertar 2019 - Quiz" },
  data() {
    return {  
    };
  },
  computed: {
    ...mapGetters({
      currentPergunta: "quiz/currentPergunta",
      listaQuiz: "quiz/listaQuiz",
      index: "quiz/index",
      pontos: "quiz/pontos",
      loading: "loading",
      error: "error",
      user: "currentUser"
    }),
  },
  async mounted() {
    this.$q.loading.show()
    await this.$store.dispatch('quiz/watchQuiz')
    this.$q.loading.hide()
  },
  methods: {
      selectUsermap(item) {
        console.debug('[tool:usermap] usermap selecionado.', item)
        let i = this.usermaps.indexOf(item)
        this.$store.dispatch('boards/usermap/addIndex', i)
      },
    salvarResposta(item) {
        var resposta = item.data.respostacerta
        var check = item.data.check
        if (check === resposta) {
            var pontos = this.pontos
            var pt = pontos + 1
            this.$store.dispatch('quiz/addPontos', pt )   
            console.log(pt)

           console.log("resposta certa")
        } else {
           console.log("resposta errada")
        }
        let i = this.index
        i++
        
        this.$store.dispatch('quiz/addIndex', i )
    }
  }
};
</script>


<style>
.btn {
  width: 100%;
}

.btns {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 40px;
}
#photoURL {
  width: 50px;
  height: 50px;
}

.lulo {
  font-family: lulo;
  color: black
}

.widthlulo {
  width: 60%;
  font-size: 1.25em;
    color: black

}

.btntv3 {
  background-image: linear-gradient(red, yellow);
  border-radius: 100%;
  width: 80px;
  height: 80px;
}

.tv{
    font-size: 3em;
    text-align: center
}

.tile {
  font-size: 0.75em
}

.sizehorario {
  font-size: .65em
}

h3 {
  font-size: 1.25em;
  padding: 0;
  margin: 0;
}

.left {
  text-align: left;
}
</style>