import { createRouter, createWebHistory } from 'vue-router'
import { currentUser } from '@/api/backend'
import { useUserStore } from '@/stores/user'
import AboutView from '../views/AboutView.vue'
import { useLoaderStore } from '@/stores/loader'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => {
        const userStore = useUserStore()

        return userStore.isLoggedIn ? import('../views/HomeView.vue') : AboutView
      },
    },
    {
      path: '/raw',
      name: 'raw',
      component: () => {
        const userStore = useUserStore()

        return userStore.isLoggedIn ? import('../views/RawView.vue') : AboutView
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => AboutView,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()

        if (userStore.isLoggedIn) return next()

        next({ name: 'home' })
      },
    },
    {
      path: '/onboarding/enter',
      name: 'enter',
      component: () => import('@/views/Onboarding/EnterView.vue'),
    },
    {
      path: '/onboarding/household-name',
      name: 'household-name',
      component: () => import('@/views/Onboarding/HouseholdNameView.vue'),
    },
  ],
})

// handle loading state
router.beforeEach(() => {
  useLoaderStore().start()
})
router.afterEach(() => {
  useLoaderStore().stop()
})

// Handle fetching user
router.beforeEach(async (to, from, next) => {
  try {
    const user = await currentUser()

    if (!user) {
      // TODO Not logged in
    }

    const userStore = useUserStore()
    userStore.setUser(user)
  } catch (e) {
    console.error('ERROR router.beforeEach')
    console.error(e)
  } finally {
    next()
  }
})

export default router
