<template>
  <main>
    <div class="container">
      <UserCharts :data="userData" />
      <Charts :data="chartsData" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
// Components
import Charts from "../components/Charts.vue";
import UserCharts from "../components/UserCharts.vue";
// Utils
import { getData } from "../utils";

const initialValues = {
  fearless: [],
  speakNow: [],
  red: [],
  "1989": [],
  reputation: [],
  lover: [],
  folklore: [],
  evermore: [],
  albums: [],
};

export default defineComponent({
  name: "ResultsView",
  components: {
    Charts,
    UserCharts
  },
  setup() {
    const chartsData = ref(initialValues);
    const userData = ref({});

    onMounted(async () => {
      const [userResponse, answerResponse] = await Promise.all([
        await getData("userData"),
        await getData("answer"),
      ]);

      userData.value = userResponse;

      const newData: typeof initialValues = answerResponse.reduce(
        (acc: typeof initialValues, answer: any) => {
          switch (answer.question) {
            case "2":
              return { ...acc, fearless: [...acc.fearless, answer] };
            case "3":
              return { ...acc, speakNow: [...acc.speakNow, answer] };
            case "4":
              return { ...acc, red: [...acc.red, answer] };
            case "5":
              return { ...acc, "1989": [...acc["1989"], answer] };
            case "6":
              return { ...acc, reputation: [...acc.reputation, answer] };
            case "7":
              return { ...acc, lover: [...acc.lover, answer] };
            case "8":
              return { ...acc, folklore: [...acc.folklore, answer] };
            case "9":
              return { ...acc, evermore: [...acc.evermore, answer] };
            case "10":
              return { ...acc, albums: [...acc.albums, answer] };
            default:
              return acc;
          }
        },
        initialValues
      );
      chartsData.value = newData;
    });

    // watch(chartsData, () => console.log(chartsData.value));
    // watch(userData, () => console.log(userData.value));

    return { chartsData, userData };
  },
});
</script>

<style scoped>
div.container {
  background-color: rgba(255, 255, 255, 0.4);
  padding: 32px 16px;
  width: 100%;
  max-width: 1280px;
  margin: auto;
  margin-top: -16px;
}
</style>