<template>
  <div class="has-text-centered box">
    <h1 class="title">Incorrect answer, you lost!</h1>
    <h2 class="subtitle">Correct answer: {{ correctAnswer }}</h2>
    <hr>
    <div class="columns">
      <div class="column">
        <router-link :to="{name: 'play'}" class="button is-fullwidth">Try again</router-link>
      </div>
      <div class="column">
        <router-link :to="{name: 'rules'}" class="button is-fullwidth">Main menu</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['correctAnswer']
}
</script>
