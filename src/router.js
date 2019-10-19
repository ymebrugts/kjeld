import Vue from 'vue'
import Router from 'vue-router'
import kjeld from "@/components/kjeld";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            name: 'kjeld',
            component: kjeld,
        }
    ]
})
