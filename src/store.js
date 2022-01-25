import { createStore } from "vuex"
import { currentUser } from "./api/users"

export default createStore({

    //state shared through out the application
    state: {
        user: null,
        url: null,
        listOfQuestions: [],

    },
    getters: {
        choices: state => {
            return [state.selectedCat, state.selectedDiff, state.selectedType, state.selectedNumOfQuest, state.selectedCatId];
        },
        url: state => {
            return state.url;
        }
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
        getQustions: (state, questions) => {
            state.listOfQuestions = questions
        },
    },


    //communication ex: HTTP requests
    actions: {
        async loadQuestions({ commit }) {
            const response = await fetch(state.getters.url);
            const data = await response.json();
            commit("getQuestions ", data.results)
                // return data.results;
                // data.trivia_categories.forEach(category => {
                //   categories.push(category);
                //   return data;
                // });;
        }

    }
})