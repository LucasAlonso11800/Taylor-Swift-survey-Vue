<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
export default defineComponent({
  components: {
    Footer,
    Header
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", "sans-serif";
}
body {
  min-width: 400px;
  min-height: 100vh;
}

main {
    height: calc(100vh - 64px - 68px);
    padding: 16px;
    background-image: url(./assets/background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
