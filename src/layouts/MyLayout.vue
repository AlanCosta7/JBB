<template>
  <q-layout id="page-mylayout">
    <q-layout-header>
      <q-toolbar color="tertiary" class="row fixed">
        <q-btn @click="toggleMenu()" flat round dense icon="menu" class="q-mr-lg" />
        <q-toolbar-title>
          <q-btn flat dense to="/" label="Despertar 2019" class="q-pa-none despertar" />
          <div slot="subtitle" class="rio">Rio de Janeiro/RJ</div>
        </q-toolbar-title>
        <q-btn
          v-if="btnjbbtv"
          round
          size="sm"
          @click.native="jbbtvclick()"
          icon="live_tv"
          class="btntv q-mr-xs"
        />
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer content-class="bg-neutral" side="left" behavior="mobile" ref="menuDrawer">
      <div v-if="currentUser.photoURL" class="bg-primary row q-pa-md full-width flex items-center">
        <img class="avatar" :src="currentUser.photoURL" />
        <p class="text-white q-pl-md q-pt-md">{{currentUser.nome.substring(0, 15)}}</p>
      </div>

      <!-- Lista de menu -->
      <template>
        <q-item link @click.native="inicio()" v-if="currentUser">
          <q-item-main class="text-no-wrap" label="Inicio" sublabel="Boas vindas!" />
        </q-item>
        <q-item link @click.native="vip()" v-if="!currentUser">
          <q-item-main class="text-no-wrap" label="VIP" sublabel="Restrito para inscritos" />
        </q-item>
        <q-item link @click.native="jornada()" v-if="currentUser && inscrito && !listaMapsEx">
          <q-item-main
            class="text-no-wrap"
            label="Jornada"
            sublabel="Programe sua jornada de conteúdo"
          />
        </q-item>
        <q-item link @click.native="inscricao()" v-if="!inscrito">
          <q-item-main class="text-no-wrap" label="Inscrição" sublabel="Já fez a sua?" />
        </q-item>
        <q-item link @click.native="comochegar()">
          <q-item-main
            class="text-no-wrap"
            label="Como chegar?"
            sublabel="Pra você não fica perdido"
          />
        </q-item>
        <q-item link @click.native="checkin()" v-if="currentUser && inscrito">
          <q-item-main class="text-no-wrap" label="Checkin" sublabel="Registre sua presença" />
        </q-item>
        <q-item link @click.native="eleição()" v-if="currentUser && inscrito">
          <q-item-main class="text-no-wrap" label="Eleição" sublabel="Escolha seu representante" />
        </q-item>
        <q-item link @click.native="quiz()" v-if="currentUser && inscrito">
          <q-item-main class="text-no-wrap" label="Quiz JBB" sublabel="Teste seus conhecimentos" />
        </q-item>
        <q-item link @click.native="ranking()" v-if="currentUser && inscrito">
          <q-item-main class="text-no-wrap" label="Ranking" />
        </q-item>
        <q-item link @click.native="sair()" v-if="currentUser" class="bg-negative text-white">
          <q-item-main class="text-no-wrap" label="Sair" />
        </q-item>
      </template>
    </q-layout-drawer>

    <q-page-container>
      <!-- Modal JBB TV -->
    <q-modal v-model="jbbtv" class="z-max" maximized>
      <q-btn
        v-if="jbbtv"
        round
        size="md"
        @click.native="jbbtv = false"
        icon="close"
        color="negative"
        style="right: 48%; top: 18px"
        class="z-max fixed q-mr-lg desktop-only"
      />
      <iframe width="100%" height="90%" :src="video" class="videoteaser" frameborder="0"></iframe>
      
      <q-btn
        v-if="jbbtv"
        round
        size="md"
        @click.native="jbbtv = false"
        icon="close"
        color="negative"
        style="right: 35%; bottom: 12px"
        class="z-max fixed q-mr-lg mobile-only"
      />
    </q-modal>
      <router-view class="rota" />
    </q-page-container>
    <!-- Modal Maps -->
    <q-modal v-model="openedmap">
      <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1ALnS8JLUtWxOfq5C8E2m15NY-RhCquBt"
        class="modelMaps"
      ></iframe>
      <q-btn class="mobile-only" color="negative" label="Cancelar" @click="openedmap = false"></q-btn>
    </q-modal>

    <!-- Modal Inscrição -->
    <q-modal v-model="openedinscri">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Inscrição</q-toolbar-title>
        </q-toolbar>
        <iframe
          class="modelInscricao"
          src="https://www.pallua.com.br/captacao/projeto/evento_despertar_2019"
        ></iframe>
        <q-btn class="mobile-only" color="negative" label="Cancelar" @click="openedinscri = false"></q-btn>
      </q-modal-layout>
    </q-modal>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import Vuex from "vuex";

