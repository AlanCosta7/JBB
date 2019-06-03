<template class="templatehome">
  <q-page id="page-index">
    <q-toolbar color="primary" class="row fixed z-max">
      <q-btn @click="drawer = !drawer" flat round dense icon="menu" class="q-mr-lg"/>
      <q-toolbar-title>
        <q-btn
          flat
          dense
          to="/"
          color="text-white"
          label="Despertar 2019"
          class="q-pa-none despertar"
        />
        <div slot="subtitle" class="rio">Rio de Janeiro/RJ</div>
      </q-toolbar-title>
      <nav class="desktop-only">
        <q-btn flat dense class="q-ma-xs" label="Participações" @click.native="participa"/>
        <q-btn flat dense class="q-ma-xs" label="Valores" @click.native="preco"/>
      </nav>
      <q-btn
        round
        size="sm"
        @click.native="jbbtvclick()"
        icon="live_tv"
        class="btntv q-mr-xs"
      />
    </q-toolbar>
    <q-layout-drawer
      content-class="bg-neutral"
      content-style="{color: 'black', padding: '20px', padding-top: '70px'}"
      side="left"
      overlay="true"
      behavior="mobile"
      breakpoint="768"
      v-model="drawer"
    >
      <p v-if="currentUser" class="bg-primary text-white q-pa-md">
        <b>Usuário:</b>
        {{currentUser.email}}
      </p>

      <!-- Lista de menu -->
      <template>
        <q-item link @click.native="programa()">
          <q-item-main class="text-no-wrap" label="Home" sublabel="Página principal"/>
        </q-item>
        <q-item link @click.native="vip()" v-if="!currentUser">
          <q-item-main class="text-no-wrap" label="VIP" sublabel="Restrito para inscritos"/>
        </q-item>
        <q-item link @click.native="inscricao()">
          <q-item-main class="text-no-wrap" label="Inscrição" sublabel="Já fez a sua?"/>
        </q-item>
        <q-item link @click.native="comochegar()">
          <q-item-main
            class="text-no-wrap"
            label="Como chegar?"
            sublabel="Pra você não fica perdido"
          />
        </q-item>
        <q-item link @click.native="checkin()" v-if="currentUser">
          <q-item-main class="text-no-wrap" label="Checkin" sublabel="Registre sua presença"/>
        </q-item>
        <q-item link @click.native="eleição()" v-if="currentUser">
          <q-item-main class="text-no-wrap" label="Eleição" sublabel="Escolha seu representante"/>
        </q-item>
        <q-item link @click.native="sair()" v-if="currentUser" class="bg-negative text-white">
          <q-item-main class="text-no-wrap" label="Sair"/>
        </q-item>
      </template>
    </q-layout-drawer>
    <div>
      <div class="fundoalfa"></div>
      <div class="paralax flex flex-center">
        <img
          src="~assets/landpage/BIRDS.png"
          class="birds desktop-only"
          alt="imagem de pássaros voando"
        >

        <div class="column base">
          <div class="row inline flex items-baseline flex-center">
            <p class="data1">17</p>
            <p class="data2">a</p>
            <p class="data1">20</p>
            <p class="data2">de</p>
            <p class="data1">julho</p>
          </div>
          <div class="row inline flex items-baseline flex-center">
            <p class="local1">Barra</p>
            <p class="local2">da</p>
            <p class="local1">Tijuca - RJ</p>
          </div>
          <div class="column items-center">
            <img
              src="~assets/landpage/Logo_Despertar2019.png"
              width="320px"
              class="relative-position"
              alt="logo do despertar"
            >
            <p class="fe1 desktop-only">Fé, Esperança e Amor</p>
            <p class="fe2 mobile-only">Fé, Esperança e Amor</p>
            <q-btn
              @click="openedinscri = true"
              label="Inscreva-se"
              size="20px"
              color="orange"
              rounded
              class="desktop-only btnins q-mt-xl text-brown-10"
            ></q-btn>
            <q-btn
              @click="inscricao()"
              label="Inscreva-se"
              size="20px"
              color="orange"
              rounded
              class="mobile-only btnins q-mt-xl text-brown-10"
            ></q-btn>
          </div>
        </div>
      </div>
      <img
        width="100%"
        class="calcada1 desktop-only"
        src="~assets/landpage/ZigZag.png"
        alt="calçada copacabana"
      >

      <div class="column flex flex-center base2 desktop-only">
        <h2 class="text-weight-bold text-white desktop-only h2desperte">Desperte-se</h2>
        <q-btn @click="playvideo()" size="90px" flat round>
          <img width="100%" class="desktop-only" src="~assets/landpage/play.png" alt="botão play">
        </q-btn>
        <h2 class="text-weight-light text-white h2desperte2">Aperte o play!</h2>

        <video autoplay muted loop class="myVideo1">
          <source src="~assets/landpage/novotease.mp4" type="video/mp4">
          <source src="~assets/landpage/novotease.webm" type="video/webm">
        </video>
      </div>
      <div id="preletores"></div>
      <section class="base3 bg-black">
        <div class="container flex flex-center">
          <div class="text-white q-pa-md">
            <h3 class="preletor">Preletores</h3>
          </div>
          <div class="row flex flex-center">
            <div @mouseover="hidden3 = true" @mouseleave="hidden3 = false" class="col-auto">
              <q-card inline class="q-ma-xs classimg">
                <q-card-media overlay-position="bottom">
                  <img width="320" height="320" id="imgDavi">
                  <q-card-title slot="overlay" v-if="hidden3">
                    <div
                      slot="subtitle"
                      class="text-right"
                    >Pastor, escritor, mestre em Teoria do Direito, capelão na Primeira Igreja Batista de SP.</div>
                  </q-card-title>
                </q-card-media>
              </q-card>
            </div>
            <div @mouseover="hidden2 = true" @mouseleave="hidden2 = false" class="col-auto">
              <q-card inline class="q-ma-xs classimg">
                <q-card-media overlay-position="bottom">
                  <img width="320" height="320" id="imgAndreia">
                  <q-card-title slot="overlay" v-if="hidden2">
                    <div slot="subtitle" class="text-right">
                      É co-fundadora e missionária da Missão Avalanche (Vitória/ES) e
                      Presidente do Exodus Brasil.
                    </div>
                  </q-card-title>
                </q-card-media>
              </q-card>
            </div>
            <div @mouseover="hidden1 = true" @mouseleave="hidden1 = false" class="col-auto">
              <q-card inline class="q-ma-xs classimg">
                <q-card-media overlay-position="bottom">
                  <img width="320" height="320" id="imgHenrique">
                  <q-card-title slot="overlay" v-if="hidden1">
                    <div
                      slot="subtitle"
                      class="text-right"
                    >Pastor da SIB em Rondonópolis, teólogo, PHD em teologia nas gringas.</div>
                  </q-card-title>
                </q-card-media>
              </q-card>
            </div>
            <div @mouseover="hidden4 = true" @mouseleave="hidden4 = false" class="col-auto">
              <q-card inline class="q-ma-xs classimg">
                <q-card-media overlay-position="bottom">
                  <img width="320" height="320" id="imgGil">
                  <q-card-title slot="overlay" v-if="hidden4">
                    <div
                      slot="subtitle"
                      class="text-right"
                    >Foi Executiva da JBB por 9 anos e hoje é Ministra de Juventude da PIB em Vitória.</div>
                  </q-card-title>
                </q-card-media>
              </q-card>
            </div>

            <div class="text-white q-pa-xl">
              <h3 class="preletor">Participação Musical</h3>
            </div>
            <div class="row flex flex-center">
              <div @mouseover="hidden6 = true" @mouseleave="hidden6 = false" class="col-auto">
                <q-card inline class="q-ma-xs classimg">
                  <q-card-media overlay-position="bottom">
                    <img width="320" height="320" id="imgPc">
                    <q-card-title slot="overlay" v-if="hidden6">
                      <div
                        slot="subtitle"
                        class="text-right"
                      >Com bastante carisma, uma bela voz e muita sensibilidade, PC Baruk traz versatilidade, poesia, interpretações mergulhadas em sentimento, baladas inspiradoras e som contagiante.</div>
                    </q-card-title>
                  </q-card-media>
                </q-card>
              </div>
              <div @mouseover="hidden7 = true" @mouseleave="hidden7 = false" class="col-auto">
                <q-card inline class="q-ma-xs classimg">
                  <q-card-media overlay-position="bottom">
                    <img width="320" height="320" id="imgSola">
                    <q-card-title slot="overlay" v-if="hidden7">
                      <div
                        slot="subtitle"
                        class="text-right"
                      >O Sola é o encontro de dois Guilhermes, apaixonados por música boa, que glorifica a Cristo e edifica a igreja.</div>
                    </q-card-title>
                  </q-card-media>
                </q-card>
              </div>
              <div @mouseover="hidden8 = true" @mouseleave="hidden8 = false" class="col-auto">
                <q-card inline class="q-ma-xs classimg">
                  <q-card-media overlay-position="bottom">
                    <img width="320" height="320" id="imgSolk">
                    <q-card-title slot="overlay" v-if="hidden8">
                      <div slot="subtitle" class="text-right">
                        A Banda SOLK é um projeto que nasceu para dar uma nova cara a clássicos da música cristã.
                        O nome vem da junção ‘Soul + Folk’,
                      </div>
                    </q-card-title>
                  </q-card-media>
                </q-card>
              </div>
              <div @mouseover="hidden5 = true" @mouseleave="hidden5 = false" class="col-auto">
                <q-card inline class="q-ma-xs classimg">
                  <q-card-media overlay-position="bottom">
                    <img width="320" height="320" id="imgBeone">
                    <q-card-title slot="overlay" v-if="hidden5">
                      <div
                        slot="subtitle"
                        class="text-right"
                      >Ministerio de Louvor de Jovens da Igreja Batista Atitude Central da Barra.</div>
                    </q-card-title>
                  </q-card-media>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="preco"></div>
      <div class="column flex flex-center paralax2 desktop-only">
        <div class="bgcolum column flex flex-center">
          <h4
            class="text-weight-bold uppercase text-white texto1"
          >Qual despertar você pretende adquirir?</h4>
          <br>
          <br>

          <h4 class="text-weight-bold uppercase text-white texto1">Despertar social - R$98,00</h4>
          <p class="text-weight-light uppercase text-white texto2">
            Se você estiver passando por um momento de
            instabilidade financeira, e está com dificuldades de pagar o valor integral
            da inscrição, separamos essa opção pra você. Mas se liga hein?! Outras pessoas irão abençoar sua ida ;)
          </p>
          <h4 class="text-weight-bold uppercase text-white texto1">DESPERTAR CONSCIENTE - R$138,00</h4>
          <p class="text-weight-light uppercase text-white texto2">
            Esse é o valor "normal" do ingresso. Nos dá agilidade
            e faz a gente "fechar a conta" mais cedo.
          </p>
          <h4 class="text-weight-bold uppercase text-white texto1">DESPERTAR SOLIDÁRIO - R$178,00</h4>
          <p class="text-weight-light uppercase text-white texto2">
            Esse é pra galera que quer, e está em condições de
            ajudar a galera que está participando pelo Despertar Social,
            e aqueles que estão vindo de regiões mais distantes e possuem outros custos adicionais. Deus ama a quem dá
            com
            alegria, e queremos dar essa oportunidade pra você.
          </p>
          <q-btn
            @click="openedinscri = true"
            label="Inscreva-se"
            size="20px"
            color="brown-10"
            rounded
            class="desktop-only btnins q-px-lg text-orange q-mb-xl"
          ></q-btn>
          <q-btn
            @click="inscricao()"
            label="Inscreva-se"
            size="20px"
            color="brown-10"
            rounded
            class="mobile-only btnins q-px-lg text-orange q-mb-xl"
          ></q-btn>
        </div>

        <img
          src="~assets/landpage/Maracana.png"
          class="maracana desktop-only"
          width="50%"
          alt="Maracana"
        >
        <img
          src="~assets/landpage/Niteroi.png"
          class="niteroi desktop-only"
          width="50%"
          alt="niteroi"
        >
        <img
          src="~assets/landpage/Bondinho.png"
          class="bondinho desktop-only"
          width="50%"
          alt="bondinho"
        >
      </div>
      <div class="column flex flex-center paralax3 mobile-only">
        <div class="bgcolum2 items-center">
          <h4
            class="text-weight-bold uppercase text-white texto1"
          >Qual despertar você pretende adquirir?</h4>

          <h4 class="text-weight-bold uppercase text-white texto1">Despertar social - R$98,00</h4>
          <p class="text-weight-light uppercase text-white texto2">
            Se você estiver passando por um momento de
            instabilidade financeira, e está com dificuldades de pagar o valor integral
            da inscrição, separamos essa opção pra você. Mas se liga hein?! Outras pessoas irão abençoar sua ida ;)
          </p>
          <h4 class="text-weight-bold uppercase text-white texto1">DESPERTAR CONSCIENTE - R$138,00</h4>
          <p class="text-weight-light uppercase text-white texto2">
            Esse é o valor "normal" do ingresso. Nos dá agilidade
            e faz a gente "fechar a conta" mais cedo.
          </p>
          <h4 class="text-weight-bold uppercase text-white texto1">DESPERTAR SOLIDÁRIO - R$178,00</h4>
          <p class="text-weight-light uppercase text-white texto2">
            Esse é pra galera que quer, e está em condições de
            ajudar a galera que está participando pelo Despertar Social,
            e aqueles que estão vindo de regiões mais distantes e possuem outros custos adicionais. Deus ama a quem dá
            com
            alegria, e queremos dar essa oportunidade pra você.
          </p>
          <q-btn
            @click="inscricao()"
            label="Inscreva-se"
            size="20px"
            color="brown-10"
            rounded
            class="btnins q-px-lg text-orange q-mb-xl"
          ></q-btn>
        </div>

        <img
          src="~assets/landpage/Maracana.png"
          class="maracana desktop-only"
          width="50%"
          alt="maracana"
        >
        <img
          src="~assets/landpage/Niteroi.png"
          class="niteroi desktop-only"
          width="50%"
          alt="niteroi"
        >
        <img
          src="~assets/landpage/Bondinho.png"
          class="bondinho desktop-only"
          width="50%"
          alt="bondinho"
        >
      </div>
    </div>

    <!-- Modal Video Teaser -->
    <q-modal v-model="opened" class="z-max desktop-only" maximized>
      <q-btn
        v-if="opened"
        round
        size="md"
        @click.native="opened = false"
        icon="close"
        color="negative"
        style="right: 48%; top: 18px"
        class="z-max fixed q-mr-lg"
      />
      <iframe width="100%" height="100%" :src="video" class="videoteaser" frameborder="0"></iframe>
    </q-modal>

    <!-- Modal Inscrição Desktop-->
    <q-modal v-model="openedinscri" class="z-max desktop-only">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Inscrição</q-toolbar-title>
        </q-toolbar>
        <iframe
          width="850px"
          height="750px"
          id="inscricao"
          src="https://www.pallua.com.br/captacao/projeto/evento_despertar_2019"
        ></iframe>
      </q-modal-layout>
    </q-modal>

     <!-- Modal Inscrição Mobile-->
    <q-modal v-model="openedinscri" class="z-max mobile-only">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Inscrição</q-toolbar-title>
        </q-toolbar>
        <iframe
          width="100%"
          height="90%"
          id="inscricao"
          src="https://www.pallua.com.br/captacao/projeto/evento_despertar_2019"
        ></iframe>
        <q-btn color="negative" label="Cancelar" @click="openedinscri = false"></q-btn>
      </q-modal-layout>
    </q-modal>

    <!-- Modal Maps Desktop-->
    <q-modal v-model="openedmap" class="z-max desktop-only">
      <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1ALnS8JLUtWxOfq5C8E2m15NY-RhCquBt"
        width="850px"
        height="750px"
      ></iframe>
    </q-modal>

    <!-- Modal Maps Mobile-->
    <q-modal v-model="openedmap" class="z-max mobile-only">
      <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1ALnS8JLUtWxOfq5C8E2m15NY-RhCquBt"
        width="100%"
        height="90%"
      ></iframe>
      <q-btn color="negative" label="Cancelar" @click="openedmap = false"></q-btn>
    </q-modal>

    <div class="footer bg-white">
      <!-- footer content -->
      <BaseSocial/>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import Vuex from "vuex";
