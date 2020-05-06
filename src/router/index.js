import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import register from '@/views/register.vue'
import login from '@/views/Login.vue'
import userinfo from '@/views/userinfo.vue'
import edit from '@/views/Edit.vue'
import article from '@/views/Article.vue'
Vue.use(VueRouter)
  const routes = [
     {
       path:'/',
       component:Home,
       meta:{
         keepalive:true
       }
     },
     {
       path:'/register',
       component:register
     },
     {
       path:'/login',
       component:login
     },
     {
       path:'/userinfo',
       component:userinfo,
       meta:{
         istoken:true
       }
     },
     {
       path:'/edit',
       component:edit,
       meta:{
        istoken:true
      }
     },
     {
       path:'/article/:id',
       component:article
     }
  ]

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next) => {
  if(!localStorage.getItem('token')&&!localStorage.getItem('id')&&to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

export default router
