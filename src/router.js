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
      path: '/admin/dashboard',
      component: () => import('./components/Home/AdminDash.vue'),
       name: 'overview',
      children: [
        {
          path: '/admin/booking',
          component: () => import('./components/Booking/TicketBooking.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          name: 'booking',
        },
        {
          path: '/admin/confirm-booking',
          component: () => import('./components/Booking/ConfirmBooking.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          name: 'confirmbooking',
        },
        {
          path: '/admin/ticket',
          component: () => import('./components/Booking/TicketPage.vue'),
          meta: { requiresAuth: true, role: 'admin' },
          name: 'ticket',
        },
      ]
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
                const isDisplayAppRoute = to.matched.some(record => record.path.startsWith('/admin/display-app'));
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