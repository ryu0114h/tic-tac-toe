<template>
  <div class="home">
    <TicTacToeBoard />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TicTacToeBoard from "@/components/TicTacToeBoard.vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    TicTacToeBoard,
  },
});
</script>
