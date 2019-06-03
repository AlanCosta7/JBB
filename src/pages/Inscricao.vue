<template>
  <q-page>
    <iframe width=100% id='iframe' :src=inscricao></iframe>
  </q-page>

</template>

<script>
  import { mapGetters } from 'vuex'
  import Vuex from 'vuex'
  import { Loading, QSpinnerFacebook } from 'quasar'

  export default {
    name: 'Inscricao',
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        loading: 'loading',
        error: 'error',
        user: 'currentUser',
        inscricao: 'inscricao',
        video: 'video'
      }),
    },
    methods: {
    },
    mounted() {
      this.$store.dispatch('customLoading')
      var b = window.innerHeight;
      document.getElementById('iframe').style.height = b - 87 + 'px'
      

      document.querySelector('iframe').addEventListener("load", function() {
        Loading.hide()
      })
    },    
  }
</script>