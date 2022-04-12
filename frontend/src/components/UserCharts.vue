<template>
  <div class="user-charts">
    <h4 class="title">Ages & Countries</h4>
    <Bar
      :chartData="chartData.country"
      :chartOptions="{
        maintainAspectRatio: false,
        animation: false,
      }"
      :width="200"
      :height="200"
    />
    <Bar
      :chartData="chartData.usa"
      :chartOptions="{
        maintainAspectRatio: false,
        animation: false,
      }"
      :width="200"
      :height="200"
    />
    <Bar
      :chartData="chartData.age"
      :chartOptions="{
        maintainAspectRatio: false,
        animation: false,
      }"
      :width="200"
      :height="200"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch, watchEffect } from "vue";
// Const
import { countries } from "../const";
// Chart
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "UserChartsComponent",
  components: {
    Bar,
  },
  props: {
    data: { type: Object, required: true },
  },
  setup(props) {
    const chartData = ref({});
    watchEffect(() => {
      const ageLabels = ["< 18", "18-25", "25-35", "35-50", "> 50"];
      const ageVotes = new Array(ageLabels.length).fill(0);

      const countryVotes = new Array(countries.length).fill(0);

      for (let i = 0; i < props.data.length; i++) {
        ageLabels.forEach((label, index) => {
          if (label === props.data[i].age) ageVotes[index]++;
        });
        countries.forEach((label, index) => {
          if (label === props.data[i].country) countryVotes[index]++;
        });
      }

      const indexOfFilteredCountries = [];
      const filteredCountryVote = [];

      countryVotes.forEach((country, index) => {
        if (country > 0) {
          indexOfFilteredCountries.push(index);
          filteredCountryVote.push(country);
        }
      });

      const filteredCountryList = [];
      for (let i = 0; i < indexOfFilteredCountries.length; i++) {
        countries.forEach((country, index) => {
          if (index === indexOfFilteredCountries[i]) {
            filteredCountryList.push(country);
          }
        });
      }

      const max = Math.max(...filteredCountryVote);
      const maxIndex = filteredCountryVote.indexOf(max);

      const USA = filteredCountryList.splice(maxIndex, 1);
      const usaVote = filteredCountryVote.splice(maxIndex, 1);

      chartData.value = {
        age: {
          labels: ageLabels,
          datasets: [
            {
              label: "People in this range",
              data: ageVotes,
              backgroundColor: "#69b2db",
            },
          ],
        },
        country: {
          labels: filteredCountryList,
          datasets: [
            {
              label: "People from this country",
              data: filteredCountryVote,
              backgroundColor: "#69b2db",
              indexAxis: "y",
            },
          ],
        },
        usa: {
          labels: [USA],
          datasets: [
            {
              label: "People from the USA",
              data: usaVote,
              backgroundColor: "#69b2db",
            },
          ],
        },
      };
    });

    return { chartData };
  },
});
</script>

<style scoped>
div.user-charts {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 33px 154px 154px;
}
h4.title {
  color: #c51162;
  font-size: 24px;
  text-align: center;
  grid-column: 1  / 3;
  grid-row: 1 / 2;
}
div.user-charts div:nth-child(2) {
  grid-column: 1 / 2;
  grid-row: 2 / 4;
}
div.user-charts div:nth-child(3) {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
div.user-charts div:last-child {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
</style>