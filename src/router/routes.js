const routes = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout'),
    children: [
      { path: '', name:'index', component: () => import('pages/landpage/Index.vue') },
      { path: 'login', component: () => import('pages/auth/login') },
      { path: 'inscricao', component: () => import('pages/Inscricao') },
      { path: 'comochegar', component: () => import('pages/ComoChegar') },
      { path: 'programacao', component: () => import('pages/Programacao') },
      { path: 'auth/success', component: () => import('pages/auth/success') },
      { path: 'auth/error', component: () => import('pages/auth/error') },
      { path: 'legal/terms-of-service', component: () => import('pages/legal/terms-of-service') },
      { path: 'legal/privacy', component: () => import('pages/legal/privacy') }

    ]
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
     // { path: 'feed', component: () => import('pages/aoVivo') },
      { path: 'checkin', component: () => import('pages/Checkin') },
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
