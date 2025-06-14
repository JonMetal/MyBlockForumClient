import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegistryPage from '../pages/RegistryPage.vue'
import ThreadsPage from '../pages/ThreadsPage.vue'
import CreateThreadPage from '../pages/CreateThreadPage.vue'
import ThreadPage from '../pages/ThreadPage.vue'
import RatingKarmaPage from '../pages/RatingKarmaPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/registry',
        component: RegistryPage
    },
    {
        path: '/threads',
        component: ThreadsPage,
    },
    {
        path: '/thread/create',
        component: CreateThreadPage
    },
    {
        path: '/thread/:id',
        component: ThreadPage,
        props: true
    },
    {
        path: '/rating-karma',
        component: RatingKarmaPage
    },
    {
        path: '/profile',
        component: ProfilePage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})
export default router;