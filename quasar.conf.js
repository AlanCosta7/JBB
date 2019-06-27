// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'firebase',
      'vuelidate',
      'qrcode',
      'firebaseui'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
      }
    },
    devServer: {
      https: true,
      port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QLayoutFooter',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QFab',
        'QFabAction',
        'QPageSticky',
        'QDialog',
        'QField',
        'QInput',
        'QSelect',
        'QUploader',
        'QSlider',
        'QBtnDropdown',
        'QCheckbox',
        'QChip',
        'QChipsInput',
        'QResizeObservable',
        'QWindowResizeObservable',
        'QRadio',
        'QAlert',
        'QToggle',
        'QKnob',
        'QModal',
        'QModalLayout',
        'QDatetime',
        'QAutocomplete',
        'QTimeline',
        'QTimelineEntry',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QRating',
        'QSearch',
        'QVideo',
        'QCollapsible',
        'QSpinner',
        'QSpinnerBars',
        'QSpinnerComment',
        'QProgress',
        'QActionSheet',
        'QEditor',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QTooltip',
        'QScrollArea',
        'QScrollObservable',
        'QInnerLoading',
        'QChatMessage',
        'QPopover',
        'QParallax',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl'
      ],
      directives: [
        'Ripple',
        'CloseOverlay',
        'BackToTop'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'AddressbarColor',
        'Loading',
        'LocalStorage',
        'SessionStorage',
        'AppFullscreen'
      ],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'Despertar 2019',
        short_name: 'JBB2019',
        description: 'Conferência organizada pela Juventude Batista Brasileira em 2019',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
       id: 'br.com.despertar2019'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
