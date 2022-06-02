import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TodoPage.vue') },
      {
        path: 'Task-app',
        name: 'Task-app',
        component: () => import('pages/TodoPage.vue'),
      },
      {
        path: 'Country-app',
        name: 'Country-app',
        component: () => import('src/pages/CountryPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
