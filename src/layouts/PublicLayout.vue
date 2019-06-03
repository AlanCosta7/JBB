<template>
  <q-layout class="layout-public">
    <q-page-container>
      <router-view />
      <q-inner-loading :visible="loading">
        <q-spinner-gears size="50px" color="teal-4" />
      </q-inner-loading>
    </q-page-container>
  </q-layout>
</template>

<script>
import Vuex from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...Vuex.mapGetters({
      loading: 'loading'
    })
  },
  methods: {}
}
</script>

<style>
/* NAO COLOQUE CSS AQUI */
</style>
