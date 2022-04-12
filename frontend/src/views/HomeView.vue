<template>
  <main>
    <Question
      :question="questions[currentQuestion]"
      :handleQuestionChange="handleQuestionChange"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
// Components
import Question from "../components/Question.vue";
// Const
import { questions } from "../const";

export default defineComponent({
  name: "HomeView",
  components: {
    Question,
  },
  setup() {
    const router = useRouter();
    const currentQuestion = ref<number>(0);

    const handleQuestionChange = async () => {
      if (currentQuestion.value === questions.length - 1) {
        return await router.push("/results");
      }
      return currentQuestion.value++;
    };

    return { currentQuestion, questions, handleQuestionChange };
  },
});
</script>
