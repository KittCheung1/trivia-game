import { createStore } from "vuex"
import { currentUser } from "./api/users"

export default createStore({

    //state shared through out the application
    state: {
        user: null
    },
    // changing the state
    mutations: {
        setUser: (state, user) => {
            state.user = user
        }

    },
    //communication ex: HTTP requests
    actions: {

    }
})