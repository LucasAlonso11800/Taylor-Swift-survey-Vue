<template>
  <footer>
    <p class="quote">“Time, wondrous time, gave me the blues and then purple-pink skies.”</p>
    <p>Taylor Swift</p>
  </footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>

<style scoped>
footer {
  background-color: #c51162;
  padding: 8px;
}
p {
    text-align: center;
    line-height: 24px;
    color: #FFF;
}
.quote {
  font-style: italic;
}
</style>