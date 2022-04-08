<template>
<main>
<Question :question="'reputation'"/>
</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Question from '../components/Question.vue';
export default defineComponent({
  name: 'HomeView',
  components: {
      Question
  }
});
</script>
