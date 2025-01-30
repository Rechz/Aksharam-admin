import { createRouter, createWebHistory } from "vue-router";
import store from './store';
const router = createRouter({
    history : createWebHistory(),
  routes: [
    {
      path: '/admin-beta',
      name: 'admin-login',
      component: () => import('./components/Home/AdminLogin.vue')
    },
    {
      path: '/forbidden',
      name: 'forbid',
      component: () => import('./components/Home/ForbiddenPage.vue')
    },
    {
      path: '/:notFound(.*)',
      name: 'notfound',
      component: () => import('./components/Home/NotFound.vue')
    },
    {
      path: '/admin-beta/dashboard',
      component: () => import('./components/Home/AdminDash.vue'),
       name: 'overview',
      children: [
        {
          path: '/admin-beta/tickets',
          component: () => import('./components/Tickets/TicketNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          name: 'tickets',
          children: [
            {
              path: '/admin-beta/tickets/details',
              alias: '',
              name: 'ticket-details',
              component: () => import('./components/Tickets/TicketPage.vue')
            },
            {
              path: '/admin-beta/tickets/price',
              name: 'ticket-price',
              component: () => import('./components/Tickets/TicketPrice.vue')
            },
            {
              path: '/admin-beta/tickets/slots',
              name: 'ticket-slots',
              component: () => import('./components/Tickets/TicketSlots.vue')
            },
          ]
        },
        {
          path: '/admin-beta/spot-ticket',
          component: () => import('./components/Booking/Tickets/TicketNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          name: 'spot-tickets',
          children: [
            {
              path: '/admin-beta/spot-tickets/details',
              alias: '',
              name: 'spot-ticket-details',
              component: () => import('./components/Booking/Tickets/TicketPage.vue')
            },
            {
              path: '/admin-beta/spot-tickets/price',
              name: 'spot-ticket-price',
              component: () => import('./components/Booking/Tickets/TicketPrice.vue')
            },
            {
              path: '/admin-beta/spot-tickets/slots',
              name: 'spot-ticket-slots',
              component: () => import('./components/Booking/Tickets/TicketSlots.vue')
            },
            {
              path: '/admin-beta/spot-tickets/discount',
              name: 'spot-ticket-discount',
              component: () => import('./components/Booking/Tickets/TicketDiscount.vue')
            },
          ]
        },
        {
          path: '/admin-beta/spot-dashboard-page',
          alias: '',
         name: 'spot-dashboard',
          component: () => import('./components/Booking/SpotDash/SpotDash.vue'),
          meta: { requiresAuth: true, role: 'admin' },
        },
        {
          path: '/admin-beta/calendar',
          name: 'calendar',
          component: () => import('./components/Holidays/CalendarNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/admin-beta/calendar/addHoliday',
              alias: '',
              name: 'holiday-add',
              component: () => import('./components/Holidays/AddHoliday.vue'),
            },
            {
              path: '/admin-beta/calendar/viewHoliday',
               name: 'holiday-view',
              component: () => import('./components/Holidays/ViewHoliday.vue'),
            }
          ]
        },
        {
          path: '/admin-beta/dashboard-page',
          alias: '',
         name: 'dashboard',
          component: () => import('./components/Dashboard/DashPage.vue'),
          meta: { requiresAuth: true, role: 'admin' },
        },
        {
          path: '/admin-beta/employee',
          name: 'employee',
          component: () => import('./components/Employees/EmployeeNav.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: '/admin-beta/employee/add',
              alias: '',
              name: 'employee-add',
              component: () => import('./components/Employees/EmployeePage.vue'),
            },
            {
              path: '/admin-beta/employee/scanner',
              name: 'scanner',
              component: () => import('./components/Employees/ScannerRegister.vue'),
            }
          ]
        },
        {
          path: '/admin-beta/display-app',
          name: 'display-app',
          component: () => import('./components/DisplayApp/DisplayNav.vue'),
          meta: { requiresAuth: true, role: 'employee' },
          children: [
            {
              path: '/admin-beta/display-app/add',
              alias: '',
              name: 'display-add-main',
              component: () => import('./components/DisplayApp/AddTopics/DisplayAdd.vue'),
            },
            {
              path: '/admin-beta/display-app/view',
              name: 'display-view',
              component: () => import('./components/DisplayApp/ViewTopics/DisplayView.vue'),
            },        
          ]
        },
        {
          path: '/admin-beta/guide-app',
          name: 'guide-app',
          component: () => import('./components/Guide-App/GuideNav.vue'),
          meta: { requiresAuth: true, role: 'employee' },
          children: [
            {
              path: '/admin-beta/guide-app/add',
              alias: '',
              name: 'guide-add-main',
              component: () => import('./components/Guide-App/add/AddTopics.vue'),
            },
            {
              path: '/admin-beta/guide-app/view',
              name: 'guide-view',
              component: () => import('./components/Guide-App/view/ViewTopics.vue'),
            },
            {
              path: '/admin-beta/guide-app/user-view',
              name: 'guide-user-view',
              component: () => import('./components/Guide-App/User-Guide/ViewUsers.vue'),
            },         
          ]
        },
        {
          path: '/admin-beta/tribal-app',
          name: 'tribal-app',
          component: () => import('./components/Tribal/TribalNav.vue'),
          meta: { requiresAuth: true, role: 'employee' },
          children: [
            {
              path: '/admin-beta/tribal-app/add',
              alias: '',
              name: 'tribal-add',
              component: () => import('./components/Tribal/add/AddTopics.vue'),
            },
            {
              path: '/admin-beta/tribal-app/view',
              name: 'tribal-view',
              component: () => import('./components/Tribal/view/ViewTopics.vue'),
            },        
          ]
        }
      ]
    },
    {
      path: '/admin-beta/display-app/edit',
      name: 'display-edit',
      meta: { requiresAuth: true, role: 'employee' },
      component: () => import('./components/DisplayApp/ViewTopics/DetailsView.vue'),
    },
    {
      path: '/admin-beta/guide-app/edit',
      name: 'guide-edit',
      meta: { requiresAuth: true, role: 'employee' },
      component: () => import('./components/Guide-App/view/TopicDetails.vue'),
    },
    {
      path: '/admin-beta/tribal-app/edit',
      name: 'tribal-edit',
      meta: { requiresAuth: true, role: 'employee' },
      component: () => import('./components/Tribal/view/TopicDetails.vue'),
    },
    {
      path: '/admin-beta/display-app/subheading-view',
      name: 'display-sub-view',
      meta: { requiresAuth: true, role: 'employee' },
      component: () => import('./components/DisplayApp/SubCardEdit/SubDetails.vue'),
    },
    {
      path: '/admin-beta/display-app/editForm',
      name: 'display-editForm',
      meta: { requiresAuth: true, role: 'employee' },
      component: () => import('./components/DisplayApp/MainTopicEdit/EditForm.vue'),
    },
    
  ],
  scrollBehavior(_, _2, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return {left: 0, top: 0};
  },
});
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.getStatus; // true for admin, false for employee
    const token = store.getters.getToken; // true if logged in

    if (to.meta.requiresAuth) {
        if (token) {
            if (isAuthenticated) {
                next(); // Allow access for admin
            } else {
                const isDisplayAppRoute = to.matched.some(record => record.path.startsWith('/admin-beta/display-app'));
                if (isDisplayAppRoute) {
                    next(); // Allow access to any route within DisplayApp for employees
                } else {
                    next({ name: 'display-add-main' }); // Redirect employee to display-add-main for non-displayApp routes
                }
            }
        } else {
            next({ name: 'forbid' }); // Redirect unauthenticated users to forbid
        }
    } else {
        next(); // Allow access to public routes
    }
});

export default router;