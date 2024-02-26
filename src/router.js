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
        component : () => import('./components/AdminDash.vue'),
        children: [
          {
            path : '/tickets',
            alias : '/dashboard',
            component : () => import('./components/TicketNav.vue'),
          },
          {
            path : '/portal',
            component : () => import('./components/PortalPage.vue')
          },
          {
            path : '/items-page',
            component : () => import('./components/ItemsPage.vue')
          },
          {
            path : '/dashboard-page',
            component : () => import('./components/DashPage.vue')
          },
          {
            path : '/employee-nav',
            component : () => import('./components/EmployeeNav.vue'),

          }

        ]
      }
      
    ]
});
export default router;