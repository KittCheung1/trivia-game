import { createStore } from "vuex"
import { currentUser } from "./api/users"

export default createStore({

    //state shared through out the application
    state: {
        user: null,
        selectedNumOfQuest: 0,
        selectedDiff: null,
        selectedCat: null,
        selectedType: null,

    },
    // changing the state
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        setNumOfQuest: (state, number) => {
            state.selectedNumOfQuest = number
        },
        setDiff: (state, difficulty) => {
            state.selectedDiff = difficulty
        },
        setCat: (state, category) => {
            state.selectedCat = category
        },
        setType: (state, type) => {
            state.selectedType = type
        }

    },


    //communication ex: HTTP requests
    actions: {


    }
})