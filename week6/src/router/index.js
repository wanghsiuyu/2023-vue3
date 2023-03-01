import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: 'products',
          component: () => import('../views/ProductsView.vue'),
        },
        {
          path: 'product/:id',
          component: () => import('../views/ProductDetail.vue'),
        },
        {
          path: 'order',
          component: () => import('../views/OrderView.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../views/admin/AdminLogin.vue'),
    },
    {
      path: '/admin',
      component: () => import('../views/admin/DashboardLayout.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
        {
          path: 'orders',
          component: () => import('../views/admin/AdminOrders.vue'),
        },
      ],
    },
  ],
});

export default router;
