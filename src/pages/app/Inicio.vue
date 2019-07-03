<template>
  <q-page class="bg-tertiary">
    <div class="column q-pa-xs flex flex-center">
      <template v-if="user.photoURL">
        <img class="avatar" :src="user.photoURL" id="photoURL">
      </template>
      <h6 class="q-mt-xl text-white lulo">Olá! {{user.nome}}</h6>

      <q-carousel v-model="slide" color="amber" arrows height="350px">
        <q-carousel-slide class="flex flex-center bg-tertiary">
          <div class="text-center">
            <div class="column flex flex-center">
            <img width="120" src="~assets/landpage/Logo_Despertar2019.png" alt="imagem" aria-hidden="true">
              <p class="q-ma-xl text-white widthlulo text-weight-thin">
                O <b>Despertar</b> começou e você já faz parte dessa história.
                Preparamos tudo com muito carinho para você viver uma experiência marcante com a gente.
              </p>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide class="flex flex-center bg-tertiary">
          <div class="text-center">
            <div class="column flex flex-center">
            <div class="btntv3 q-mr-xs flex flex-center"><q-icon color="white" class="tv" name="live_tv"></q-icon></div>
              <p class="q-ma-xl text-white widthlulo text-weight-thin">
                Aqui você terá acesso as plenárias que serão transmitidas <b>ao vivo</b>.
                Basta dar um click nesse botão bem ali no topo, no cantinho direito. 
              </p>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide class="flex flex-center bg-tertiary">
          <div class="text-center">
            <div class="column flex flex-center">
            <img width="120" src="~assets/landpage/jornada2.png" alt="imagem" aria-hidden="true">
              <p class="q-ma-xl text-white widthlulo text-weight-thin">
                Durante a <b>Jornada de Conteúdo</b> você poderá registrar sua presença,
                enviar na hora comentários, feedback e mapear toda a sua experiência no Despertar
              </p>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide class="flex flex-center bg-tertiary">
          <div class="text-center">
            <div class="column flex flex-center">
              <h2 class="text-white text-weight-thin q-ma-xl">
                Vamos começar!
              </h2>
            <q-btn color="positive" label="Iniciar" to="/app/jornada"></q-btn>
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
      loading: "loading",
      error: "error",
      user: "currentUser"
    })
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
  width: 100px;
  height: 100px;
}

.lulo {
  font-family: lulo;
  text-align: center;
}

.widthlulo {
  width: 60%;
  font-size: 1.25em;
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
</style>