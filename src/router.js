import { createRouter, createWebHistory } from "vue-router";
import store from './store';
const router = createRouter({
    history : createWebHistory(),
  routes: [
    {
      path: '/admin',
      name: 'admin-login',
      component: () => import('./components/Home/AdminLogin.vue')
    },
    {
      path: '/admin/dashboard',
      component: () => import('./components/Home/AdminDash.vue'),
       name: 'overview',
      children: [
        {
          path: '/admin/tickets',
          component: () => import('./components/Tickets/TicketNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          name: 'tickets',
          children: [
            {
              path: '/admin/tickets/details',
              alias: '',
              name: 'ticket-details',
              component: () => import('./components/Tickets/TicketPage.vue')
            },
            {
              path: '/admin/tickets/price',
              name: 'ticket-price',
              component: () => import('./components/Tickets/TicketPrice.vue')
            },
            {
              path: '/admin/tickets/slots',
              name: 'ticket-slots',
              component: () => import('./components/Tickets/TicketSlots.vue')
            },
          ]
        },
        {
          path: '/admin/calendar',
          name: 'calendar',
          component: () => import('./components/Holidays/CalendarNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/admin/calendar/addHoliday',
              alias: '',
              name: 'holiday-add',
              component: () => import('./components/Holidays/AddHoliday.vue'),
            },
            {
              path: '/admin/calendar/viewHoliday',
               name: 'holiday-view',
              component: () => import('./components/Holidays/ViewHoliday.vue'),
            }
          ]
        },
        {
          path: '/admin/dashboard-page',
          alias: '',
         name: 'dashboard',
          component: () => import('./components/Dashboard/DashPage.vue'),
          meta: { requiresAuth: true, role: 'admin' },
        },
        {
          path: '/admin/employee',
          name: 'employee',
          component: () => import('./components/Employees/EmployeeNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/admin/employee/add',
              alias: '',
              name: 'employee-add',
              component: () => import('./components/Employees/EmployeePage.vue'),
            },
            {
              path: '/admin/employee/scanner',
              name: 'scanner',
              component: () => import('./components/Employees/ScannerRegister.vue'),
            }
          ]
        },
        {
          path: '/admin/guide-app',
          name: 'guide-app',
          component: () => import('./components/GuideApp/GuideNav.vue'),
          children: [
            {
              path: '/admin/guide-app/add',
              alias: '',
              name: 'guide-add-main',
              component: () => import('./components/GuideApp/AddTopics/GuideAdd.vue'),
            },
            {
              path: '/admin/guide-app/view',
              name: 'guide-view',
              component: () => import('./components/GuideApp/ViewTopics/GuideView.vue'),
            },        
          ]
        }
      ]
    },
    {
      path: '/admin/guide-app/edit',
      name: 'guide-edit',
      component: () => import('./components/GuideApp/ViewTopics/DetailsView.vue'),
    },
    {
      path: '/admin/guide-app/subheading-view',
      name: 'guide-sub-view',
      component: () => import('./components/GuideApp/SubCardEdit/SubDetails.vue'),
    },
    {
      path: '/admin/guide-app/editForm',
      name: 'guide-editForm',
      component: () => import('./components/GuideApp/MainTopicEdit/EditForm.vue'),
    },
    
  ],
  scrollBehavior(_, _2, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return {left: 0, top: 0};
  },
});
router.beforeEach((to, _ , next) => {
  if (to.meta.requiresAuth) {
    console.log('authenticated', to.meta.requiresAuth)
    const isAuthenticated = store.getters.getStatus;
    console.log('status', isAuthenticated)
    if (isAuthenticated ) {
        next();
    } else {
        next({ name: 'guide-add-main' });
    }
  } else {
    next();
  }
});

export default router;