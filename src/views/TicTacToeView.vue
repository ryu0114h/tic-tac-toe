<template>
  <div class="home">
    <div>
      <p id="player">Player {{ player }} の番です</p>
      <div id="board">
        <template v-for="(rows, i) in ticTacToeBoard">
          <TicTacToeCell
            :value="cell"
            v-for="(cell, j) in rows"
            :key="i * 3 + j"
            :index="i * 3 + j"
            @click="clickCell"
          />
        </template>
      </div>
      <el-button id="button" type="primary" size="medium" @click="resetGame"
        >リセット</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import TicTacToeCell from "../components/TicTacToeCell.vue";

export default Vue.extend({
  name: "TicTacToeBoard",
  components: {
    TicTacToeCell,
  },
  computed: {
    ...mapState(["ticTacToeBoard", "player", "winner"]),
    ...mapGetters(["isFilledBoard"]),
  },
  methods: {
    ...mapActions([
      "setTicTacToeBoard",
      "setPlayer",
      "setWinner",
      "resetGame",
      "changePlayer",
      "isFinishedGame",
      "putBoard",
      "putRundomBoard",
    ]),
    showFinishedMessage() {
      const title = this.winner ? `勝者： Player ${this.winner}` : "引き分け";
      this.$notify({
        title,
        message: "",
      });
    },
    async clickCell(index: number) {
      if (await this.isFinishedGame()) {
        return;
      }

      this.putBoard(index);

      if (await this.isFinishedGame()) {
        this.showFinishedMessage();
        return;
      }

      if (this.$route.name === "one") {
        await this.putRundomBoard();

        if (await this.isFinishedGame()) {
          this.showFinishedMessage();
          return;
        }
      }
    },
  },
});
</script>

<style scoped>
#board {
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

#button {
  margin-top: 50px;
}
</style>
