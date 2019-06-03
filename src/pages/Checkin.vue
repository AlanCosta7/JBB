<template>
  <q-page class="flex flex-center column">
    <div class="bg-secondary absolute-top items-center q-pt-xl column" style="height: 300px">
      <template v-if="user.photoURL">
        <img class="avatar" :src="user.photoURL" id="photoURL">
      </template>
      <p class="q-mt-xl"><b>{{user.email}}</b></p>
    </div>
    <q-card class="bg-white flex flex-center z-top" style="height: 200px; width: 200px">
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
        size: 300
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
</style>