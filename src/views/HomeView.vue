<template>
  <div class="home">
    <CellTable />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import CellTable from "@/components/CellTable.vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    HelloWorld,
    CellTable,
  },
});
</script>
