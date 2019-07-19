<template>
  <q-page class="flex flex-center column" id="page-chekin">
    <div class="eleicaoresultado">
      <q-btn label="Atualizar resultado" color="positive" @click="atualizarresultado"></q-btn>
      <q-card>
        <div class="q-ma-md">
          <h5>Norte</h5>
          <div
            v-if="this.resultado"
          >Anne Thayna de Souza Carvalho: {{norte.filter(c => c === 'Anne Thayna de Souza Carvalho').length}}</div>
          <div
            v-if="this.resultado"
          >Bruno César Reis de Oliveira: {{norte.filter(c => c === 'Bruno César Reis de Oliveira').length}}</div>
        </div>
      </q-card>

      <q-card>
        <div class="q-ma-md">
          <h5>Nordeste</h5>
          <div
            v-if="this.resultado"
          >Luciano Rodrigues da Costa: {{nordeste.filter(c => c === 'Luciano Rodrigues da Costa').length}}</div>
          <div
            v-if="this.resultado"
          >Valdevan Lucas: {{nordeste.filter(c => c === 'Valdevan Lucas').length}}</div>
        </div>
      </q-card>

      <q-card>
        <div class="q-ma-md">
          <h5>Sul</h5>
          <div
            v-if="this.resultado"
          >"Sophia de Abreu Silva da Maia": {{sul.filter(c => c === 'Sophia de Abreu Silva da Maia').length}}</div>
        </div>
      </q-card>

      <q-card>
        <div class="q-ma-md">
          <h5>Sudeste</h5>
          <div
            v-if="this.resultado"
          >Nicholas Bie Baptista da Silva: {{sudeste.filter(c => c === 'Nicholas Bie Baptista da Silva').length}}</div>
          <div
            v-if="this.resultado"
          >Peterson do Carmo Costa: {{sudeste.filter(c => c === 'Peterson do Carmo Costa').length}}</div>
          <div
            v-if="this.resultado"
          >Marcos Sabino: {{sudeste.filter(c => c === 'Marcos Sabino').length}}</div>
          <div
            v-if="this.resultado"
          >Isaque Santos de Oliveira: {{sudeste.filter(c => c === 'Isaque  Santos de Oliveira').length}}</div>
          <div
            v-if="this.resultado"
          >Jesse Caetano Domingos: {{sudeste.filter(c => c === 'Jesse Caetano Domingos').length}}</div>
        </div>
      </q-card>

      <q-card>
        <div class="q-ma-md">
          <h5>Centro-Oeste</h5>
          <div
            v-if="this.resultado"
          >Mateus Henrique: {{centro.filter(c => c === 'Mateus Henrique').length}}</div>
        </div>
      </q-card>
    </div>

    <q-btn label="Atualizar" color="positive" @click="atualizar"></q-btn>

    <!--
    <div class="q-ma-md">
      <h5>Quinta-feira - 10h30min - 12h</h5> 
      <div v-if="this.listamap">FÉ NA CIÊNCIA: {{quintap1.filter(c => c === 'FÉ NA CIÊNCIA').length}}</div>
      <div v-if="this.listamap">OCUPANDO OS ESPAÇOS: ENSAIOS SOBRE O PROTAGONISMO DA JUVENTUDE NA POLÍTICA: {{quintap1.filter(c => c === 'OCUPANDO OS ESPAÇOS: ENSAIOS SOBRE O PROTAGONISMO DA JUVENTUDE NA POLÍTICA').length}}</div>
      <div v-if="this.listamap">O AMOR EM MOVIMENTO: {{quintap1.filter(c => c === 'O AMOR EM MOVIMENTO').length}}</div>
      <div v-if="this.listamap">PREPARANDO-SE PARA A JORNADA: CUIDANDO DA MENTE E CORAÇÃO: {{quintap1.filter(c => c === ' PREPARANDO-SE PARA A JORNADA: CUIDANDO DA MENTE E CORAÇÃO').length}}</div>
    </div>
    
    <div class="q-ma-md">
      <h5>Quinta-feira - 13h30min - 15h30min</h5> 
      <div v-if="this.listamap">UNIVERSIDADE: SOLO FÉRTIL PRO EVANGELHO, SIM!: {{quintap2.filter(c => c === 'UNIVERSIDADE: SOLO FÉRTIL PRO EVANGELHO, SIM!').length}}</div>
      <div v-if="this.listamap">VOCÊ NÃO É DE OUTRO MUNDO: {{quintap2.filter(c => c === 'VOCÊ NÃO É DE OUTRO MUNDO: ').length}}</div>
      <div v-if="this.listamap">PERSPECTIVAS BÍBLICAS SOBRE O ABORTO: {{quintap2.filter(c => c === 'PERSPECTIVAS BÍBLICAS SOBRE O ABORTO').length}}</div>
      <div v-if="this.listamap">AUTOCUIDADO DO LÍDER: {{quintap2.filter(c => c === 'AUTOCUIDADO DO LÍDER').length}}</div>
    </div>

    <div class="q-ma-md">
      <h5>Quinta-feira - 15h30min - 17h30min</h5> 
      <div v-if="this.listamap">TRANSCULTURALIDADE E MISSÃO: {{quintap3.filter(c => c === 'TRANSCULTURALIDADE E MISSÃO').length}}</div>
      <div v-if="this.listamap">CUIDANDO DAS NOVAS GERAÇÕES: {{quintap3.filter(c => c === 'CUIDANDO DAS NOVAS GERAÇÕES ').length}}</div>
      <div v-if="this.listamap">FERIDOS PELA IGREJA? O QUE LEVA ALGUÉM A SE DESIGREJAR?: {{quintap3.filter(c => c === 'FERIDOS PELA IGREJA? O QUE LEVA ALGUÉM A SE DESIGREJAR?').length}}</div>
      <div v-if="this.listamap">ARTE, CULTURA E FÉ CRISTÃ: {{quintap3.filter(c => c === 'ARTE, CULTURA E FÉ CRISTÃ').length}}</div>
    </div>-->
    <!-- Sexta-feira -->
    <!--
    <div class="q-ma-md">
      <h5>Sexta-feira - 10h30min - 12h</h5> 
      <div v-if="this.listamap">EVANGELIZAÇÃO OU COLONIZAÇÃO?: {{quintap4.filter(c => c === 'EVANGELIZAÇÃO OU COLONIZAÇÃO?').length}}</div>
      <div v-if="this.listamap">DESCOLONIZANDO O OLHAR: O RACISMO ATINGE A IGREJA?: {{quintap4.filter(c => c === 'DESCOLONIZANDO O OLHAR: O RACISMO ATINGE A IGREJA?').length}}</div>
      <div v-if="this.listamap">A VIDA NÃO ACABA NO CASAMENTO: {{quintap4.filter(c => c === 'A VIDA NÃO ACABA NO CASAMENTO').length}}</div>
      <div v-if="this.listamap">VER E MOLDAR O FUTURO: {{quintap4.filter(c => c === 'VER E MOLDAR O FUTURO').length}}</div>
    </div>
    
    <div class="q-ma-md">
      <h5>Sexta-feira - 13h30min - 15h30min</h5> 
      <div v-if="this.listamap">JUVENTUDE E FINANÇAS, DÁ PRA EQUILIBRAR?: {{quintap5.filter(c => c === 'JUVENTUDE E FINANÇAS, DÁ PRA EQUILIBRAR?').length}}</div>
      <div v-if="this.listamap">CONSTRUINDO UMA PASTORAL PARA A PÓS-MODERNIDADE: {{quintap5.filter(c => c === 'CONSTRUINDO UMA PASTORAL PARA A PÓS-MODERNIDADE').length}}</div>
      <div v-if="this.listamap">NOVAS PERSPECTIVAS SOBRE A MULHER E O REINO DE DEUS: {{quintap5.filter(c => c === 'NOVAS PERSPECTIVAS SOBRE A MULHER E O REINO DE DEUS ').length}}</div>
      <div v-if="this.listamap">SOCIALTON - DEIXANDO UM LEGADO PARA A CIDADE: {{quintap5.filter(c => c === 'SOCIALTON - DEIXANDO UM LEGADO PARA A CIDADE').length}}</div>
    </div>

    <div class="q-ma-md">
      <h5>Sexta-feira - 15h30min - 17h30min</h5> 
      <div v-if="this.listamap">JOVENS QUE ABANDONAM A FÉ: {{quintap4.filter(c => c === 'JOVENS QUE ABANDONAM A FÉ  ').length}}</div>
      <div v-if="this.listamap">MINISTÉRIO DE JUVENTUDES: UM ESPAÇO DE ESPERANÇA: {{quintap6.filter(c => c === 'MINISTÉRIO DE JUVENTUDES: UM ESPAÇO DE ESPERANÇA').length}}</div>
      <div v-if="this.listamap">ORIGEM, SENTIDO E DESTINO: {{quintap6.filter(c => c === 'ORIGEM, SENTIDO E DESTINO').length}}</div>
      <div v-if="this.listamap">SOCIALTON - DEIXANDO UM LEGADO PARA A CIDADE: {{quintap6.filter(c => c === 'SOCIALTON - DEIXANDO UM LEGADO PARA A CIDADE').length}}</div>
    </div> 
    -->
    <!-- Sábado -->
    <!--
    <div class="q-ma-md">
      <h5>Sábado - 10h30min - 12h</h5> 
      <div v-if="this.listamap">EVANGELIZAÇÃO OU COLONIZAÇÃO?: {{quintap7.filter(c => c === 'EU TENHO UMA VOCAÇÃO?').length}}</div>
      <div v-if="this.listamap">TRANSFORMANDO DOR EM CAUSA: {{quintap7.filter(c => c === 'TRANSFORMANDO DOR EM CAUSA').length}}</div>
      <div v-if="this.listamap">O AMOR EM MOVIMENTO: {{quintap7.filter(c => c === 'O AMOR EM MOVIMENTO').length}}</div>
      <div v-if="this.listamap">VER E MOLDAR O FUTURO: {{quintap7.filter(c => c === 'VER E MOLDAR O FUTURO').length}}</div>
    </div>
    
    <div class="q-ma-md">
      <h5>Sábado - 13h30min - 15h30min</h5> 
      <div v-if="this.listamap">JUVENTUDE E FINANÇAS, DÁ PRA EQUILIBRAR?: {{quintap8.filter(c => c === 'JUVENTUDE E FINANÇAS, DÁ PRA EQUILIBRAR?').length}}</div>
      <div v-if="this.listamap">CONSTRUINDO UMA PASTORAL PARA A PÓS-MODERNIDADE: {{quintap8.filter(c => c === 'CONSTRUINDO UMA PASTORAL PARA A PÓS-MODERNIDADE').length}}</div>
      <div v-if="this.listamap">NOVAS PERSPECTIVAS SOBRE A MULHER E O REINO DE DEUS: {{quintap8.filter(c => c === 'NOVAS PERSPECTIVAS SOBRE A MULHER E O REINO DE DEUS ').length}}</div>
      <div v-if="this.listamap">SOCIALTON - DEIXANDO UM LEGADO PARA A CIDADE: {{quintap8.filter(c => c === 'SOCIALTON - DEIXANDO UM LEGADO PARA A CIDADE').length}}</div>
    </div>

    <div class="q-ma-md">
      <h5>Sábado - 15h30min - 17h30min</h5> 
      <div v-if="this.listamap">JOVENS QUE ABANDONAM A FÉ: {{quintap9.filter(c => c === 'JOVENS QUE ABANDONAM A FÉ  ').length}}</div>
      <div v-if="this.listamap">MINISTÉRIO DE JUVENTUDES: UM ESPAÇO DE ESPERANÇA: {{quintap9.filter(c => c === 'MINISTÉRIO DE JUVENTUDES: UM ESPAÇO DE ESPERANÇA').length}}</div>
      <div v-if="this.listamap">ORIGEM, SENTIDO E DESTINO: {{quintap9.filter(c => c === 'ORIGEM, SENTIDO E DESTINO').length}}</div>
      <div v-if="this.listamap">SOCIALTON - DEIXANDO UM LEGADO PARA A CIDADE: {{quintap9.filter(c => c === 'SOCIALTON - DEIXANDO UM LEGADO PARA A CIDADE').length}}</div>
    </div>-->
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { executeConfirmAsync, executeAsync } from "../viewHelper";

