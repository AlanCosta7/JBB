<template>
  <q-page class="bg-tertiary" id="page-jornada">
        <div class="text-right" style="width:99%">
          <q-btn :icon-right="openedJornada ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" @click="openToolDescription()" label="Programação" flat color="white" class="relative-position"></q-btn>
        </div>
    <q-slide-transition>
      <div class="q-ma-md q-pa-md bg-orange" v-show="openedJornada">
            <div class="text-center">
              <div class="row q-pa-md">
                
                <div class="col-lg-3 col-xs-12 column">
                  <p class="lulobold text-white bg-primary">Quarta-feira</p>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">9h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Inscrições e check-in</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">17h30min - 19h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Tardezinhas</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">19h15min - 21h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Culto de abertura</q-item-tile>
                    </q-item-main>
                  </q-item>
                </div>
                <div class="col-lg-3 col-xs-12 column">
                  <p class="lulobold text-white bg-primary">{{listaMaps[0].data.p1[0].data.dia}}</p>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">8h30min - 9h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Oração</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">9h - 10h30min</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Celebração</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">{{listaMaps[0].data.p1[0].data.horario}}</p>
                      <q-item-tile class="tile left text-amber-4 q-body-1" label>Jornada de conteúdo</q-item-tile>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>{{listaMaps[0].data.p1[0].data.check}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">12h - 13h30min</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Almoço</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">{{listaMaps[0].data.p2[0].data.horario}}</p>
                      <q-item-tile class="tile left text-amber-4 q-body-1" label>Jornada de conteúdo</q-item-tile>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>{{listaMaps[0].data.p2[0].data.check}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">{{listaMaps[0].data.p3[0].data.horario}}</p>
                      <q-item-tile class="tile left text-amber-4 q-body-1" label>Jornada de conteúdo</q-item-tile>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>{{listaMaps[0].data.p3[0].data.check}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">17h30min - 19h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Tardezinhas</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">19h15min - 21h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Celebração</q-item-tile>
                    </q-item-main>
                  </q-item>
                </div>
                <div class="col-lg-3 col-xs-12 column">
                  <p class="lulobold text-white bg-primary">{{listaMaps[0].data.p4[0].data.dia}}</p>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">8h30min - 9h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Oração</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">9h - 10h30min</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Celebração</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">{{listaMaps[0].data.p4[0].data.horario}}</p>
                      <q-item-tile class="tile left text-amber-4 q-body-1" label>Jornada de conteúdo</q-item-tile>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>{{listaMaps[0].data.p4[0].data.check}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">12h - 13h30min</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Almoço</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">{{listaMaps[0].data.p5[0].data.horario}}</p>
                      <q-item-tile class="tile left text-amber-4 q-body-1" label>Jornada de conteúdo</q-item-tile>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>{{listaMaps[0].data.p5[0].data.check}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">{{listaMaps[0].data.p6[0].data.horario}}</p>
                      <q-item-tile class="tile left text-amber-4 q-body-1" label>Jornada de conteúdo</q-item-tile>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>{{listaMaps[0].data.p6[0].data.check}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">17h30min - 19h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Tardezinhas</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">19h15min - 21h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Celebração</q-item-tile>
                    </q-item-main>
                  </q-item>
                </div>
                <div class="col-lg-3 col-xs-12 column">
                  <p class="lulobold text-white bg-primary">{{listaMaps[0].data.p7[0].data.dia}}</p>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">8h30min - 9h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Oração</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">9h - 10h30min</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Celebração</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">{{listaMaps[0].data.p7[0].data.horario}}</p>
                      <q-item-tile class="tile left text-amber-4 q-body-1" label>Jornada de conteúdo</q-item-tile>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>{{listaMaps[0].data.p7[0].data.check}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">12h - 13h30min</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Almoço</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">{{listaMaps[0].data.p8[0].data.horario}}</p>
                      <q-item-tile class="tile left text-amber-4 q-body-1" label>Jornada de conteúdo</q-item-tile>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>{{listaMaps[0].data.p8[0].data.check}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">{{listaMaps[0].data.p9[0].data.horario}}</p>
                      <q-item-tile class="tile left text-amber-4 q-body-1" label>Jornada de conteúdo</q-item-tile>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>{{listaMaps[0].data.p9[0].data.check}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">17h30min - 19h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Tardezinhas</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">19h15min - 21h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Celebração</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item tag="label">
                    <q-item-main>
                      <p class="text-primary q-caption">23h</p>
                      <q-item-tile class="tile left text-white lulo q-body-1" label>Lual</q-item-tile>
                    </q-item-main>
                  </q-item>
                </div>
              </div>
            </div>
      </div>
    </q-slide-transition>
    <div class="q-pa-md row flex flex-center">
      <p class="lulo">Monte aqui sua jornada de conteúdo</p>
      <q-carousel v-model="slide" color="amber" arrows height="470px">
        <q-carousel-slide class="bg-tertiary" v-for="item in listaMaps[0].data" :key="item.id">
          <div class="text-center">
            <div class="flex flex-center">
              <div class="column">
                <h3 class="lulobold">{{item[0].data.dia}}</h3>
                <p class="lulo text-white sizehorario">{{item[0].data.horario}}</p>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio
                      color="amber"
                      v-model="item[0].data.check"
                      :val="item[0].data.titulo1"
                    />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-white lulo" label>{{item[0].data.titulo1}}</q-item-tile>
                    <q-item-tile class="tile left text-amber" sublabel>{{item[0].data.convidado1}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio
                      color="amber"
                      v-model="item[0].data.check"
                      :val="item[0].data.titulo2"
                    />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-white lulo" label>{{item[0].data.titulo2}}</q-item-tile>
                    <q-item-tile class="tile left text-amber" sublabel>{{item[0].data.convidado2}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio
                      color="amber"
                      v-model="item[0].data.check"
                      :val="item[0].data.titulo3"
                    />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-white lulo" label>{{item[0].data.titulo3}}</q-item-tile>
                    <q-item-tile class="tile left text-amber" sublabel>{{item[0].data.convidado3}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label" v-if="item[0].data.titulo4">
                  <q-item-side>
                    <q-radio
                      color="amber"
                      v-model="item[0].data.check"
                      :val="item[0].data.titulo4"
                    />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-white lulo" label>{{item[0].data.titulo4}}</q-item-tile>
                    <q-item-tile class="tile left text-amber" sublabel>{{item[0].data.convidado4}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio
                      color="amber"
                      v-model="item[0].data.check"
                      :val="item[0].data.titulo5"
                    />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-white lulo" label>{{item[0].data.titulo5}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                    <q-radio
                      color="amber"
                      v-model="item[0].data.check"
                      :val="item[0].data.titulo6"
                    />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile class="tile left text-white lulo" label>{{item[0].data.titulo6}}</q-item-tile>
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
import { truncate } from "fs";
import { executeConfirmAsync, executeAsync } from "../viewHelper.js";

export default {
  name: "iniciopage",
  data() {
    return {
      slide: 0,
      listaBloq: [],
      openedJornada: true
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
    this.$q.loading.show();
    await this.$store.dispatch("jornada/loadMaps");
    this.$q.loading.hide();
    console.log(this.listaMaps);
  },
  methods: {
    openToolDescription() {
      this.openedJornada =  !this.openedJornada
    },
    async salvarJornada() {
      var lista = this.listaMaps;
      var listaMaps = lista[0].data;
      var data = {
        p1: listaMaps.p1,
        p2: listaMaps.p2,
        p3: listaMaps.p3,
        p4: listaMaps.p4,
        p5: listaMaps.p5,
        p6: listaMaps.p6,
        p7: listaMaps.p7,
        p8: listaMaps.p8,
        p9: listaMaps.p9
      };

      var id = lista[0].id;
      await executeAsync({
        instance: this,
        promiseFn: () =>
          this.$store.dispatch("jornada/salvaJornada", { id, data }),
        messageSuccess: "Jornada cadastrada",
        messageError: "Erro ao cadastrar jornada"
      });
    }
  }
};
</script>
