import { createRouter, createWebHistory } from "vue-router";
import store from './store';
const router = createRouter({
    history : createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./components/AdminLogin.vue')
    },
    {
      path: '/dashboard',
      component: () => import('./components/AdminDash.vue'),
        
      children: [
        {
          path: '/tickets',
          component: () => import('./components/TicketNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/tickets/details',
              alias: '',
              component: () => import('./components/TicketPage.vue')
            },
            {
              path: '/tickets/price',
              component: () => import('./components/TicketPrice.vue')
            },
            {
              path: '/tickets/slots',
              component: () => import('./components/TicketSlots.vue')
            },
          ]
        },
        {
          path: '/calendar',
          component: () => import('./components/CalendarNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/calendar/addHoliday',
              alias: '',
              component: () => import('./components/AddHoliday.vue'),
            },
            {
              path: '/calendar/viewHoliday',
              component: () => import('./components/ViewHoliday.vue'),
            }
          ]
        },
        {
          path: '/dashboard-page',
          alias: '',
          component: () => import('./components/Dashboard/DashPage.vue'),
          meta: { requiresAuth: true, role: 'admin' },
        },
        {
          path: '/employee',
          component: () => import('./components/EmployeeNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/employee/add',
              alias: '',
              component: () => import('./components/EmployeePage.vue'),
            },
            {
              path: '/employee/scanner',
              component: () => import('./components/ScannerRegister.vue'),
            }
          ]
        },
        {
          path: '/guide-app',
          component: () => import('./components/GuideNav.vue'),
          children: [
            {
              path: '/guide-app/add',
              alias: '',
              component: () => import('./components/GuideAdd.vue'),
            },
            {
              path: '/guide-app/view',
              component: () => import('./components/GuideView.vue'),
            }
          ]
        }
      ]
    }
  ]
});
router.beforeEach((to, _ , next) => {

  if (to.meta.requiresAuth) {
    console.log('authenticated', to.meta.requiresAuth)
    const isAuthenticated = store.getters.getStatus;
    console.log('status', isAuthenticated)
    if (isAuthenticated ) {
      console.log('enter admn')
        next();
    } else {
            console.log('enter emp')
        next('/guide-app');
    }
  } else {
    next();
  }
});

export default router;