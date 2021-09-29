
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('pages/Home.vue'),
  },
  {
    path: '/:lang',
    redirect:
      {
        name: 'wizard'
      },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'wizard',
        component: () => import('pages/Wizard.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
