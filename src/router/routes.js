const routes = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout'),
    children: [
      { path: '', name:'index', component: () => import('pages/landpage/Index.vue') },
      { path: 'login', component: () => import('pages/auth/login') },
      { path: 'auth/success', component: () => import('pages/auth/success') },
      { path: 'auth/error', component: () => import('pages/auth/error') }
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', redirect: 'inicio' },,
     // { path: 'feed', component: () => import('pages/aoVivo') },
      { path: 'inicio', name: 'inicio', component: () => import('pages/app/Inicio.vue') },
      { path: 'jornada', name: 'jornada', component: () => import('pages/app/Jornada.vue') },
      { path: 'checkin', name: 'checkin', component: () => import('pages/Checkin') },
      { path: 'votacao', component: () => import('pages/Votacao') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
