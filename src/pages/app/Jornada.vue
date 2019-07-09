<template>
  <q-page class="bg-tertiary" id="page-jornada">
    <div class="q-pa-md row flex flex-center">
      <q-carousel v-model="slide" color="amber" arrows height="470px">
        <q-carousel-slide class="bg-tertiary" v-for="item in listaMaps[0].data" :key="item.id">
          <div class="text-center">
            <div class="flex flex-center">
              <div class="column">
                <h3 class="lulobold">{{item[0].data.dia}}</h3>
                <p class="lulo text-white sizehorario">{{item[0].data.horario}}</p>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="item[0].data.check" :val="item[0].data.titulo1" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-white  lulo" label>{{item[0].data.titulo1}}</q-item-tile>
                    <q-item-tile class="tile left text-amber" sublabel>{{item[0].data.convidado1}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="item[0].data.check" :val="item[0].data.titulo2" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-white lulo" label>{{item[0].data.titulo2}}</q-item-tile>
                    <q-item-tile class="tile left text-amber" sublabel>{{item[0].data.convidado2}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="item[0].data.check" :val="item[0].data.titulo3" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-white lulo" label>{{item[0].data.titulo3}}</q-item-tile>
                    <q-item-tile class="tile left text-amber" sublabel>{{item[0].data.convidado3}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label" v-if="item[0].data.titulo4">
                  <q-item-side>
                    <q-radio color="amber" v-model="item[0].data.check" :val="item[0].data.titulo4" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-white lulo" label>{{item[0].data.titulo4}}</q-item-tile>
                    <q-item-tile class="tile left text-amber" sublabel>{{item[0].data.convidado4}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-btn color="positive" @click="salvarJornada()" label="Salvar"></q-btn>
              </div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { truncate } from 'fs';
import { executeConfirmAsync, executeAsync } from '../viewHelper.js'

export default {
  name: "iniciopage",
  data() {
    return {
      slide: 0,
      listaBloq: []
    };
  },
  computed: {
    ...mapGetters({
      jornada: "jornada/jornada",
      listaMaps: "jornada/listaMaps",
      loading: "loading",
      error: "error",
      user: "currentUser"
    })
  },
  async mounted() {
    this.$q.loading.show()
    await this.$store.dispatch('jornada/loadMaps')
    this.$q.loading.hide()
    console.log(this.listaMaps)
  },
  methods: {
    async salvarJornada() {
      
      var lista = this.listaMaps
      var listaMaps = lista[0].data
      var data = {
        p1: listaMaps.p4,
        p2: listaMaps.p5,
        p3: listaMaps.p6,
        p4: listaMaps.p1,
        p5: listaMaps.p2,
        p6: listaMaps.p3,
        p7: listaMaps.p7,
        p8: listaMaps.p8,
        p9: listaMaps.p9,
      }
    
    var id = lista[0].id
     await executeAsync({
          instance: this,
          promiseFn: () => this.$store.dispatch('jornada/salvaJornada', {id, data}),
          messageSuccess: 'Jornada cadastrada',
          messageError: 'Erro ao cadastrar jornada'
        })
    }
  }
}
</script>