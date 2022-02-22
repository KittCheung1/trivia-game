import { createStore } from "vuex"
import { currentUser } from "./api/users"
import { reactive } from "vue";

export default createStore({

    //state shared through out the application
    state: {
        user: null,
        url: null,
        questionObjects: reactive([]),
        index: 0,

    },
    getters: {
        // choices: state => {
        //     return [state.selectedCat, state.selectedDiff, state.selectedType, state.selectedNumOfQuest, state.selectedCatId];
        // },
        // getUrlState: state => {
        //     return state.url;
        // },
        getQuestionsObjects: state => {
            return state.questionObjects
        },

        getNextIndex: state=> {
            return state.index
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
        fetchQuestionsObjects: (state, payload) => {
            payload.forEach((object) => {
                state.questionObjects.push(object)
            });
        },
        setIndex: (state)=>{state.index++},
    },


    //communication ex: HTTP requests
    actions: {
        async loadQuestions({ commit }) {
            let response = await fetch(this.state.url)
            let data = await response.json()
            let dataArray = data.results
            commit("fetchQuestionsObjects", dataArray)
            console.log(dataArray)
                ;
        }

    }
})