export default {
  name: "qrcodepage",
  data() {
    return {
      cpf: ""
    };
  },
  computed: {
    ...mapGetters({
      resultado: "painel/resultado",
      listamap: "painel/listamap",
      ncadastro: "painel/ncadastro",
      loading: "loading",
      error: "error",
      user: "currentUser"
    }),
    norte() {
      var resultado = this.resultado;
      var norte = [];
      for (let i = 0; i < resultado.length; i++) {
        const element = resultado[i][0].data.Norte;
        norte.push(element);
      }
      return norte;
    },
    nordeste() {
      var resultado = this.resultado;
      var nordeste = [];
      for (let i = 0; i < resultado.length; i++) {
        const element = resultado[i][0].data.Nordeste;
        nordeste.push(element);
      }
      return nordeste;
    },
    sul() {
      var resultado = this.resultado;
      var sul = [];
      for (let i = 0; i < resultado.length; i++) {
        const element = resultado[i][0].data.Sul;
        sul.push(element);
      }
      return sul;
    },
    sudeste() {
      var resultado = this.resultado;
      var sudeste = [];
      for (let i = 0; i < resultado.length; i++) {
        const element = resultado[i][0].data.Suldeste;
        sudeste.push(element);
      }
      return sudeste;
    },
    centro() {
      var resultado = this.resultado;
      var centro = [];
      for (let i = 0; i < resultado.length; i++) {
        const element = resultado[i][0].data.Centro;
        centro.push(element);
      }
      return centro;
    },
    quintap1() {
      var listamap = this.listamap;
      var lista = [];
      for (let i = 0; i < listamap.length; i++) {
        const element = listamap[i][0].data.p1[0].data.check;
        lista.push(element);
      }
      return lista;
    },
    quintap2() {
      var listamap = this.listamap;
      var lista = [];
      for (let i = 0; i < listamap.length; i++) {
        const element = listamap[i][0].data.p2[0].data.check;
        lista.push(element);
      }
      return lista;
    },
    quintap3() {
      var listamap = this.listamap;
      var lista = [];
      for (let i = 0; i < listamap.length; i++) {
        const element = listamap[i][0].data.p3[0].data.check;
        lista.push(element);
      }
      return lista;
    },
    quintap4() {
      var listamap = this.listamap;
      var lista = [];
      for (let i = 0; i < listamap.length; i++) {
        const element = listamap[i][0].data.p4[0].data.check;
        lista.push(element);
      }
      return lista;
    },
    quintap5() {
      var listamap = this.listamap;
      var lista = [];
      for (let i = 0; i < listamap.length; i++) {
        const element = listamap[i][0].data.p5[0].data.check;
        lista.push(element);
      }
      return lista;
    },
    quintap6() {
      var listamap = this.listamap;
      var lista = [];
      for (let i = 0; i < listamap.length; i++) {
        const element = listamap[i][0].data.p6[0].data.check;
        lista.push(element);
      }
      return lista;
    },
    quintap7() {
      var listamap = this.listamap;
      var lista = [];
      for (let i = 0; i < listamap.length; i++) {
        const element = listamap[i][0].data.p7[0].data.check;
        lista.push(element);
      }
      return lista;
    },
    quintap8() {
      var listamap = this.listamap;
      var lista = [];
      for (let i = 0; i < listamap.length; i++) {
        const element = listamap[i][0].data.p8[0].data.check;
        lista.push(element);
      }
      return lista;
    },
    quintap9() {
      var listamap = this.listamap;
      var lista = [];
      for (let i = 0; i < listamap.length; i++) {
        const element = listamap[i][0].data.p9[0].data.check;
        lista.push(element);
      }
      return lista;
    }
  },
  async mounted() {
    console.log(this.norte);
  },
  methods: {
    async atualizarresultado() {
      this.$q.loading.show();
      await this.$store.dispatch("painel/resultado");
      this.$q.loading.hide();
    },
    async atualizar() {
      this.$q.loading.show();
      await this.$store.dispatch("painel/loadUid");
      //await this.$store.dispatch("painel/painelJornada")
      this.$q.loading.hide();
    },
    consol() {
      //console.log(this.listamap[0][0].data.p1[0].data.check)

      console.log(
        this.listamap,
        this.listamap[0][0].data.p1[0].data.check,
        this.quintap1titulo1
      );
    },
    async addUID() {
      var listaUid = [
        "Hm6gfb4W88fKGh10cTALqmMys2C2",
        "hAVB05Ti96az4SynbjkuOo8Hz3s2",
        "h2L736QVr0hmglcOD5rR7fahJWe2",
        "zG8sztFv6CYoJxRpW1YR0j2HHYf2",
        "c2pxGy4mkfd1DUPCPrYBJkc65Qm1",
        "p7OXEQPFKyPDVxXYqnPYHgom2SF2",
        "YQSRIQSOqudVezvrrnf1qEk4E0N2",
        "2BgZy8THHuOWTQdDOuAviqaiU192",
        "nEVz0I4XWzNg3QvkFsyxVlpkwbK2",
        "IlZ10EscRBbsmuvEAVaqPvNjUN63",
        "GC80agf5zGZMAyMdVs0SMik23rt2",
        "Mz85yREzOwclI98bzZs3UJOwwzz1",
        "CPptWlFbDZStpTjwMIULUGeexGq1",
        "Uj7V9d3LApTgS8A7DQYQpFtz5c62",
        "7B5l6xpkvGcP8LXBemyfuhcj5Fz2",
        "QcBbjBdpxrZl5sMrDFnGwWrSZHq2",
        "4bnK4kZwG0dYnZfE2Ci9axcF3Na2",
        "I1qz5hUpYFciz7QYWr2vhZWZhv52",
        "jWZm9f9Qw7W8Gt0UZWzkweubgHO2",
        "L24PdVwKT3TEfVXoadFmJ4ykp7I3",
        "lCbCCLjjW2RpKkCMYPIJ6FS1AuK2",
        "ReiWVAqqu4PYxY63ugf3GcykOEA3",
        "1a3bO119ntY4CYE7coO9DXJM3s63",
        "O7bYehSTNTUX0TGfIGqIWPu2zY53",
        "nPCyYsfkbuXB4VdlEWr8xFjyTJF3",
        "E6Jm2yVK3kerSGzOYwRnpfO3hIA3",
        "PqeTY9SXAMSIpipOsIHP0pU5IbT2",
        "SS1FeOpFDXg4pbvXe7iLB0aTR783",
        "AKNEMWp0bxahQ0fAHb9ZGX2tUHh2",
        "gYOS6bqK7bSMMKCK32mqJjRwDz53",
        "qMq5hvdefLNaml4V2M48N7StQj33",
        "j2nGpMx5IMeKym9mFM3rWfwil9F3",
        "H12f5tQhyLgC6WNBZYJP7W4kcKE2",
        "iHhyveTS0rejNULWQgc7G6zudKK2",
        "9M0fa5oNCOVv9ASlOaHqHkshQXY2",
        "UgjB8sCyViVYHiUWGSm46j8JnBM2",
        "ATUkWSbdGeSQL2qx7I4wQN2LN422",
        "aVxFpVqhMRccmJSlmZbosGrBOEY2"
      ];

      for (let i = 0; i < listaUid.length; i++) {
        const element = listaUid[i];

        var data = {
          uid: element
        };

        this.$store.dispatch("painel/salvaUid", { data });
      }
    }
  }
};
</script>

<style>
.eleicaoresultado {
  height: 900px;
}
</style>