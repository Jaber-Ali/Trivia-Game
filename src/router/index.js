import Vue from "vue"
import VueRouter from "vue-router"
import HomeScreen from '../views/HomeScreen.vue'
import StartScreen from '../views/StartScreen.vue'
import QuestionScreen from '../views/QuestionScreen.vue'
import ResultScreen from '../views/ResultScreen.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'HomeScreen',
        component: HomeScreen
    },
    {
        path: '/StartScreen',
        name: 'StartScreen',
        component: StartScreen
    },
    {
        path: '/Questionscreen',
        name: 'QuestionScreen',
        component: QuestionScreen
    },
    {
        path: '/Resultscreen',
        name: 'ResultScreen',
        component: ResultScreen
    }
    
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;