import { createRouter, createWebHistory } from "vue-router";
import store from './store';
const router = createRouter({
    history : createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'admin-login',
      component: () => import('./components/Home/AdminLogin.vue')
    },
    {
      path: '/dashboard',
      component: () => import('./components/Home/AdminDash.vue'),
       name: 'overview',
      children: [
        {
          path: '/tickets',
          component: () => import('./components/Tickets/TicketNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          name: 'tickets',
          children: [
            {
              path: '/tickets/details',
              alias: '',
              name: 'ticket-details',
              component: () => import('./components/Tickets/TicketPage.vue')
            },
            {
              path: '/tickets/price',
              name: 'ticket-price',
              component: () => import('./components/Tickets/TicketPrice.vue')
            },
            {
              path: '/tickets/slots',
              name: 'ticket-slots',
              component: () => import('./components/Tickets/TicketSlots.vue')
            },
          ]
        },
        {
          path: '/calendar',
          name: 'calendar',
          component: () => import('./components/Holidays/CalendarNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/calendar/addHoliday',
              alias: '',
              name: 'holiday-add',
              component: () => import('./components/Holidays/AddHoliday.vue'),
            },
            {
              path: '/calendar/viewHoliday',
               name: 'holiday-view',
              component: () => import('./components/Holidays/ViewHoliday.vue'),
            }
          ]
        },
        {
          path: '/dashboard-page',
          alias: '',
         name: 'dashboard',
          component: () => import('./components/Dashboard/DashPage.vue'),
          meta: { requiresAuth: true, role: 'admin' },
        },
        {
          path: '/employee',
          name: 'employee',
          component: () => import('./components/Employees/EmployeeNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/employee/add',
              alias: '',
              name: 'employee-add',
              component: () => import('./components/Employees/EmployeePage.vue'),
            },
            {
              path: '/employee/scanner',
              name: 'scanner',
              component: () => import('./components/Employees/ScannerRegister.vue'),
            }
          ]
        },
        {
          path: '/guide-app',
          name: 'guide-app',
          component: () => import('./components/GuideApp/GuideNav.vue'),
          children: [
            {
              path: '/guide-app/add',
              alias: '',
              name: 'guide-add-main',
              component: () => import('./components/GuideApp/GuideAdd.vue'),
              children: [
                {
                  path: '/guide-app/addHeading',
                  alias: '',
                  name: 'guide-add-sub',
                  component: () => import('./components/GuideApp/DummyCard.vue'),
                },
                {
                  path: '/guide-app/addSub',
                  name: 'guide-add-sub-sub',
                  component: () => import('./components/GuideApp/GuideSub.vue'),
                }
              ],
            },
            {
              path: '/guide-app/view',
              name: 'guide-view',
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
        next();
    } else {
        next('/guide-app');
    }
  } else {
    next();
  }
});

export default router;