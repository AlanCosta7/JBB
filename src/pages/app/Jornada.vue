<template>
  <q-page class="bg-tertiary">
    <div class="q-pa-md row flex flex-center">
      <q-carousel v-model="slide" color="amber" arrows height="550px">
        <q-carousel-slide class="flex flex-center bg-tertiary" v-for="(item) in jornada" :key="item.id">
          <div class="text-center">
            <div class="flex flex-center">
              <div class="column">
                <h3>{{item[0].data.dia}}</h3>
                <p>{{item[0].data.horario}}</p>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="option" :val="item[0].data.titulo1" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile text-amber" label>{{item[0].data.titulo1}}</q-item-tile>
                    <q-item-tile class="tile text-white" sublabel>{{item[0].data.convidado1}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="option" :val="item[0].data.titulo2" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile text-amber" label>{{item[0].data.titulo2}}</q-item-tile>
                    <q-item-tile class="tile text-white" sublabel>{{item[0].data.convidado2}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="option" :val="item[0].data.titulo3" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile text-amber" label>{{item[0].data.titulo3}}</q-item-tile>
                    <q-item-tile class="tile text-white" sublabel>{{item[0].data.convidado3}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio color="amber" v-model="option" :val="item[0].data.titulo4" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile text-amber" label>{{item[0].data.titulo4}}</q-item-tile>
                    <q-item-tile class="tile text-white" sublabel>{{item[0].data.convidado4}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-btn color="positive" @click="salvarJornada(option, item)" label="Salvar"></q-btn>
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

export default {
  name: "iniciopage",
  data() {
    return {
      slide: 0,
      option: null
    };
  },
  computed: {
    ...mapGetters({
      jornada: "jornada/jornada",
      listaMaps: "jornada/listaMaps",
      loading: "loading",
      error: "error",
      user: "currentUser"
    }),
  },
  async mounted() {
    await this.$store.dispatch('jornada/watchJornada')
    await this.$store.dispatch('jornada/loadMaps')
  },
  methods: {
    salvarJornada(option, item) {
      var itemId = item[0].id
      var listaMaps = this.listaMaps
      var idBoleano
      for (let i = 0; i < listaMaps.length; i++) {
        var element = listaMaps[i].data.id
        idBoleano.push(element)
      }

      console.log(idBoleano)
      var id = itemId in idBoleano

      if (id === false) {
        const data = {
        titulo: option,
        id: itemId
      }
      //console.log(item[0].id)
      //this.$store.dispatch('jornada/salvaJornada', {data})
      } else {
      console.log('já foi add')

      }

      
    }
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
  width: 50px;
  height: 50px;
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

.tile {
  font-size: 0.75em
}
</style>