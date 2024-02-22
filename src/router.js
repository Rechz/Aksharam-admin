import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history : createWebHistory(),
    routes: [
      {
        path : '/',
        component : () => import('./components/AdminLogin.vue')
      },
      {
        path : '/dashboard',
        component : () => import('./components/AdminDash.vue')
      }
    ]
});
export default router;