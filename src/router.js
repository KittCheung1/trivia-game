import { createRouter, createWebHistory } from "vue-router"
import Start from "./views/Start.vue"
import Record from "./views/Record.vue"
import Trivia from "./views/Trivia.vue"

const routes = [{
        path: "/",
        component: Start,
        name: "Start"
    },
    {
        path: "/trivia",
        component: Trivia,
        name: "Trivia"
    },
    {
        path: "/record",
        component: Record,
        name: "Record"
    }

]

export default createRouter({
    history: createWebHistory(),
    routes
})