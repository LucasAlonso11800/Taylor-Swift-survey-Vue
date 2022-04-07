<template>
  <header>
    <nav>
      <button>
        <router-link to="/">Taylor Swift Survey</router-link>
      </button>
      <button>
        <router-link to="/results">See results</router-link>
      </button>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComponent",
});
</script>

<style>
header {
  background-color: #c51162;
}
nav {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
button {
  padding: 20px;
  border: none;
  background: transparent;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
button:hover {
      background-color: #950142;
}
a {
  text-decoration: none;
  text-transform: uppercase;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  line-height: 1.75;
}
</style>