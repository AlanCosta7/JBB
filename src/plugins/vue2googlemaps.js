import * as VueGoogleMaps from "vue2-google-maps";

export default ({ Vue }) => {
  Vue.use(VueGoogleMaps, {
    load: { key: 'AIzaSyAiTvr4YlRwRJ1sCfghSZSwZM_f9JFn05k' }
  });
}