import { createRouter, createWebHistory } from "vue-router";
import store from './store';
const router = createRouter({
    history : createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./components/Home/AdminLogin.vue')
    },
    {
      path: '/dashboard',
      component: () => import('./components/Home/AdminDash.vue'),
        
      children: [
        {
          path: '/tickets',
          component: () => import('./components/Tickets/TicketNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/tickets/details',
              alias: '',
              component: () => import('./components/Tickets/TicketPage.vue')
            },
            {
              path: '/tickets/price',
              component: () => import('./components/Tickets/TicketPrice.vue')
            },
            {
              path: '/tickets/slots',
              component: () => import('./components/Tickets/TicketSlots.vue')
            },
          ]
        },
        {
          path: '/calendar',
          component: () => import('./components/Holidays/CalendarNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/calendar/addHoliday',
              alias: '',
              component: () => import('./components/Holidays/AddHoliday.vue'),
            },
            {
              path: '/calendar/viewHoliday',
              component: () => import('./components/Holidays/ViewHoliday.vue'),
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
          component: () => import('./components/Employees/EmployeeNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/employee/add',
              alias: '',
              component: () => import('./components/Employees/EmployeePage.vue'),
            },
            {
              path: '/employee/scanner',
              component: () => import('./components/Employees/ScannerRegister.vue'),
            }
          ]
        },
        {
          path: '/guide-app',
          component: () => import('./components/GuideApp/GuideNav.vue'),
          children: [
            {
              path: '/guide-app/add',
              alias: '',
              component: () => import('./components/GuideApp/GuideAdd.vue'),
            },
            {
              path: '/guide-app/view',
              component: () => import('./components/GuideApp/GuideView.vue'),
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