import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: "login",
        component: () =>
            import('@/views/Login.vue'),
    },
    {
        path: '/',
        name: "index",
        component: () => import('@/layout/admin.vue'),
        meta: { title: 'admin' },
        children:[
            {
                path: '/index',
                name: "index",
                component: () => import('@/views/index.vue'),
                meta: { title: '系统首页' },
            },
            {
                path: '/user',
                name: "user",
                component: () => import('@/views/user.vue'),
                meta: { title: '用户' },
            },
            {
                path: '/portal',
                name: "portal",
                component: () => import('@/views/portal.vue'),
                meta: { title: '门户管理' },
            },
            {
                path: '/task_index',
                name: "标注任务",
                component: () => import('@/views/task/task_index.vue'),
                meta: { title: '标注任务' },
            },
        ]
    },
    {
        path: '/AiLabel',
        name: "AiLabel",
        component: () => import('@/views/task/AiLabel.vue'),
        meta: { title: 'AiLabel' },
    },
]
export default new VueRouter({
    base: process.env.BASE_URL,
    routes
})
