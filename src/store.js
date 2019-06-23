import Vuex from 'vuex'
import Vue from 'vue'
import {getQuestions} from './common/api'
import {REWARDS} from './common/const'
import router from './router'

Vue.use(Vuex)

const mutations = {
  setQuestions (state, questions) {
    state.questions = questions
  },
  setRound(state, roundNumber) {
    state.currentRound = roundNumber
  }
}

const getters = {
  currentRound: state => state.currentRound,
  cashAmount (state) {
    if (state.currentRound > 0) {
      return REWARDS[state.currentRound - 1]
    } else {
      return 0
    }
  },
  maxRound (state) {
    return state.questions.length
  },
  currentQuestion (state) {
    return store.getters.questionsWithRewards[state.currentRound]
  },
  questionsWithRewards (state) {
    return state.questions.map((question, index) => ({
      ...question,
      reward: REWARDS[index],
      isAnswered: index < state.currentRound
    }))
  }
}

const actions = {
  fetchQuestionsFromApi ({commit}, amount) {
    getQuestions(amount).then(questions => {
      commit('setQuestions', questions)
    })
  },
  answerQuestion ({commit, state, getters}, isValidAnswer) {
    if (isValidAnswer) {
      if (state.currentRound + 1 === getters.maxRound) {
        commit('setRound', state.currentRound + 1)
        router.push({name: 'won'})
      } else {
        commit('setRound', state.currentRound + 1)
      }
    } else {
      router.push({name: 'lost'})
    }
  }
}

const store = new Vuex.Store({
  state () {
    return {
      questions: [],
      currentRound: 0
    }
  },
  mutations,
  actions,
  getters
})

export default store