export default {
  name: "MyLayout",
  data() {
    return {
      openedinscri: false,
      openedmap: false,
      jbbtv: false,
      btnjbbtv: true
    };
  },
  computed: {
    ...mapGetters({
      listaMaps: "jornada/listaMaps",
      startvoto: "eleicao/startvoto",
      inscrito: "inscrito",
      loading: "loading",
      error: "error",
      user: "user",
      currentUser: "currentUser",
      video: "video"
    }),
    listaMapsEx() {
      var listaMaps = this.listaMaps
      var listaMapsEx = listaMaps.length == 0 ? true : false
      return listaMapsEx
    }
  },
  async mounted() {
    this.$q.loading.show();
    await this.$store.dispatch("loadCadastro");
    await this.$store.dispatch("loadCpf");
    await this.$store.dispatch("eleicao/loadVoto");
    this.$q.loading.hide();
  },
  methods: {
    toggleMenu() {
      const $menuDrawer = this.$refs.menuDrawer;
      if ($menuDrawer.showing) {
        $menuDrawer.hide();
      } else {
        $menuDrawer.show();
      }
    },
    participa() {
      const ele = document.getElementById("participa"); // You need to get your element here
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop - ele.scrollHeight;
      const duration = 1000;
      setScrollPosition(target, offset, duration);
    },
    inicio() {
      this.$router.push("/app/inicio");
      const $menuDrawer = this.$refs.menuDrawer;
      $menuDrawer.hide();
    },
    vip() {
      this.$router.push("/login");
      const $menuDrawer = this.$refs.menuDrawer;
      $menuDrawer.hide();
    },
    ranking() {
      this.$router.push("/app/ranking");
      const $menuDrawer = this.$refs.menuDrawer;
      $menuDrawer.hide();
    },
    eleição() {
      var startvoto = this.startvoto;
      if (!startvoto) {
        this.$router.push("/app/votacao");
        const $menuDrawer = this.$refs.menuDrawer;
        $menuDrawer.hide();
      } else {
        const $menuDrawer = this.$refs.menuDrawer;
        $menuDrawer.hide();
        this.$q.notify({
          message: "Seu voto já foi registrado",
          type: "negative",
          timeout: 1500
        });
      }
    },
    inscricao() {
      this.openedinscri = true;
      const $menuDrawer = this.$refs.menuDrawer;
      $menuDrawer.hide();
    },
    jornada() {
      this.$router.push("/app/jornada");
      const $menuDrawer = this.$refs.menuDrawer;
      $menuDrawer.hide();
    },
    checkin() {
      this.$router.push("/app/checkin");
      const $menuDrawer = this.$refs.menuDrawer;
      $menuDrawer.hide();
    },
    quiz() {
      this.$router.push("/app/quiz");
      const $menuDrawer = this.$refs.menuDrawer;
      $menuDrawer.hide();
    },
    comochegar() {
      this.openedmap = true;
      const $menuDrawer = this.$refs.menuDrawer;
      $menuDrawer.hide();
    },
    jbbtvclick() {
      this.jbbtv = true;
      this.$store.dispatch("assistirVideo");
    },
    sairtv() {
      this.jbbtv = false;
    },
    sair() {
      this.$store.dispatch("logout");
      this.drawer = false;
    }
  }
};
</script>

<style>
.modelMaps {
  width: 850px;
  height: 750px;
  max-width: 100%;
  max-height: 90%;
}

.modelInscricao {
  width: 850px;
  height: 750px;
  max-width: 100%;
  max-height: 90%;
}
</style>