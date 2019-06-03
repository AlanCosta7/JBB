<template>
  <q-page>
    <q-scroll-area id="scrollarea">
        <q-timeline color="primary" class="q-pa-lg">
            <h2>Programação</h2>
          <q-timeline-entry heading>Quarta-feira</q-timeline-entry>
    
          <q-timeline-entry
            title="Check-in"
            subtitle="Julho 17, 2019"
            side="left"
          >
            <div>
            Você já pode realizar sua inscrição no menu. Ao chegar ao local do evento, 
            direciona-se para área de check-in.
            </div>
          </q-timeline-entry>
    
          <q-timeline-entry
            title="Celebração"
            subtitle="19h30min - 22h00min"
            side="right"
            icon="turned_in_not"
          >
            <div>
            Em breve mais informações sobre o culto
            </div>
          </q-timeline-entry>
    
          <q-timeline-entry
            title="Luau 'Dentro'"
            subtitle="22h30min"
            side="right"
            icon="brightness_3"
          >
            <div>
            Em breve mais informações sobre o luau
            </div>
          </q-timeline-entry>
    
          <q-timeline-entry heading>Quinta-feira</q-timeline-entry>
    
          <q-timeline-entry
            title="Celebração"
            subtitle="08h30min - 11h00min"
            side="right"
            icon="turned_in_not"
            >
            <div>
            Em breve mais informações sobre o culto
            </div>
          </q-timeline-entry>
  
          <q-timeline-entry
            title="Lab's"
            subtitle="11h10min"
            side="right"
            icon="group"
          >
            <div>
            Em breve mais informações sobre o Lab
            </div>
          </q-timeline-entry>
    
          <q-timeline-entry
            title="Almoço"
            subtitle="12h30min"
            side="left"
            color="orange"
            icon="local_dining"
          >
            <div>
            </div>
          </q-timeline-entry>
    
          <q-timeline-entry
            title="Entardecer"
            subtitle="17h00min"
            side="right"
            icon="brightness_4"
            >
            <div>
            Em breve mais informações sobre o Entardecer
            </div>
          </q-timeline-entry>
    
          <q-timeline-entry
            title="Celebração"
            subtitle="19h30min - 22h00min"
            side="right"
            icon="turned_in_not"
            >
            <div>
            Em breve mais informações sobre o culto
            </div>
          </q-timeline-entry>
        
        <q-timeline-entry heading>Sexta-feira</q-timeline-entry>
    
        <q-timeline-entry
          title="Celebração"
          subtitle="08h30min - 11h00min"
          side="right"
          icon="turned_in_not"
          >
          <div>
          Em breve mais informações sobre o culto
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Fórum"
          subtitle="11h00min"
          side="right"
          icon="group"
        >
          <div>
          Em breve mais informações sobre o Fórum
          </div>
        </q-timeline-entry>
  
        <q-timeline-entry
          title="Almoço"
          subtitle="12h30min"
          side="left"
          color="orange"
          icon="local_dining"
        >
          <div>
          </div>
        </q-timeline-entry>
  
        <q-timeline-entry
          title="Lançamento de livros"
          subtitle="17h00min - 19h30min"
          side="right"
          icon="local_library"
          >
          <div>
          Em breve mais informações sobre o lançamento de livros
          </div>
        </q-timeline-entry>
  
        <q-timeline-entry
          title="Luau"
          subtitle="19h30min"
          side="right"
          icon="brightness_3"
          >
          <div>
          Em breve mais informações sobre o luau
          </div>
        </q-timeline-entry>

        <q-timeline-entry heading>Sábado</q-timeline-entry>
    
        <q-timeline-entry
          title="Celebração"
          subtitle="08h30min - 11h00min"
          side="right"
          icon="turned_in_not"
          >
          <div>
          Em breve mais informações sobre o culto
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Almoço"
          subtitle="12h30min"
          side="left"
          color="orange"
          icon="local_dining"
        >
          <div>
          </div>
        </q-timeline-entry>
       
        <q-timeline-entry
          title="Pré-culto"
          subtitle="17h30min - 19h30min"
          side="right"
          icon="turned_in_not"
        >
          <div>
          Em breve mais informações sobre o pré-culto
          </div>
        </q-timeline-entry>
      
        <q-timeline-entry
          title="Celebração"
          subtitle="19h30min - 22h00min"
          side="right"
          icon="turned_in_not"
        >
          <div>
          Em breve mais informações sobre o culto
          </div>
        </q-timeline-entry>
      </q-timeline>
    </q-scroll-area>
  </q-page>
</template>
  
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Programacao',
        data () {
            return {
            }
        },   
    mounted() {
      var a = window.innerHeight;  
      document.getElementById('scrollarea').style.height = a - 85 + 'px'
    },    
}
</script>
  
<style>
</style>