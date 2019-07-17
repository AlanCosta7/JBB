<template>
  <q-page id="page-index">
    <q-toolbar color="primary" class="row fixed z-max">
      <q-btn @click="toggleMenu()" flat round dense icon="menu" class="q-mr-lg" />
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
        <q-btn flat dense class="q-ma-xs" label="Participações" @click.native="participa" />
        <q-btn flat dense class="q-ma-xs" label="programa" @click.native="programa" />
        <q-btn flat dense class="q-ma-xs" label="Hotelaria" @click.native="hotelaria" />
        <q-btn flat dense class="q-ma-xs" label="Valores" @click.native="preco" />
      </nav>
      <q-btn round size="sm" @click.native="jbbtvclick()" icon="live_tv" class="btntv q-mr-xs" />
    </q-toolbar>
    <q-layout-drawer ref="menuDrawer" content-class="bg-neutral z-max" side="left" behavior="mobile">
      <p v-if="currentUser" class="bg-primary text-white q-pa-md">
        <b>Usuário:</b>
        {{currentUser.email}}
      </p>

      <!-- Lista de menu -->
      <template>
        <q-item link @click.native="vip()">
          <q-item-main class="text-no-wrap" label="VIP" sublabel="Restrito para inscritos" />
        </q-item>
        <q-item link @click.native="comochegar()">
          <q-item-main
            class="text-no-wrap"
            label="Como chegar?"
            sublabel="Pra você não fica perdido"
          />
        </q-item>
        <q-item link @click.native="checkin()" v-if="currentUser">
          <q-item-main class="text-no-wrap" label="Checkin" sublabel="Registre sua presença" />
        </q-item>
        <q-item link @click.native="eleição()" v-if="currentUser">
          <q-item-main class="text-no-wrap" label="Eleição" sublabel="Escolha seu representante" />
        </q-item>
        <q-item link @click.native="sair()" v-if="currentUser" class="bg-negative text-white">
          <q-item-main class="text-no-wrap" label="Sair" />
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
        />

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
            />
            <p class="fe1 desktop-only">Fé, Esperança e Amor</p>
            <p class="fe2 mobile-only">Fé, Esperança e Amor</p>
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
      />

      <div class="column flex flex-center base2 desktop-only">
        <h2 class="text-weight-bold text-white desktop-only h2desperte">Desperte-se</h2>
        <q-btn @click="playvideo()" size="90px" flat round>
          <img width="100%" class="desktop-only" src="~assets/landpage/play.png" alt="botão play" />
        </q-btn>
        <h2 class="text-weight-light text-white h2desperte2">Aperte o play!</h2>

        <video autoplay muted loop class="myVideo1">
          <source src="~assets/landpage/novotease.mp4" type="video/mp4" />
          <source src="~assets/landpage/novotease.webm" type="video/webm" />
        </video>
      </div>
      <div id="preletores"></div>

      <!-- Participações -->
      <section class="base4">
        <div class="base44"></div>
        <div class="container">
          <div class="text-white q-pa-md flex flex-center">
            <h3 class="preletor z-top">Preletores</h3>
          </div>
          <div class="row flex flex-center">
            <div @mouseover="hidden3 = true" @mouseleave="hidden3 = false" class="col-auto">
              <q-card inline class="q-ma-xs classimg">
                <q-card-media overlay-position="bottom">
                  <img width="320" height="320" id="imgDavi" />
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
                  <img width="320" height="320" id="imgAndreia" />
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
                  <img width="320" height="320" id="imgHenrique" />
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
                  <img width="320" height="320" id="imgGil" />
                  <q-card-title slot="overlay" v-if="hidden4">
                    <div
                      slot="subtitle"
                      class="text-right"
                    >Foi Executiva da JBB por 9 anos e hoje é Ministra de Juventude da PIB em Vitória.</div>
                  </q-card-title>
                </q-card-media>
              </q-card>
            </div>

            <div class="text-white q-pa-md flex flex-center">
              <h3 class="preletor z-top">Participações Musicais</h3>
            </div>
            <div class="row flex flex-center">
              <div @mouseover="hidden6 = true" @mouseleave="hidden6 = false" class="col-auto">
                <q-card inline class="q-ma-xs classimg">
                  <q-card-media overlay-position="bottom">
                    <img width="320" height="320" id="imgPc" />
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
                    <img width="320" height="320" id="imgSola" />
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
                    <img width="320" height="320" id="imgSolk" />
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
                    <img width="320" height="320" id="imgBeone" />
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

      <div id="programa"></div>

      <!-- Programa -->
      <section class="base4">
        <div class="base55"></div>
        <div class="container">
          <div class="text-white q-pa-md flex flex-center">
            <h3 class="preletor z-top">Programação</h3>
          </div>
          <div class="tabelaprograma q-pa-xs flex flex-center">
            <q-tabs class="shadow-1" animated swipeable color="secondary" align="justify">
              <q-tab default name="quatro" slot="title" label="Quarta-feira" />
              <q-tab name="cinco" slot="title" label="Quinta-feira" />
              <q-tab name="seis" slot="title" label="Sexta-feira" />
              <q-tab name="sete" slot="title" label="Sábado" />

              <q-tab-pane class="text-white q-pa-xs" name="quatro">
                <div class="row">
                  <div class="col-4">
                    <h5>Início</h5>
                  </div>
                  <div class="col-auto">
                    <h5>Programação</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">9h00</div>
                  <div class="col-auto">Inscrições e check-in</div>
                </div>
                <div class="row">
                  <div class="col-4">17h30</div>
                  <div class="col-auto">Tardezinhas</div>
                </div>
                <div class="row">
                  <div class="col-4">19h15</div>
                  <div class="col-auto">Culto de abertura</div>
                </div>
              </q-tab-pane>
              <q-tab-pane class="text-white q-pa-md" name="cinco">
                <div class="row">
                  <div class="col-4">
                    <h5>Início</h5>
                  </div>
                  <div class="col-auto">
                    <h5>Programação</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">8h30</div>
                  <div class="col-auto">Oração</div>
                </div>
                <div class="row">
                  <div class="col-4">9h00</div>
                  <div class="col-auto">Celebração</div>
                </div>
                <div class="row">
                  <div class="col-4">10h30</div>
                  <div class="col-auto">Jornada de Conteúdo</div>
                </div>
                <div class="row">
                  <div class="col-4">12h00</div>
                  <div class="col-auto">Almoço|Arte e cultura</div>
                </div>
                <div class="row">
                  <div class="col-4">13h30</div>
                  <div class="col-auto">Jornada de Conteúdo</div>
                </div>
                <div class="row">
                  <div class="col-4">15h30</div>
                  <div class="col-auto">Jornada de Conteúdo</div>
                </div>
                <div class="row">
                  <div class="col-4">17h30</div>
                  <div class="col-auto">Tardezinhas</div>
                </div>
                <div class="row">
                  <div class="col-4">19h15</div>
                  <div class="col-auto">Celebração</div>
                </div>
              </q-tab-pane>
              <q-tab-pane class="text-white q-pa-md" name="seis">
                <div class="row">
                  <div class="col-4">
                    <h5>Início</h5>
                  </div>
                  <div class="col-auto">
                    <h5>Programação</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">8h30</div>
                  <div class="col-auto">Oração</div>
                </div>
                <div class="row">
                  <div class="col-4">9h00</div>
                  <div class="col-auto">Celebração</div>
                </div>
                <div class="row">
                  <div class="col-4">10h30</div>
                  <div class="col-auto">Jornada de Conteúdo</div>
                </div>
                <div class="row">
                  <div class="col-4">12h00</div>
                  <div class="col-auto">Almoço|Arte e cultura</div>
                </div>
                <div class="row">
                  <div class="col-4">13h30</div>
                  <div class="col-auto">Jornada de Conteúdo</div>
                </div>
                <div class="row">
                  <div class="col-4">15h30</div>
                  <div class="col-auto">Jornada de Conteúdo</div>
                </div>
                <div class="row">
                  <div class="col-4">17h30</div>
                  <div class="col-auto">Tardezinhas</div>
                </div>
                <div class="row">
                  <div class="col-4">19h15</div>
                  <div class="col-auto">Celebração</div>
                </div>
              </q-tab-pane>
              <q-tab-pane class="text-white q-pa-md" name="sete">
                <div class="row">
                  <div class="col-4">
                    <h5>Início</h5>
                  </div>
                  <div class="col-auto">
                    <h5>Programação</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">8h30</div>
                  <div class="col-auto">Oração</div>
                </div>
                <div class="row">
                  <div class="col-4">9h00</div>
                  <div class="col-auto">Celebração</div>
                </div>
                <div class="row">
                  <div class="col-4">10h30</div>
                  <div class="col-auto">Jornada de Conteúdo</div>
                </div>
                <div class="row">
                  <div class="col-4">12h00</div>
                  <div class="col-auto">Almoço|Arte e cultura</div>
                </div>
                <div class="row">
                  <div class="col-4">13h30</div>
                  <div class="col-auto">Jornada de Conteúdo</div>
                </div>
                <div class="row">
                  <div class="col-4">15h30</div>
                  <div class="col-auto">Jornada de Conteúdo</div>
                </div>
                <div class="row">
                  <div class="col-4">17h30</div>
                  <div class="col-auto">Tardezinhas</div>
                </div>
                <div class="row">
                  <div class="col-4">19h15</div>
                  <div class="col-auto">Celebração</div>
                </div>
                <div class="row">
                  <div class="col-4">23h00</div>
                  <div class="col-auto">Lual</div>
                </div>
              </q-tab-pane>
            </q-tabs>
          </div>
        </div>
      </section>

      <!-- Hotalaria -->
      <div id="hotelaria"></div>
      <section class="base3 bg-primary">
        <div class="container flex flex-center">
          <div class="text-white q-pa-md">
            <div class="flex flex-center">
              <div class="text-white">
                <h3 class="preletor">Hotelaria</h3>
              </div>
              <div>
                <h5
                  class="q-px-md flex flex-center lulo"
                >Aqui você encontra as melhores opções para ficar bem acomodado durante o Despertar19.</h5>
                <div class="row">
                  <div class="col-lg-6 col-xs-12 q-pa-lg">
                    <div inline class="bg-white">
                      <div class="flex flex-center">
                        <img width="220px" height="auto" src="~assets/landpage/costaf.png" />
                      </div>
                      <div>
                        <div class="text-black q-pa-lg">
                          Se você procura uma acomodação com privacidade para você e sua família, indicamos a agência costa family que possui vários pacotes de hospedagem. Entre em contato e reserve a sua.
                          <p>WhatsApp: (21) 970359043</p>
                          <p>Telefone Comercial: (21) 31726796</p>
                          <p>e-mail: edivan@costafamily.com.br</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-xs-12 q-pa-lg">
                    <div inline class="bg-white">
                      <div class="flex flex-center">
                        <img width="220px" height="auto" src="~assets/landpage/econ.png" />
                      </div>
                      <div>
                        <div class="text-black q-pa-lg">
                          Se você é do tipo mochileiro e procura uma experiência mais orgânica para estar perto da galera, a JBC está preparando uma excelênte experiência de hospedagem econômica que cabe no seu bolso.
                          <br />
                          <br />
                          <q-btn
                            label="Reserve sua hospedagem"
                            @click="hopedagem()"
                            color="teal"
                            class="q-mt-xl"
                          ></q-btn>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row flex flex-center">
                <div class="line col"></div>
                <div class="circulo q-pa-sm">
                  <q-icon name="add" size="xl"></q-icon>
                </div>
                <div class="line col"></div>
              </div>

              <div class="flex flex-center">
                <q-card class="q-ma-lg q-pa-lg bg-teal">
                  <div class="column flex flex-center">
                    <q-icon name="flight" class="aviao"></q-icon>
                    <h3 class="lulobold">18% de desconto</h3>
                    <p
                      class="lulo"
                    >exclusivo nas passagens aéreas. Entre em contato com a costa family e garanta logo a sua...</p>
                  </div>
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
          <br />
          <br />

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
            class="mobile-only btnins q-px-lg text-orange q-mb-xl"
          ></q-btn>
        </div>

        <img
          src="~assets/landpage/Maracana.png"
          class="maracana desktop-only"
          width="50%"
          alt="Maracana"
        />
        <img
          src="~assets/landpage/Niteroi.png"
          class="niteroi desktop-only"
          width="50%"
          alt="niteroi"
        />
        <img
          src="~assets/landpage/Bondinho.png"
          class="bondinho desktop-only"
          width="50%"
          alt="bondinho"
        />
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
        />
        <img
          src="~assets/landpage/Niteroi.png"
          class="niteroi desktop-only"
          width="50%"
          alt="niteroi"
        />
        <img
          src="~assets/landpage/Bondinho.png"
          class="bondinho desktop-only"
          width="50%"
          alt="bondinho"
        />
      </div>
    </div>

    <!-- Modal Video Teaser -->
    <q-modal v-model="opened" class="z-max" maximized>
      <q-btn
        v-if="opened"
        round
        size="md"
        @click.native="opened = false"
        icon="close"
        color="negative"
        style="right: 48%; top: 18px"
        class="z-max fixed q-mr-lg desktop-only"
      />
      <iframe width="100%" height="90%" :src="video" class="videoteaser" frameborder="0"></iframe>
      
      <q-btn
        v-if="opened"
        round
        size="md"
        @click.native="opened = false"
        icon="close"
        color="negative"
        style="right: 35%; bottom: 18px"
        class="z-max fixed q-mr-lg mobile-only"
      />
    </q-modal>

    <!-- Modal Maps -->
    <q-modal v-model="openedmap">
      <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1ALnS8JLUtWxOfq5C8E2m15NY-RhCquBt"
        class="modelMaps"
      ></iframe>
      <q-btn class="mobile-only" color="negative" label="Cancelar" @click="openedmap = false"></q-btn>
    </q-modal>

    <div class="footer bg-white">
      <!-- footer content -->
      <BaseSocial />
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import Vuex from "vuex";
import BaseSocial from "components/layout/base-social.vue";
import { scroll } from "quasar";
import { openURL } from "quasar";

