import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import Products from '../views/Products.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: {
      requiresAuth: true
    }
  },

  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  const isLoggedIn = localStorage.getItem('token');
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!isLoggedIn) {
      next({name: 'LoginPage'})
    } else {
        next()
    }
  } else {
    next()
  }
})

export default router
