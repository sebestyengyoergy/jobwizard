const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('pages/Home.vue'),
  },
  {
    path: '/:lang',
    redirect: {
      name: 'wizard',
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'wizard',
        component: () => import('pages/Wizard.vue'),
      },
      {
        path: 'jobs',
        name: 'jobs',
        component: () => import('pages/jobs/Index.vue'),
      },
      {
        path: 'job/:id',
        name: 'job',
        props: true,
        component: () => import('pages/jobs/Job.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/Settings.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
