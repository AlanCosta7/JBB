<template>
  <q-page class="bg-tertiary" id="page-quiz">
    <div style="width:295px" class="q-ma-md">
      <q-card color="white" height="370px">
        <q-card-title>
          <div class="row items-center">
            <img class="col-auto avatar" :src="user.photoURL" alt="avatar" />
            <p class="col-auto lulo q-px-xs text-black">{{user.nome.substring(0, 15)}}</p>
            <p class="col-auto q-caption text-weight-bold q-px-xs text-black">{{userPontos}}pt</p>
          </div>
        </q-card-title>
      </q-card>
    </div>
    <div class="q-pa-md row flex flex-center">
      <q-card color="white" height="370px" v-show="!quiz">
        <q-card-title>
          <div class="column flex flex-center">
            <p class="lulobold text-black">Fim!</p>
            <q-btn color="positive" label="ver ranking" to="/app/ranking"></q-btn>
          </div>
        </q-card-title>
      </q-card>
      <q-card color="white" style="width: 700px; max-width: 100%" v-show="quiz">
        <q-progress color="positive" :percentage="progress" stripe animate height="15px" />
        <q-card-title>
          <h2 class="lulobold text-black">{{currentPergunta[0].data.pergunta}}</h2>
        </q-card-title>
        <q-card-main style="min-height: 200px">
          <div class="text-center">
            <div class="flex flex-center">
              <div class="column">
                <q-item tag="label">
                  <q-item-side>
                    <q-radio
                      color="amber"
                      v-model="currentPergunta[0].data.check"
                      :val="currentPergunta[0].data.resposta1"
                    />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile
                      class="tile left text-black lulo"
                      label
                    >{{currentPergunta[0].data.resposta1}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio
                      color="amber"
                      v-model="currentPergunta[0].data.check"
                      :val="currentPergunta[0].data.resposta2"
                    />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile
                      class="tile left text-black lulo"
                      label
                    >{{currentPergunta[0].data.resposta2}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio
                      color="amber"
                      v-model="currentPergunta[0].data.check"
                      :val="currentPergunta[0].data.resposta3"
                    />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile
                      class="tile left text-black lulo"
                      label
                    >{{currentPergunta[0].data.resposta3}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio
                      color="amber"
                      v-model="currentPergunta[0].data.check"
                      :val="currentPergunta[0].data.resposta4"
                    />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile
                      class="tile left text-black lulo"
                      label
                    >{{currentPergunta[0].data.resposta4}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </div>
            </div>
          </div>
        </q-card-main>
        <q-card-actions>
          <q-btn
            style="width: 100%"
            class="q-ma-md"
            color="positive"
            @click="salvarResposta(currentPergunta[0])"
            label="Responder"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { executeConfirmAsync, executeAsync } from "../viewHelper.js";

export default {
  name: "PageQuiz",
  meta: { title: "Despertar 2019 - Quiz" },
  data() {
    return {
      quiz: true
    };
  },
  computed: {
    ...mapGetters({
      userRanking: "userRanking",
      ranking: "quiz/ranking",
      currentPergunta: "quiz/currentPergunta",
      listaQuiz: "quiz/listaQuiz",
      index: "quiz/index",
      pontos: "quiz/pontos",
      loading: "loading",
      error: "error",
      user: "currentUser"
    }),
    progress() {
      var index = this.index;
      var pro = (index / 40) * 100;
      return pro;
    },
    userPontos() {
      var ranking = this.ranking;
      var uid = this.user.uid;
      var ref = ranking.filter(c => c.data.uid === uid);
      if (ref.length > 0) {
        return ref[0].data.pontos;
      }
      return 0; //ref[0].data.pontos
    }
  },
  async mounted() {
    this.$q.loading.show()
    await this.$store.dispatch("quiz/watchQuiz")
    await this.$store.dispatch("quiz/loadRanking")
    this.$q.loading.hide()
  },
  methods: {
    async salvarResposta(item) {
      var resposta = item.data.respostacerta;
      var check = item.data.check;
      if (check === resposta) {
        var pontos = this.pontos;
        var pt = pontos + 1;
        this.$store.dispatch("quiz/addPontos", pt);

        console.log("resposta certa");
        this.$q.notify({
          color: "positive",
          icon: "sentiment_satisfied_alt",
          message: "Parabéns! Resposta certa",
          position: "top",
          timeout: 2000
        });
      } else {
        console.log("resposta errada");
        this.$q.notify({
          color: "negative",
          icon: "sentiment_very_dissatisfied",
          message: "Resposta errada",
          position: "top",
          timeout: 2000
        });
      }
      let i = this.index;
      i++;
      if (i < 40) {
        this.$store.dispatch("quiz/addIndex", i);
      } else {
        var user = this.user;
        var id = user.uid;
        const data = {
          nome: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          pontos: this.pontos
        };

        var userRanking = this.userRanking;

        if (userRanking === null) {
          await executeAsync({
            instance: this,
            promiseFn: () => this.$store.dispatch("quiz/addQuiz", { data }),
            messageSuccess: "Fim",
            messageError: "Erro"
          });
        } else {
          var pontos = this.pontos;
          var userPontos = this.userPontos;
          if (pontos > userPontos) {
            await executeAsync({
              instance: this,
              promiseFn: () =>
                this.$store.dispatch("quiz/uploadQuiz", { userRanking, data }),
              messageSuccess: "Fim",
              messageError: "Erro"
            });
          } else {
            console.log("Tente novamente");
          }
        }
        this.$q.notify({
          color: "positive",
          icon: "sentiment_satisfied_alt",
          message: "Parabéns! Vamos ver o resultado?",
          position: "bottom",
          avatar: this.user.photoURL,
          actions: [
            { label: "OK", handler: () => this.$router.push("/app/ranking") }
          ],
          timeout: 30000
        });
        this.$store.dispatch("quiz/addIndex", 0);
        this.quiz = false;
      }
    }
  }
};
</script>