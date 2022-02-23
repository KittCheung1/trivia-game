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
        answerArray: reactive([]),
        score: 0,
        numberOfQuestions: 0,

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
        },
        getScore: state=>{
            return state.score
        }


    },

    // changing the state
    mutations: {
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

        setAnswerArray: (state, payload)=>{
            state.answerArray = payload
        },
        setScore: (state, payload)=>{
            state.score = payload
        },

        setNumOfQuestion: (state, settings)=>{
            state.numberOfQuestions = parseInt(settings.number)
        }
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