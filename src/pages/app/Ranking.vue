<template>
  <q-page class="bg-tertiary" id="page-ranking">
    <div class="q-pa-md column flex flex-center">
        <div><h3 class="lulobold text-white">Ranking</h3></div>
      <q-card color="white" class="cardRank" v-for="item in ranking" :key="item.id">
        <q-card-title>
          <div class="row items-center">
            <img class="col-auto avatar" :src="item.data.photoURL" alt="avatar" />
            <p class="col-auto lulo q-px-xs text-black">{{item.data.nome.substring(0, 15)}}</p>
            <p class="col-auto q-caption text-weight-bold q-px-xs text-black">{{item.data.pontos}}pt</p>
          </div>
        </q-card-title>
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
    return {};
  },
  computed: {
    ...mapGetters({
      pontos: "quiz/pontos",
      ranking: "quiz/ranking",
      loading: "loading",
      error: "error",
      user: "currentUser"
    })
  },
  async mounted() {
    this.$q.loading.show();
    await this.$store.dispatch("quiz/loadRanking");
    this.$q.loading.hide();
  }
};
</script>
