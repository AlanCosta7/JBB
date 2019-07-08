<template>
  <q-page class="bg-tertiary">
    <div class="q-pa-md column flex flex-center">
        <div><h3 class="lulobold text-white">Ranking</h3></div>
      <q-card color="white" height="370px" v-for="item in ranking" :key="item.id">
        <q-card-title>
          <div class="row inline">
            <img class="col-auto avatar" :src="item.data.photoURL" alt="avatar" />
            <p class="col-auto lulo q-pa-xs flex flex-center text-black">{{item.data.nome}}</p>
            <p class="col-auto q-pa-xs text-black flex flex-center">{{item.data.pontos}}pt</p>
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
    console.log(this.ranking)
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
  color: black;
}

.widthlulo {
  width: 60%;
  font-size: 1.25em;
  color: black;
}

.btntv3 {
  background-image: linear-gradient(red, yellow);
  border-radius: 100%;
  width: 80px;
  height: 80px;
}

.tv {
  font-size: 3em;
  text-align: center;
}

.tile {
  font-size: 0.75em;
}

.sizehorario {
  font-size: 0.65em;
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