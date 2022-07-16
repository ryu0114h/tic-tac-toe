<template>
  <div>
    <p id="player">Player {{ player }} の番です</p>
    <div id="table">
      <template v-for="(cellRow, i) in cellList">
        <CellItem
          :value="cell"
          v-for="(cell, j) in cellRow"
          :key="i * 3 + j"
          :index="i * 3 + j"
          @click="click"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CellItem from "./CellItem.vue";

export default Vue.extend({
  name: "CellTable",
  components: {
    CellItem,
  },
  data: function () {
    return {
      cellList: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      player: 1,
    };
  },
  methods: {
    click: function (index: number) {
      this.changePlayer();
      console.log(index);
    },
    changePlayer: function () {
      this.player = this.player === 1 ? 2 : 1;
    },
  },
});
</script>

<style scoped>
#table {
  display: grid;
  margin: 0px auto;
  width: 600px;
  height: 600px;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}

#player {
  font-size: 24px;
}
</style>