const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: "PageIndex",
  components: { BaseSocial },
  data() {
    return {
      jbbtv: false,
      opened: false,
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
    toggleMenu() {
      const $menuDrawer = this.$refs.menuDrawer;
      if ($menuDrawer.showing) {
        $menuDrawer.hide();
      } else {
        $menuDrawer.show();
      }
    },
    programa() {
      const ele = document.getElementById("programa"); // You need to get your element here
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop - ele.scrollHeight;
      const duration = 1000;
      setScrollPosition(target, offset, duration);
    },
    hotelaria() {
      const ele = document.getElementById("hotelaria"); // You need to get your element here
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop - ele.scrollHeight;
      const duration = 1000;
      setScrollPosition(target, offset, duration);
    },
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
    vip() {
      this.$router.push("/login");
      this.drawer = false;
    },
    comochegar() {
      this.openedmap = true;
      const $menuDrawer = this.$refs.menuDrawer;
        $menuDrawer.hide();
    },
    jbbtvclick() {
      this.$store.dispatch("assistirVideo");
      this.opened = true;
    },
    hopedagem() {
      openURL(
        "https://www.e-inscricao.com/juventudebatistacarioca/hospedagemeconomicadespertar?fbclid=IwAR2trydTKNe3yfT0mXOnlxiiLNhxMMasdPpnJqjx9inruAsVr8xxo-PSESk"
      );
    },
    sair() {
      this.$store.dispatch("logout");
      this.drawer = false;
    }
  }
};
</script>

<style>
  
.modelMaps {
  width: 850px;
  height: 750px;
  max-width: 100%;
  max-height: 90%;
}

.modelInscricao {
  width: 850px;
  height: 750px;
  max-width: 100%;
  max-height: 90%;
}
</style>