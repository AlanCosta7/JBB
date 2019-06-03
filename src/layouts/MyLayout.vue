<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar color="primary" class="row fixed">
        <q-btn @click="drawer = !drawer" flat round dense icon="menu" class="q-mr-lg" />
        <q-toolbar-title>
          <q-btn flat dense to='/' label="Despertar 2019" class="q-pa-none despertar" />
          <div slot="subtitle" class="rio">Rio de Janeiro/RJ</div>
        </q-toolbar-title>
        <q-btn v-if="btnjbbtv" round size="sm" @click.native="jbbtvclick()" icon="live_tv" class="btntv q-mr-xs" />
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer content-class="bg-neutral" content-style="{color: 'black', padding: '20px', padding-top: '70px'}" 
    side="left" overlay="true"
    behavior="mobile"
    breakpoint="768"
      v-model="drawer">
      <p v-if="currentUser" class="bg-primary text-white q-pa-md"><b>Usuário:</b> {{currentUser.email}}</p>

      <!-- Lista de menu -->
      <template>
        <q-item link @click.native="programa()">
          <q-item-main class="text-no-wrap" label="Home" sublabel="Página principal" />
        </q-item>
        <q-item link @click.native="vip()" v-if="!currentUser">
          <q-item-main class="text-no-wrap" label="VIP" sublabel="Restrito para inscritos" />
        </q-item>
        <q-item link @click.native="aovivo()">
          <q-item-main class="text-no-wrap" label="Feed" sublabel="Leia as novidades" />
        </q-item>
        <q-item link @click.native="inscricao()">
          <q-item-main class="text-no-wrap" label="Inscrição" sublabel="Já fez a sua?" />
        </q-item>
        <q-item link @click.native="comochegar()">
          <q-item-main class="text-no-wrap" label="Como chegar?" sublabel="Pra você não fica perdido" />
        </q-item>
        <q-item link @click.native="checkin()" v-if="currentUser">
            <q-item-main class="text-no-wrap" label="Checkin" sublabel="Registre sua presença" />
          </q-item>
        <q-item link @click.native="eleição()" v-if="currentUser">
            <q-item-main class="text-no-wrap" label="Eleição" sublabel="Escolha seu representante" />
          </q-item>
        <q-item link @click.native="sair()" v-if="currentUser" class="bg-negative text-white">
          <q-item-main class="text-no-wrap" label="Sair" />
        </q-item>
      </template>

    </q-layout-drawer>

    <q-page-container>
      <q-modal v-model="jbbtv" maximized v-if="jbbtv" class="flex flex-center justify-center z-max">
        <q-toolbar color="primary">
          <q-toolbar-title>
            <q-btn flat dense to='/' label="Despertar 2019" class="q-pa-none despertar" />

            <div slot="subtitle" class="rio">Rio de Janeiro/RJ</div>
          </q-toolbar-title>
          <q-btn v-if="btnjbbtv" round size="sm" @click.native="sairtv()" icon="close" class="btntv q-mr-lg" />
          <div class="desktop-only">
            <q-btn color="white" @click="programa()" flat class="btn">Home</q-btn>
            <q-btn color="white" @click="inscricao()" class="btn" flat v-if="!currentUser">inscrição</q-btn>
            <q-btn color="white" @click="checkin()" class="btn" flat v-if="currentUser">Check-in</q-btn>
            <q-btn color="white" @click="comochegar()" flat class="btn">Como Chegar?</q-btn>
          </div>
        </q-toolbar>

        <div style="background: black">
          <div class="q-video">
            <iframe style="height: 500px; width:100%" :src=video frameborder="0" allowfullscreen class="mobile-only"></iframe>
            <iframe style="height: 700px; width:100%" :src=video frameborder="0" allowfullscreen class="desktop-only"></iframe>
          </div>
        </div>
      </q-modal>
      <router-view class="rota"/>
      <q-page-sticky position="bottom-right" :offset="[50, 50]">
      </q-page-sticky>
      <div class="row z-max fixed-bottom mobile-only">
        <q-btn color="primary" @click="programa()" icon="home" v-if="!currentUser" class="btn col"></q-btn>
        <q-btn color="primary" @click="checkin()" class="btn col" v-if="currentUser">Check-in</q-btn>
        <q-btn color="primary" @click="aovivo()" class="btn col-4">Feed</q-btn>
        <q-btn color="primary" @click="eleição()" class="btn col" v-if="currentUser">Eleição</q-btn>
        <q-btn color="primary" @click="comochegar()" icon="room" class="btn col" v-if="!currentUser"></q-btn>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Vuex from 'vuex'

  export default {
    name: 'MyLayout',
    data() {
      return {
        jbbtv: false,
        btnjbbtv: true,
        drawer: false
      }
    },
    computed: {
      ...mapGetters({
        loading: 'loading',
        error: 'error',
        user: 'user',
        currentUser: 'currentUser',
        video: 'video'
      }),
    },
    created() {
      this.$store.dispatch('minhaposicao')
    },
    async mounted() {
      this.loading = true
      await this.$store.dispatch('carregaTimeLine')
      this.loading = false
    },
    methods: {
      vip() {
        this.$router.push('/login')
        this.drawer = false
      },
      eleição() {
        this.$router.push('/votacao')
        this.drawer = false
      },
      inscricao() {
        this.$router.push('/inscricao')
        this.drawer = false
      },
      aovivo() {
        this.$router.push('/feed')
        this.drawer = false
      },
      programa() {
        this.$router.push('/')
        this.drawer = false
      },
      checkin() {
        this.$router.push('/checkin')
        this.drawer = false
      },
      comochegar() {
        this.$router.push('/comochegar')
        this.drawer = false
      },
      jbbtvclick() {
        this.$store.dispatch('assistirVideo')
        this.jbbtv = true
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

</style>