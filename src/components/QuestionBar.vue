<template>
  <div class="c-question-list">
    <div v-for="(question, index) in rewards" :key="index" class="columns is-multiline">
      <div class="column is-12">
        <div class="c-question-list__item button is-fullwidth" :class="{'is-success': question.isAnswered}">
          <span>
            <div>$ {{ question.reward }}</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rewards']
}
</script>

<style lang="scss">
.c-question-list {
  &__item {
    color: hsl(48, 100%, 67%);
  }
}
</style>
