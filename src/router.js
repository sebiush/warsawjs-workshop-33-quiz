import Vue from 'vue'
import Router from 'vue-router'
import IntroView from './components/IntroView.vue'
import RulesView from './components/RulesView.vue'
import WonView from './components/WonView.vue'
import LostView from './components/LostView.vue'
import PlayView from './components/PlayView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IntroView,
      name: 'intro'
    },
    {
      path: '/rules',
      component: RulesView,
      name: 'rules'
    },
    {
      path: '/play',
      component: PlayView,
      name: 'play'
    },
    {
      path: '/won',
      component: WonView,
      name: 'won'
    },
    {
      path: '/lost',
      component: LostView,
      name: 'lost'
    }
  ]
})
