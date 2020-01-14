import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
// import Publish from '../views/Publish'
// import Person from '../views/Person'
// import Content from '../views/Content'

Vue.use(Router)

const Publish = () => import('../views/Publish')
const Person = () => import('../views/Person')
const Content = () => import('../views/Content')

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/publish', name: 'Publish', component: Publish },
    { path: '/person', name: 'Person', component: Person },
    { path: '/content', name: 'Content', component: Content },
  ]
})
