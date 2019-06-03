<template>
  <div class="row">
    <div class="col-lg-2 col-xs-12 col-md-2 self-start">
      <div class="q-pa-lg">
        <p class="sub1">Organização</p>
        <img width="150" class="imgJBB" src="~assets/landpage/JBB.png" alt="logo JBB">
      </div>
    </div>
    <div class="col-lg-4 col-xs-12 col-md-5 self-start">
      <div class="q-pa-lg">
        <p class="sub1">Apoio</p>
        <img width="84" src="~assets/landpage/CBB.png" alt="logo CBB">
        <img width="84" src="~assets/landpage/JBC.png" alt="logo JBC">
        <img width="84" src="~assets/landpage/JUBERJ.png" alt="logo JUBERJ">
      </div>
    </div>

    <div class="col-lg-3 col-xs-12 col-md-5 self-start">
      <div class="q-pa-lg texto">
        <p class="sub1">FALE CONOSCO</p>
        <p>Whatsapp: 21 98488-7149</p>
        <p>Telefone do escritório: (21) 2157-5599</p>
        <p>E-mail: contato@juventudebatista.com.b</p>
      </div>
    </div>

    <div class="col-lg-3 col-xs-12 col-md-5 self-start">
      <div class="q-pa-lg">
        <p class="sub1">Siga-nos</p>
        <div class="base-social flex flex-center">
          <a class="q-mx-sm q-mb-lg" href="https://twitter.com/somosjbb" target="_blank">
            <img src="~assets/landpage/twitter.svg" alt="twitter" width="45">
          </a>
          <a class="q-mx-sm q-mb-lg" href="https://www.instagram.com/somosjbb/" target="_blank">
            <img src="~assets/landpage/instagram.svg" alt="instagram" width="45">
          </a>
          <a class="q-mx-sm q-mb-lg" href="https://www.facebook.com/somosjbb" target="_blank">
            <img src="~assets/landpage/facebook.svg" alt="facebook" width="45">
          </a>
          <a
            class="q-mx-sm q-mb-lg"
            href="https://www.youtube.com/user/juventudebatista"
            target="_blank"
          >
            <img src="~assets/landpage/youtube.svg" alt="youtube" width="45">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSocial"
};
</script>

<style>
.base-social {
  padding: 0;
  margin: 0;
}

.texto{
  color: #e4701f;
}
</style>
