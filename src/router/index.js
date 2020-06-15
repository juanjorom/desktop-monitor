import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Vision from "@/views/Vision"
import Detail from "@/views/Detail"

Vue.use(Router)

const routes= [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        children :[
            {
                path: '/',
                redirect: '/real'
            },
            {
                path: "/real",
                name: "real",
                component: Vision
            },
            {
                path: "/detail",
                name: "detail",
                component: Detail
            }
        ]
    }
]

const router= new Router({
    routes
})

export default router