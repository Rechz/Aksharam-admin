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
            component : () => import('./components/TicketNav.vue'),
            children: [
              {
                path:'/tickets/details',
                alias: '',
                component: () => import('./components/TicketPage.vue')
              },
              {
                path:'/tickets/price',
                component: () => import('./components/TicketPrice.vue')
              },
              {
                path:'/tickets/slots',
                component: () => import('./components/TicketSlots.vue')
              },
            ]
          },
          {
            path : '/portal',
            component : () => import('./components/PortalPage.vue')
          },
          {
            path: '/dashboard-page',
            alias : '',
            component : () => import('./components/Dashboard/DashPage.vue')
          },
          {
            path : '/employee',
            component : () => import('./components/EmployeeNav.vue'),
            children: [
              {
                path: '/employee/add',
                alias: '',
                component : () => import('./components/EmployeePage.vue'),
              },
              {
                path: '/employee/scanner',
                component : () => import('./components/ScannerRegister.vue'),
              }
            ]

          },
                {
            path : '/guide-app',
            component : () => import('./components/GuideNav.vue'),
            children: [
              {
                path: '/guide-app/add',
                alias: '',
                component : () => import('./components/GuideAdd.vue'),
              },
              {
                path: '/guide-app/view',
                component : () => import('./components/GuideView.vue'),
              }
            ]

          },

        ]
      }
      
    ]
});
export default router;