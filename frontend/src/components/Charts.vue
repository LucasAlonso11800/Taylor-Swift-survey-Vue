<template>
  <div class="charts">
    <div class="title-container">
      <span v-if="index > 0" @click="index = index - 1">&lt;</span>
      <div v-else class="filler"></div>
      <h4 class="title">{{ title }}</h4>
      <span v-if="index < 8" @click="index = index + 1">&gt;</span>
      <div v-else class="filler"></div>
    </div>
    <div class="charts-container">
      <Doughnut
        :chartData="chartData.favourites"
        :chartOptions="chartOptions.favourites"
        :width="200"
        :height="200"
      />
      <Doughnut
        :chartData="chartData.worst"
        :chartOptions="chartOptions.worst"
        :width="200"
        :height="200"
      />
      <Doughnut
        :chartData="chartData.underrated"
        :chartOptions="chartOptions.underrated"
        :width="200"
        :height="200"
      />
      <Doughnut
        :chartData="chartData.friday"
        :chartOptions="chartOptions.friday"
        :width="200"
        :height="200"
      />
      <Doughnut
        :chartData="chartData.sunday"
        :chartOptions="chartOptions.sunday"
        :width="200"
        :height="200"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from "vue";
import axios from "axios";
// Chart
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// Utils
import { getChartsTitle, generateDatasets, generateOptions } from "../utils";
import { questions } from "../const";

export default defineComponent({
  name: "ChartsComponent",
  components: {
    Doughnut,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const songList = ref<any>();
    const sortedData = ref<any>({});
    const index = ref<number>(0);

    onMounted(async () => {
      const response = await (await axios.get("/data.json")).data;
      songList.value = response;
    });

    const title = computed(() => getChartsTitle(index.value));
    const currentSongList = computed(() => {
      if (songList.value) {
        return songList.value[questions[index.value]].songs;
      }
      return [];
    });

    watchEffect(
      () => {
        const newData = {
          favourites: new Array(currentSongList.value.length).fill(0),
          worst: new Array(currentSongList.value.length).fill(0),
          underrated: new Array(currentSongList.value.length).fill(0),
          friday: new Array(currentSongList.value.length).fill(0),
          sunday: new Array(currentSongList.value.length).fill(0),
        };
        const chartData = props.data[questions[index.value]];
        for (let i = 0; i < chartData.length; i++) {
          currentSongList.value.forEach((song: any, idx: number) => {
            switch (song) {
              case chartData[i].favourite:
                return newData.favourites[idx]++;
              case chartData[i].worst:
                return newData.worst[idx]++;
              case chartData[i].underrated:
                return newData.underrated[idx]++;
              case chartData[i].friday:
                return newData.friday[idx]++;
              case chartData[i].sunday:
                return newData.sunday[idx]++;
              default:
                return;
            }
          });
        }
        sortedData.value = newData;
      }
    );
    
    const chartData = computed(() => ({
      favourites: generateDatasets(
        currentSongList.value,
        sortedData.value.favourites,
        "favourite"
      ),
      friday: generateDatasets(
        currentSongList.value,
        sortedData.value.friday,
        "friday"
      ),
      sunday: generateDatasets(
        currentSongList.value,
        sortedData.value.sunday,
        "sunday"
      ),
      underrated: generateDatasets(
        currentSongList.value,
        sortedData.value.underrated,
        "underrated"
      ),
      worst: generateDatasets(
        currentSongList.value,
        sortedData.value.worst,
        "worst"
      ),
    }));
    
    const chartOptions = computed(() => ({
      favourites: generateOptions("Favourite"),
      friday: generateOptions("Friday"),
      sunday: generateOptions("Sunday"),
      underrated: generateOptions("Underrated"),
      worst: generateOptions("Worst"),
    }));

    return {
      index,
      title,
      currentSongList,
      sortedData,
      chartData,
      chartOptions,
    };
  },
});
</script>

<style scoped>
div.charts {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 64px 0 32px;
}
div.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 240px;
}
h4.title {
  color: #c51162;
  font-size: 24px;
  line-height: 36px;
}
span {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  background-color: #000;
  font-size: 24px;
  font-weight: 600;
}
div.filler {
  width: 32px;
  height: 32px;
}

div.charts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}
</style>