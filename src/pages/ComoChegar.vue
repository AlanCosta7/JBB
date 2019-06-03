<template>
  <q-page>
    <div id="floating-panel">
      <q-select placeholder="Partida" v-model="select" :options="selectOptions" color="primary" inverted class="fixed z-top" style="width: 30%; top: 50px; right: 0px" />
      <q-btn icon="gps_fixed" round color="white" text-color="tertiary" class="fixed z-top q-mr-lg" style="right: 18px; bottom: 60px" @click="addMinhaLoc(minhaposicao)"></q-btn>
      <q-btn icon="navigation" round color="white" text-color="tertiary" class="fixed z-top q-mr-lg" style="right: 18px; bottom: 110px" @click="abrirApp()"></q-btn>
    </div>
    <gmap-map id="maps" :center="center" :zoom="10" :map-type-id="mapTypeId">
      <gmap-marker v-for="(item, index) in markers" :key="index" :position="item.position" :click="center=item.position" />
    </gmap-map>
  </q-page>
</template>

<script>

</script>

<script>
  import { mapGetters } from 'vuex'
  import { openURL } from 'quasar'
  import { Loading, QSpinnerFacebook } from 'quasar'


  export default {
    name: 'Comochegar',
    data() {
      return {
        select: '',
        selectOptions: [
          {
            label: 'Rodoviária Novo Rio',
            icon: 'directions_bus',
            value: 'Av. Francisco Bicalho, 1 - Santo Cristo, Rio de Janeiro - RJ, 20220-310'
          },
          {
            label: 'Aeroporto Galeão',
            icon: 'local_airport',
            value: 'Av. Vinte de Janeiro, s/nº - Ilha do Governador, Rio de Janeiro - RJ, 21941-900'
          },
          {
            label: 'Aeroporto Santos Dumont',
            icon: 'local_airport',
            value: 'Praça Sen. Salgado Filho, s/n - Centro, Rio de Janeiro - RJ, 20021-340'
          }
        ],
        center: { lat: -22.8995995, lng: -43.2106174 },
        mapTypeId: "roadmap",
        markers: [{ position: { lat: -23.0074613, lng: -43.4323469 } }],
      }
    },
    computed: {
      ...mapGetters({
        minhaposicao: 'minhaposicao'
      })
    },
    methods: {
      abrirApp() {
        openURL('https://www.google.com.br/maps/place/Igreja+Batista+Atitude/@-23.0074259,-43.434367,17z/data=!3m1!4b1!4m5!3m4!1s0x9bdcea0431dc37:0xe9f9682b65baee8d!8m2!3d-23.0074309!4d-43.4321783')
      },
      async addMinhaLoc(value) {
        var map;
        var directionsDisplay; // Instanciaremos ele mais tarde, que será o nosso google.maps.DirectionsRenderer
        var directionsService = new google.maps.DirectionsService();

        function initialize() {
          directionsDisplay = new google.maps.DirectionsRenderer(); // Instanciando...
          var latlng = new google.maps.LatLng(-23.0074613, -43.4323469);
          
          var options = {
            zoom: 5,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.TRANSIT,
            disableDefaultUI: false
          };

          map = new google.maps.Map(document.getElementById("maps"), options);
          directionsDisplay.setMap(map); // Relacionamos o directionsDisplay com o mapa desejado

        }

        initialize();

        var enderecoPartida = value.position;
        var enderecoChegada = { lat: -23.0074613, lng: -43.4323469 };

        var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
          origin: enderecoPartida, // origem
          destination: enderecoChegada, // destino
          travelMode: google.maps.TravelMode.TRANSIT // meio de transporte, nesse caso, de carro
        };

        await directionsService.route(request, function (result, status) {
          if (status == google.maps.DirectionsStatus.OK) { // Se deu tudo certo
            directionsDisplay.setDirections(result); // Renderizamos no mapa o resultado
          }
        });

      },
      addLocal() {
        var map;
        var directionsDisplay; // Instanciaremos ele mais tarde, que será o nosso google.maps.DirectionsRenderer
        var directionsService = new google.maps.DirectionsService();

        function initialize() {
          directionsDisplay = new google.maps.DirectionsRenderer(); // Instanciando...
          var latlng = new google.maps.LatLng(-23.0074613, -43.4323469);

          var options = {
            zoom: 5,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.TRANSIT,
            disableDefaultUI: false
          };

          map = new google.maps.Map(document.getElementById("maps"), options);
          directionsDisplay.setMap(map); // Relacionamos o directionsDisplay com o mapa desejado

        }

        initialize();

        var enderecoPartida = this.select;
        var enderecoChegada = { lat: -23.0074613, lng: -43.4323469 };

        var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
          origin: enderecoPartida, // origem
          destination: enderecoChegada, // destino
          travelMode: google.maps.TravelMode.TRANSIT // meio de transporte, nesse caso, de carro
        };

        directionsService.route(request, function (result, status) {
          if (status == google.maps.DirectionsStatus.OK) { // Se deu tudo certo
            directionsDisplay.setDirections(result); // Renderizamos no mapa o resultado
          }
        });
      },
    },
    updated() {
      this.addLocal()
    },
    async mounted() {
      var b = window.innerHeight;
      document.getElementById('maps').style.height = b - 85 + 'px'
      var minhaposicao = this.minhaposicao
      await this.$store.dispatch('minhaposicao')
      await this.addMinhaLoc(minhaposicao)
    },
    
  }
</script>

<style>
  .vue-map-container {
    max-width: 100%
  }

  .textname {
    position: absolute;
    left: 80px;
    bottom: 55px;
    font-size: .75em;
    width: 75%;
    color: #49748e;
  }
</style>