import BaseSocial from "components/layout/base-social.vue";
import { scroll } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: "PageIndex",
  components: { BaseSocial },
  data() {
    return {
      jbbtv: false,
      drawer: false,
      opened: false,
      openedinscri: false,
      openedmap: false,
      hidden1: false,
      hidden2: false,
      hidden3: false,
      hidden4: false,
      hidden5: false,
      hidden6: false,
      hidden7: false,
      hidden8: false
    };
  },
  computed: {
    ...mapGetters({
      loading: "loading",
      error: "error",
      user: "user",
      currentUser: "currentUser",
      inscrito: "null",
      video: "video"
    })
  },
  methods: {
    preco() {
      const ele = document.getElementById("preco"); // You need to get your element here
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop - ele.scrollHeight;
      const duration = 1000;
      setScrollPosition(target, offset, duration);
    },
    participa() {
      const ele = document.getElementById("preletores"); // You need to get your element here
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop - ele.scrollHeight;
      const duration = 1000;
      setScrollPosition(target, offset, duration);
    },
    principal() {
      this.$router.push("/programacao");
    },
    playvideo() {
      this.$store.dispatch("assistirVideoPromo");
      this.opened = true;
    },
    inscricao() {
      this.openedinscri = true;
    },
    vip() {
      this.$router.push("/login");
      this.drawer = false;
    },
    comochegar() {
      this.openedmap = true;
    },
    jbbtvclick() {
      this.$store.dispatch('assistirVideo')
      this.opened = true
    },
  }
};
</script>

<style>
.btntv {
  background-image: linear-gradient(red, yellow);
  color: white;
}

.btntv2 {
  background-image: linear-gradient(red, yellow);
  color: white;
}

.rio {
  font-family: lulo;
  font-size: 0.75em;
}

.despertar {
  font-family: lulobold;
  font-size: 0.75em;
}

.btnmenu {
  font-family: lulobold;
  font-size: 0.75em;
}
.rota {
  padding-top: 50px;
}

.center {
  position: absolute;
  left: 45%;
  margin-top: 10px;
  z-index: 1;
}

.iframe {
  z-index: 0;
  margin-top: 60px;
}
</style>