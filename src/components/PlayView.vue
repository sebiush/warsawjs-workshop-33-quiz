<template>
  <div
    class="o-vertical-fill tile is-vertical is-ancestor"
    v-if="currentQuestion">
    <div class="o-vertical-fill__item o-vertical-fill__item--fixed tile is-parent">
      <div class="is-child tile box">
        <div class="has-text-centered">
          <h1 class="title">Currently won: <strong>{{ cashAmount }}</strong></h1>
          <h2 class="subtitle">Round {{ currentRound + 1 }} of {{ maxRound }}</h2>
        </div>
      </div>
    </div>
    <div class="o-vertical-fill__item tile">
      <div class="tile is-parent is-9">
        <div class="is-child tile">
          <transition name="flip" mode="out-in">
            <game
              class="box"
              :key="currentRound"
              :currentQuestion="currentQuestion"
              @answered="answerQuestion"
            >
            </game>
          </transition>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="is-child tile box">
          <questions-bar :questions="questionsWithRewards.slice().reverse()">
          </questions-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Game from './Game'
  import QuestionsBar from './QuestionsBar'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    components: {Game: Game, QuestionsBar: QuestionsBar},
    created () {
      this.fetchQuestionsFromApi(10)
    },
    methods: mapActions([
      'answerQuestion',
      'fetchQuestionsFromApi'
    ]),
    computed: mapGetters([
      'questionsWithRewards',
      'currentRound',
      'cashAmount',
      'maxRound',
      'currentQuestion'
    ])
  }
</script>

<style lang="scss">

  // styles for animations

  .flip-enter-active, .flip-leave-active {
    transition: all 0.5s linear;
  }
  .flip-enter, .flip-leave-to {
    transform: rotateY(90deg) scale(1, 0.5);
  }
</style>
