import { createRouter, createWebHistory } from 'vue-router';

import CoachDetails from './pages/coaches/CoachDetails';
import CoachesList from './pages/coaches/CoachesList';
import ContactCoach from './pages/requests/ContactCoach';
import NotFound from './pages/NotFound';

import store from './store/index';

const CoachRegistration = import('./pages/coaches/CoachRegistration');

const RequestsReceived = import('./pages/requests/RequestsReceived');

const LoginPage = import('./pages/auth/UserAuth');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
          props: true
        },
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      component: LoginPage,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const {requiresAuth, requiresGuest} = to.meta;
  const isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth === true && isAuthenticated === false) {
    return next('/auth')
  }

  if (requiresGuest === true && isAuthenticated === true) {
    return next('/coaches')
  }

  next();
})

export default router;
