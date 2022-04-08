<template>
  <form @submit.prevent="handleSubmit">
    <h4>{{ title }}</h4>
    <div>
      <label for="favourite">{{ questions[0]?.label }}</label>
      <select v-model="favourite">
        <option v-for="song in songs" :key="song" :value="song">
          {{ song }}
        </option>
      </select>
    </div>
    <div>
      <label for="worst">{{ questions[1]?.label }}</label>
      <select v-model="worst">
        <option v-for="song in songs" :key="song" :value="song">
          {{ song }}
        </option>
      </select>
    </div>
    <div>
      <label for="underrated">{{ questions[2]?.label }}</label>
      <select v-model="underrated">
        <option v-for="song in songs" :key="song" :value="song">
          {{ song }}
        </option>
      </select>
    </div>
    <div>
      <label for="friday">{{ questions[3]?.label }}</label>
      <select v-model="friday">
        <option v-for="song in songs" :key="song" :value="song">
          {{ song }}
        </option>
      </select>
    </div>
    <div>
      <label for="sunday">{{ questions[4]?.label }}</label>
      <select v-model="sunday">
        <option v-for="song in songs" :key="song" :value="song">
          {{ song }}
        </option>
      </select>
    </div>
    <button type="submit" :disabled="onRequest">Send answer</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import axios from "axios";
// Utils
import { answerQuestion } from "../utils";
// Types
import { QuestionType } from "../types";

export default defineComponent({
  name: "QuestionComponent",
  props: {
    question: { type: String, required: true },
    handleQuestionChange: { type: Function, required: true },
  },
  setup(props) {
    const id = ref();
    const title = ref<string>("");
    const questions = ref<QuestionType[]>([]);
    const songs = ref<string[]>([]);
    const favourite = ref<string>("");
    const worst = ref<string>("");
    const underrated = ref<string>("");
    const friday = ref<string>("");
    const sunday = ref<string>("");
    const onRequest = ref<boolean>(false);

    watch(
      props,
      async () => {
        const response = await (await axios.get("/data.json")).data;
        const initialValue = response[props.question];
        const firstSong = initialValue.songs[0];
        id.value = initialValue.id;
        title.value = initialValue.title;
        questions.value = initialValue.questions;
        songs.value = initialValue.songs;
        favourite.value =
          worst.value =
          underrated.value =
          friday.value =
          sunday.value =
            firstSong;
      },
      { immediate: true }
    );

    const handleSubmit = async () => {
      try {
        onRequest.value = true;
        await answerQuestion('answer', {
          question: id.value,
          favourite: favourite.value,
          worst: worst.value,
          underrated: underrated.value,
          friday: friday.value,
          sunday: sunday.value,
        });
        onRequest.value = false;
        props.handleQuestionChange();
      } catch (err) {
        console.log(err);
      }
    };

    return {
      title,
      questions,
      songs,
      favourite,
      worst,
      underrated,
      friday,
      sunday,
      onRequest,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
form {
  width: 100%;
  max-width: 700px;
  margin: auto;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 8px;
  color: #69b2db;
}
h4 {
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;
}
div {
  display: flex;
  width: 100%;
  flex-direction: column;
}
label {
  margin: 16px 0 8px;
  width: 100%;
}
select {
  padding: 8px 24px 8px 0;
  margin: 0 16px;
  outline: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  background: transparent;
  cursor: pointer;
  font-size: 16px;
}
button {
  margin-top: 8px;
  padding: 8px;
  font-weight: bold;
  text-align: center;
  background-color: transparent;
  font-size: 14px;
  line-height: 24px;
  width: 100%;
  color: #69b2db;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
button:hover {
  text-decoration: underline;
}
button:disabled {
  cursor: default;
  color: #aaa;
}
</style>