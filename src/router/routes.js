
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/posts', component: () => import('pages/PostsPage.vue') },
      { path: '/perfil', component: () => import('pages/PerfilPage.vue') },
      { path: '/favorites', component: () => import('pages/FavoritePage.vue') },
      { path: '/users', component: () => import('pages/UsersPage.vue') },
      { path: '/details', component: () => import('pages/DetailsUser.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
