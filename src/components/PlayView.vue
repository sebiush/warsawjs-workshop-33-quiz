<template>
  <div v-if="questions" class="o-vertical-fill tile is-vertical is-ancestor">
    <div class="o-vertical-fill__item o-vertical-fill__item--fixed tile is-parent">
      <div class="is-child tile box">
        <div class="has-text-centered">
          <h1 class="title">
            Currently won:
            <strong>{{ cashAmount | cash }}</strong>
          </h1>
          <h2 class="subtitle">Round {{ currentRound + 1 }} of {{ maxRound }}</h2>
        </div>
      </div>
    </div>
    <div class="o-vertical-fill__item tile">
      <div class="tile is-parent is-9">
        <div class="is-child tile">
          <transition name="flip" mode="out-in">
            <game
              v-if="currentQuestion"
              :currentQuestion="currentQuestion"
              @answer="answerQuestion"
              class="box"
            ></game>
          </transition>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="is-child tile box">
          <question-bar :rewards="questionsWithRewards.slice().reverse()"></question-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from './Game'
import QuestionBar from './QuestionBar'
import { REWARDS, DIFFICULTY_LEVELS } from '../common/const'
import { getQuestions } from '../common/api'

export default {
  components: {
    Game,
    QuestionBar
  },
  data: function () {
    return {
      questions: [],
      currentRound: 0,
      cashAmount: 0,
      numberOfQuestions: 15
    }
  },
  created () {
    getQuestions(this.numberOfQuestions, DIFFICULTY_LEVELS.EASY).then(
      questions => {
        this.questions = questions
      }
    )
  },
  computed: {
    correctAnswer () {
      return this.currentQuestion.answers[this.currentQuestion.correctAnswer]
    },
    cashAmout () {
      return this.currentRound > 0 ? REWARDS[this.currentRound - 1] : 0
    },
    maxRound () {
      return this.questions.length
    },
    currentQuestion () {
      return this.questionsWithRewards[this.currentRound]
    },
    questionsWithRewards () {
      return this.questions.map((question, index) => ({
        ...question,
        reward: REWARDS[index],
        isAnswered: index < this.currentRound
      }))
    }
  },
  filters: {
    cash (value) {
      return '$' + value
    }
  },
  methods: {
    answerQuestion (answerNumber) {
      if (this.currentQuestion.correctAnswer === answerNumber) {
        this.cashAmount = this.currentQuestion.reward
        if (this.currentRound + 1 === this.maxRound) {
          this.$router.push({
            name: 'won',
            params: { currentAmount: this.cashAmount }
          })
        } else {
          this.currentRound += 1
        }
      } else {
        this.$router.push({
          name: 'lost',
          params: { correctAnswer: this.correctAnswer }
        })
      }
    }
  }
}
</script>


<style lang="scss">
// styles for animations

.flip-enter-active,
.flip-leave-active {
  transition: all 0.5s linear;
}
.flip-enter,
.flip-leave-to {
  transform: rotateY(90deg) scale(0.5, 1);
}
</style>
