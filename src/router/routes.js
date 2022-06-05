import store from '@state/store'

export default [
  /* full page routes */
  {
    path: '',
    component: () => lazyLoadView(import('@layouts/Fullpage')),
    children: [
      {
        path: '/',
        redirect: 'signin',
      },
      {
        path: '/signin',
        name: 'signin',
        component: () => lazyLoadView(import('@views/signin')),
        meta: {
          beforeResolve(routeTo, routeFrom, next) {
            // If the user is already logged in
            if (store.getters['auth/loggedIn']) {
              const authUser =
                store.getters['auth/getAuthenticationToken'].data.userInfo
              if (authUser.role === 'consumer') {
                next({ name: 'consumer_bookings' })
              } else {
                next({ name: 'owner_dashboard' })
              }
            } else {
              // Continue to the login page
              next()
            }
          },
        },
      },
      {
        path: '/404',
        name: '404',
        component: require('@views/_404').default,
        props: true,
      },
    ],
  },
  /* consumer protected routes */
  {
    path: '',
    component: () => lazyLoadView(import('@layouts/consumer/layout')),
    children: [
      {
        path: '/consumer/dashboard',
        name: 'consumer_dashboard',
        component: () => lazyLoadView(import('@views/consumer/dashboard')),
        meta: {
          authRequired: true,
          consumerAuth: true,
          ownerAuth: false,
        },
      },
      {
        path: '/consumer/invoices',
        name: 'consumer_invoices',
        component: () => lazyLoadView(import('@views/consumer/invoices')),
        meta: {
          authRequired: true,
          consumerAuth: true,
          ownerAuth: false,
        },
      },
      {
        path: '/consumer/bookings',
        name: 'consumer_bookings',
        component: () => lazyLoadView(import('@views/consumer/bookings')),
        meta: {
          authRequired: true,
          consumerAuth: true,
          ownerAuth: false,
        },
      },
      {
        path: '/consumer/bookings/availability',
        name: 'consumer_bookings_availability',
        component: () =>
          lazyLoadView(import('@views/consumer/availableBookings')),
        meta: {
          authRequired: true,
          consumerAuth: true,
          ownerAuth: false,
        },
      },
      {
        path: '/consumer/profile',
        name: 'consumer_profile',

        component: () => lazyLoadView(import('@views/consumer/profile')),
        meta: {
          authRequired: true,
          consumerAuth: true,
          ownerAuth: false,
        },
      },
    ],
  },
  /* owner protected routes */
  {
    path: '',
    component: () => lazyLoadView(import('@layouts/owner/layout')),
    children: [
      {
        path: '/owner/dashboard',
        name: 'owner_dashboard',

        component: () => lazyLoadView(import('@views/owner/dashboard')),
        meta: {
          authRequired: true,
          consumerAuth: false,
          ownerAuth: true,
        },
      },
      {
        path: '/owner/equipments',
        name: 'owner_equipments',

        component: () => lazyLoadView(import('@views/owner/equipments')),
        meta: {
          authRequired: true,
          consumerAuth: false,
          ownerAuth: true,
        },
      },
      {
        path: '/owner/invoices',
        name: 'owner_invoices',

        component: () => lazyLoadView(import('@views/owner/invoices')),
        meta: {
          authRequired: true,
          consumerAuth: false,
          ownerAuth: true,
        },
      },
      {
        path: '/owner/bookings',
        name: 'owner_bookings',

        component: () => lazyLoadView(import('@views/owner/bookings')),
        meta: {
          authRequired: true,
          consumerAuth: false,
          ownerAuth: true,
        },
      },
      {
        path: '/owner/profile',
        name: 'owner_profile',

        component: () => lazyLoadView(import('@views/owner/profile')),
        meta: {
          authRequired: true,
          consumerAuth: false,
          ownerAuth: true,
        },
      },
    ],
  },

  {
    path: '*',
    redirect: '404',
  },
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@views/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
