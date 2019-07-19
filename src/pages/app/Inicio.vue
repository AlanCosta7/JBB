<template>
  <q-page class="bg-tertiary" id="page-inicio">
    <div class="q-pa-md row flex items-center">
      <q-carousel v-model="slide" color="amber" arrows height="500px">
        <q-carousel-slide class="flex flex-center bg-tertiary">
          <div class="text-center">
            <div class="column flex flex-center">
              <div v-if="user.photoURL">
                <img class="avatar" :src="user.photoURL" id="photoURL" />
              </div>
              <h6 class="q-mt-xl text-white lulo">Olá! {{user.nome}}</h6>
              <p class="q-mt-xl text-white lulo">CPF: {{currentCadastrado}}</p>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide class="flex flex-center bg-tertiary">
          <div class="text-center">
            <div class="column flex flex-center">
              <img
                width="120"
                src="~assets/landpage/Logo_Despertar2019.png"
                alt="imagem"
                aria-hidden="true"
              />
              <p class="q-ma-xl text-white widthlulo text-weight-thin">
                O
                <b>Despertar</b> começou e você já faz parte dessa história.
                Preparamos tudo com muito carinho para você viver uma experiência marcante com a gente.
              </p>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide class="flex flex-center bg-tertiary">
          <div class="text-center">
            <div class="column flex flex-center">
              <div class="btntv3 q-mr-xs flex flex-center">
                <q-icon color="white" class="tv" name="live_tv"></q-icon>
              </div>
              <p class="q-ma-xl text-white widthlulo text-weight-thin">
                Aqui você terá acesso as plenárias que serão transmitidas
                <b>ao vivo</b>.
                Basta dar um click nesse botão bem ali no topo, no cantinho direito.
              </p>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide class="flex flex-center bg-tertiary">
          <div class="text-center">
            <div class="column flex flex-center">
              <img width="80" src="~assets/landpage/jornada2.png" alt="imagem" aria-hidden="true" />
              <p class="q-ma-xl text-white widthlulo text-weight-thin">
                Durante a
                <b>Jornada de Conteúdo</b> você poderá registrar sua presença,
                enviar na hora comentários, feedback e mapear toda a sua experiência no Despertar
              </p>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide class="flex flex-center bg-tertiary">
          <div class="text-center">
            <div class="column flex flex-center">
              <h2 class="text-white text-weight-thin q-ma-xl">Vamos começar!</h2>
              <q-btn color="positive" label="Iniciar" @click="iniciar()"></q-btn>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-control
          slot="control-progress"
          slot-scope="carousel"
          position="bottom"
          :offset="[50, 10]"
        >
          <q-progress :percentage="carousel.percentage" stripe color="amber" />
        </q-carousel-control>
      </q-carousel>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "iniciopage",
  data() {
    return {
      slide: 0
    };
  },
  computed: {
    ...mapGetters({
      currentCadastrado: "currentCadastrado",
      inscrito: "inscrito",
      jornada: "jornada/jornada",
      listaMaps: "jornada/listaMaps",
      loading: "loading",
      error: "error",
      user: "currentUser"
    })
  },
  async mounted() {
    this.$q.loading.show();
    await this.$store.dispatch("jornada/watchJornada")
    await this.$store.dispatch("jornada/loadMaps")
    await this.$store.dispatch("eleicao/loadVoto")
    this.$q.loading.hide();

    if (this.listaMaps == true) {
      const rediretDelay = 2000;
      this.redirectToApp(rediretDelay);
      return;
    }
  },
  methods: {
    redirectToApp(redirectDelay) {
      this.$q.loading.show({ delay: 300 });
      setTimeout(() => {
        this.$q.loading.hide();
        this.$router.replace({ name: "jornada" });
      }, redirectDelay);
    },
    iniciar() {
      var jornada = this.jornada;
      var data = {
        p1: jornada[0],
        p2: jornada[1],
        p3: jornada[2],
        p4: jornada[3],
        p5: jornada[4],
        p6: jornada[5],
        p7: jornada[6],
        p8: jornada[7],
        p9: jornada[8]
      };
      if (this.inscrito) {
        if (this.listaMaps.length == 0) {
         console.log('criar jornada', this.listaMaps.length) 

         this.$store.dispatch("jornada/addJornada", { data });
          this.$router.replace({ name: "jornada" });          
        } else{
        console.log('não criar', this.listaMaps.length)
          this.$router.replace({ name: "jornada" });          
        }

      } else {

        this.$q.notify({
          message: "Você não está inscrito. Entre em contato conosco.",
          type: "negative",
          timeout: 1500
        });
      }
    }
  }
};
</script>
