<template>
  <q-page class="flex flex-center column">
    <div class="bg-tertiary absolute-top items-center divHero column" style="height: 300px">
      <template v-if="user.photoURL">
        <img class="avatar" :src="user.photoURL" id="photoURL">
      </template>
      <p class="q-mt-md"><b>{{user.email}}</b></p>
    </div>
    <q-card class="bg-white flex flex-center zindex" style="height: 200px; width: 200px">
      <qrcode-vue :value="value"></qrcode-vue>
    </q-card>
    <p class="chave">chave: {{user.uid}}</p>
  </q-page>
</template>

<script>
  import QrcodeVue from 'qrcode.vue';
  import { mapGetters } from 'vuex'

  export default {
    name: 'qrcodepage',
    data() {
      return {
        size: 900
      }
    },
    components: {
      QrcodeVue
    },
    computed: {
      ...mapGetters({
        loading: 'loading',
        error: 'error',
        user: 'currentUser',
        value: 'user.uid'
      })
    }
  }
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
  .chave {
    position: absolute;
    bottom: 10%
  }

  .divHero {
    padding-top: 60px
  }

  .zindex{
    z-index: 100;
  }
</style>