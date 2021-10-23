import Vue from 'vue'
import VueRouter from 'vue-router'
import Diagnose from '../views/diagnose'
import Signup from '../views/Signup'
import Home from '../views/Home'
import Login from '../views/Login'
import Profile from '../views/Profile'
import Post from '../views/Post.vue'
import Post_Detail from '../views/Post_Detail.vue'
import Article from '../views/Article.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/diagnose',
    name: 'Diagnose',
    component: Diagnose
  },{
    path: '/signup',
    name: 'Signup',
    component: Signup
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/profile',
    name: 'Profile',
    component: Profile
  },{
    path: '/post',
    name: 'Post',
    component: Post
  },{
    path: '/post_detail',
    name: 'Post_Detail',
    component: Post_Detail
  }, {
    path: '/article',
    name: 'Article',
    component: Article
  }, 

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
