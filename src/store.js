import { createStore } from "vuex"
import { currentUser } from "./api/users"

export default createStore({

    //state shared through out the application
    state: {
        user: null,
        url: null
            // selectedNumOfQuest: 0,
            // selectedDiff: null,
            // selectedCat: null,
            // selectedType: null,
            // selectedCatId: 0
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
        },
        setId: (state, id) => {
            state.selectedCatId = id;
        }

    },


    //communication ex: HTTP requests
    actions: {
        async loadQuestions(state) {
            const response = await fetch(state.getters.url);
            const data = await response.json();

            return data.results;
            // data.trivia_categories.forEach(category => {
            //   categories.push(category);
            //   return data;
            // });;
        }

    }
})