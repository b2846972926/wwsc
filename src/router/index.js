import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('../views/Home/IndexView.vue'),
        },
        {
          path: 'category/:id',
          component: () => import('../views/Category/IndexView.vue'),
        },
        {
          path: 'category/sub/:id',
          component: () => import('../views/SubCategory/IndexView.vue'),
        },
        {
          path: 'detail/:id',
          component: () => import('../views/Detail/IndexView.vue'),
        },
        {
          path: 'cartlist',
          component: () => import('../views/CartList/IndexView.vue'),
        },
        {
          path: 'checkout',
          component: () => import('../views/Checkout/IndexView.vue'),
        },
        {
          path: 'pay',
          component: () => import('../views/Pay/IndexView.vue'),
        },
        {
          path: 'paycallback',
          component: () => import('../views/Pay/PayBackView.vue'),
        },
        {
          path: 'member',
          component: () => import('../views/Member/IndexView.vue'),
          children: [
            {
              path: '',
              component: () => import('../views/Member/components/UserInfo.vue'),
            },
            {
              path: 'order',
              component: () => import('../views/Member/components/UserOrder.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../views/Login/IndexView.vue'),
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

export default router
