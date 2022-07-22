import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
Vue.use(Router);

export default new Router({
  routes:[
    {
      path:'/',
      name:'home',
      component:Home,
      redirect:'/index',
      children:[
        {
          path: '/index',
          name: 'index',
          component: Index,
        }, {
          path: '/product/:id',
          name: 'product',
          // component: Product,
          component: () => import( './pages/product.vue')
          // component: resolve => require( ['./pages/index.vue'] ,resolve),
        }, {
          path: '/detail/:id',
          name: 'detail',
          // component: Detail,
          component: () => import( './pages/detail.vue')
        //   component: resolve => require( ['./pages/detail.vue'] ,resolve),
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      // component: Cart
      component: () => import( './pages/cart.vue')

    },
    {
      path: '/login',
      name: 'login',
      // component: Login
      component: () => import('./pages/login.vue')
      // component: resolve => require( ['./pages/login.vue'] ,resolve),
    },
    {
      path: '/order',
      name: 'order',
      // component: Order,
      component: () => import( './pages/order.vue'),

      children:[
        {
          path: 'list',
          name: 'order-list',
          // component: OrderList,
      component: () => import( './pages/orderList.vue')

        },
        {
          path: 'confirm',
          name: 'order-confirm',
          // component: OrderConfirm,
      component: () => import( './pages/orderConfirm.vue')

        },
        {
          path: 'pay',
          name: 'order-pay',
          // component: OrderPay,
      component: () => import( './pages/orderPay.vue')

        },
        {
          path: 'alipay',
          name: 'alipay',
          // component: AliPay,
      component: () => import( './pages/alipay.vue')

        }
      ]
    }
  ]
});