import { createStore } from "vuex"
import { currentUser } from "./api/users"
import { reactive } from "vue";

export default createStore({

    //state shared through out the application
    state: {
        user: null,
        url: null,
        questionObjects: [],
        index: 0,
        questionArray:[],
        answerArray: reactive([]),
        score: 0,
        numberOfQuestions: 0,
        highestScore: 0,

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
        getIndex: state=> {
            return state.index
        },
        getScore: state=>{
            return state.score
        },
        getHighestScore: state =>{
            return state.highestScore
        },
        getQuestionArray:state =>{
            return state.questionArray
        },
        getAnswerArray:state =>{
            return state.answerArray
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
        setIndex: (state, index)=>{state.index= index},

        setAnswerArray: (state, payload)=>{
            state.answerArray = payload
        },

        setQuestionArray:(state, payload)=>{
            state.questionArray.push(payload)
        },

        setScore: (state, payload)=>{
            state.score = payload
        },

        setNumOfQuestion: (state, settings)=>{
            state.numberOfQuestions = parseInt(settings.number)
        },
        setHighestScore: (state, payload)=>{
                state.highestScore = payload
            console.log(state.highestScore)
        },
        setQuestionObjects:(state, payload)=>{
            state.questionObjects = payload
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