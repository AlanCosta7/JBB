<template>
    <q-page>
      <q-layout>

      </q-layout>
    </q-page>
</template>
      
<script>
import { uid, filter } from 'quasar'
import { $db, $storage } from '../../plugins/firebase'
import { mapGetters } from 'vuex'
import Vuex from 'vuex'

export default {
        name: 'VotarPage',
        data () {
            return {
              
            }
        },
        async mounted() {
            this.$q.loading.show()
            await this.$store.dispatch('eleicao/watchRegiao')
            this.$q.loading.hide()
        },
        methods: {
            
        },
        computed: {
            ...mapGetters({
                regiao: 'eleicao/regiao',
                loading: 'loading',
                error: 'error',
                user: 'currentUser',
            })        }
    }
</script>
      
<style>
    .imgemCard {
      object-fit: cover;
      border-radius: 100%;
      width: 50px;
      height: 50px;
    }
    .nome {
        padding-left: 4%
    }
    .btn {
    width: 100%;
    }
    .btns {
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 40px;
    }

</style>
      