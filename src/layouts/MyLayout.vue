<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar color="tertiary" class="row fixed">
        <q-btn @click="toggleMenu()" flat round dense icon="menu" class="q-mr-lg" />
        <q-toolbar-title>
          <q-btn flat dense to='/' label="Despertar 2019" class="q-pa-none despertar" />
          <div slot="subtitle" class="rio">Rio de Janeiro/RJ</div>
        </q-toolbar-title>
          <q-btn v-if="btnjbbtv" round size="sm" @click.native="jbbtvclick()" icon="live_tv" class="btntv q-mr-xs" />
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer 
      content-class="bg-neutral" 
      content-style="{color: 'black', padding: '20px', padding-top: '70px'}" 
      side="left" overlay="true"
      behavior="mobile"
      ref="menuDrawer" >
              <div v-if="currentUser.photoURL" class="bg-primary row q-pa-md full-width flex items-center">
                <img class="avatar" :src="currentUser.photoURL" >
                <p class="text-white q-pl-md q-pt-md">{{currentUser.nome}}</p>
              </div>   

      <!-- Lista de menu -->
      <template>
        <q-item link @click.native="inicio()"  v-if="currentUser">
          <q-item-main class="text-no-wrap" label="Inicio" sublabel="Boas vindas!" />
        </q-item>
        <q-item link @click.native="vip()"  v-if="!currentUser">
          <q-item-main class="text-no-wrap" label="VIP" sublabel="Restrito para inscritos" />
        </q-item>
        <q-item link @click.native="jornada()" v-if="currentUser  && inscrito">
          <q-item-main class="text-no-wrap" label="Jornada" sublabel="Programe sua jornada de conteúdo" />
        </q-item>
        <q-item link @click.native="inscricao()"  v-if="!inscrito">
          <q-item-main class="text-no-wrap" label="Inscrição" sublabel="Já fez a sua?" />
        </q-item>
        <q-item link @click.native="comochegar()">
          <q-item-main class="text-no-wrap" label="Como chegar?" sublabel="Pra você não fica perdido" />
        </q-item>
        <q-item link @click.native="checkin()" v-if="currentUser && inscrito">
            <q-item-main class="text-no-wrap" label="Checkin" sublabel="Registre sua presença" />
          </q-item>
        <q-item link @click.native="eleição()" v-if="currentUser && inscrito">
            <q-item-main class="text-no-wrap" label="Eleição" sublabel="Escolha seu representante" />
          </q-item>
        <q-item link @click.native="sair()" v-if="currentUser" class="bg-negative text-white">
          <q-item-main class="text-no-wrap" label="Sair" />
        </q-item>
      </template>

    </q-layout-drawer>

    <q-page-container>
      <q-modal v-model="jbbtv" maximized v-if="jbbtv">
        <div style="background: black" class="">
          <div class="q-video">
            <q-btn v-if="btnjbbtv" round size="md" @click.native="sairtv()" icon="close" class="btntv center z-max" />
            <iframe class="iframe" style="height: 500px; width:100%" :src=video frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </q-modal>
      <router-view class="rota"/>
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
  import { mapGetters } from 'vuex'
  import Vuex from 'vuex'

  export default {
    name: 'MyLayout',
    data() {
      return {
        openedinscri: false,
        openedmap: false,
        jbbtv: false,
        btnjbbtv: true
      }
    },
    computed: {
      ...mapGetters({
        inscrito: 'inscrito',
        loading: 'loading',
        error: 'error',
        user: 'user',
        currentUser: 'currentUser',
        video: 'video',
      }),
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
      participa () {
        const ele = document.getElementById('participa') // You need to get your element here
        const target = getScrollTarget(ele)
        const offset = ele.offsetTop - ele.scrollHeight
        const duration = 1000
        setScrollPosition(target, offset, duration)
      },
      inicio() {
        this.$router.push('/app/inicio')
      const $menuDrawer = this.$refs.menuDrawer;
        $menuDrawer.hide();
      },
      vip() {
        this.$router.push('/login')
      const $menuDrawer = this.$refs.menuDrawer;
        $menuDrawer.hide();
      },
      eleição() {
        this.$router.push('/app/votacao')
      const $menuDrawer = this.$refs.menuDrawer;
        $menuDrawer.hide();
      },
      inscricao() {
        this.openedinscri = true
      const $menuDrawer = this.$refs.menuDrawer;
        $menuDrawer.hide();
      },
      jornada() {
        this.$router.push('/app/jornada')
      const $menuDrawer = this.$refs.menuDrawer;
        $menuDrawer.hide();
      },
      checkin() {
        this.$router.push('/app/checkin')
      const $menuDrawer = this.$refs.menuDrawer;
        $menuDrawer.hide();
      },
      comochegar() {        
      this.openedmap = true;
      const $menuDrawer = this.$refs.menuDrawer;
        $menuDrawer.hide();
      },
      jbbtvclick() {
        this.jbbtv = true
        this.$store.dispatch('assistirVideo')
      },
      sairtv() {
        this.jbbtv = false
      },
      sair() {
        this.$store.dispatch('logout')
        this.drawer = false
      }
    }
  }
</script>

<style>
  .btntv {
    background-image: linear-gradient(red, yellow);
    color: white
  }

  .btntv2 {
    background-image: linear-gradient(red, yellow);
    color: white
  }

  .rio {
    font-family: lulo;
    font-size: .75em
  }

  .despertar {
    font-family: lulobold;
    font-size: .75em
  }

  .btnmenu {
    font-family: lulobold;
    font-size: .75em
  }
  .rota {
    padding-top: 50px;
  }

  .center{
    position: absolute;
    left: 45%;
    margin-top: 10px;
    z-index: 1;
  }

  .iframe{
    z-index: 0;
    margin-top: 60px
  }

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