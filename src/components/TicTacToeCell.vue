<template>
  <span class="cell" v-if="value === 1">◯</span>
  <span class="cell" v-else-if="value === 2">✖️</span>
  <span class="cell" @click="click" v-else></span>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CellItem",
  props: {
    index: {
      type: Number,
    },
    value: {
      type: Number,
    },
  },
  methods: {
    click: function () {
      this.$emit("click", this.index);
    },
  },
});
</script>

<style scoped>
.cell {
  border-radius: 10px;
  border: 3px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
}

.cell:hover {
  background-color: aliceblue;
}
</style>
