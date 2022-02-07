import { createStore } from "vuex"
import { currentUser } from "./api/users"
import { reactive } from "vue";

export default createStore({

    //state shared through out the application
    state: {
        user: null,
        url: null,
        listOfQuestions: reactive([]),


    },
    getters: {
        choices: state => {
            return [state.selectedCat, state.selectedDiff, state.selectedType, state.selectedNumOfQuest, state.selectedCatId];
        },
        url: state => {
            return state.url;
        },
        getQuestions: state => {
            return state.listOfQuestions
        },


    },

    // changing the state
    mutations: {
        // you could destructure here too
        setUrl: (state, settings) => {
            state.url = `${settings.theUrl}amount=${settings.number}&category=${settings.categoryId}&difficulty=${settings.difficulty.toLowerCase()}`;
        },
        setUser: (state, user) => {
            state.user = user
        },
        loadQuestions: (state, questions) => {
            questions.forEach((object) => {
                state.listOfQuestions.push(object.question)
            });
        },
    },


    //communication ex: HTTP requests
    actions: {
        async loadQuestions({ commit }) {
            let response = await fetch(this.state.url)
            let data = await response.json()
            let dataArray = data.results
            commit("loadQuestions", dataArray)
                ;
        }

    }
})