<template>
  <div class="home">
    <div>
      <p id="player">Player {{ player }} の番です</p>
      <div id="board">
        <template v-for="(rows, i) in ticTacToeBoardValue">
          <TicTacToeCell
            :value="cell"
            v-for="(cell, j) in rows"
            :key="i * 3 + j"
            :index="i * 3 + j"
            @click="isFinishedGame() ? null : click($event)"
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
import TicTacToeCell from "../components/TicTacToeCell.vue";

type DataType = {
  ticTacToeBoardValue: (null | number)[][];
  player: number;
  winner: null | number;
};

export default Vue.extend({
  name: "TicTacToeBoard",
  components: {
    TicTacToeCell,
  },
  data: function (): DataType {
    return {
      ticTacToeBoardValue: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      player: 1,
      winner: null,
    };
  },
  methods: {
    showFinishedMessage() {
      const title = this.winner ? `勝者： Player ${this.winner}` : "引き分け";
      this.$notify({
        title,
        message: "",
      });
    },
    async click(index: number) {
      this.putBoard(index);
      this.changePlayer();

      if (this.isFinishedGame()) {
        this.showFinishedMessage();
      }
    },
    changePlayer() {
      this.player = this.player === 1 ? 2 : 1;
    },
    putBoard(index: number) {
      const newTicTacToeBoardValue = this.ticTacToeBoardValue.slice();
      const columNum = index % 3;
      const rowNum = Math.floor(index / 3);
      newTicTacToeBoardValue[rowNum][columNum] = this.player;
      this.ticTacToeBoardValue = newTicTacToeBoardValue;
    },
    isFinishedGame() {
      if (this.isFilledBoard()) {
        return true;
      }

      if (
        this.ticTacToeBoardValue[0][0] &&
        this.ticTacToeBoardValue[0][0] === this.ticTacToeBoardValue[0][1] &&
        this.ticTacToeBoardValue[0][0] === this.ticTacToeBoardValue[0][2]
      ) {
        this.winner = this.ticTacToeBoardValue[0][0];
        return true;
      } else if (
        this.ticTacToeBoardValue[1][0] &&
        this.ticTacToeBoardValue[1][0] === this.ticTacToeBoardValue[1][1] &&
        this.ticTacToeBoardValue[1][0] === this.ticTacToeBoardValue[1][2]
      ) {
        this.winner = this.ticTacToeBoardValue[1][0];
        return true;
      } else if (
        this.ticTacToeBoardValue[2][0] &&
        this.ticTacToeBoardValue[2][0] === this.ticTacToeBoardValue[2][1] &&
        this.ticTacToeBoardValue[2][0] === this.ticTacToeBoardValue[2][2]
      ) {
        this.winner = this.ticTacToeBoardValue[2][0];
        return true;
      }

      if (
        this.ticTacToeBoardValue[0][0] &&
        this.ticTacToeBoardValue[0][0] === this.ticTacToeBoardValue[1][0] &&
        this.ticTacToeBoardValue[0][0] === this.ticTacToeBoardValue[2][0]
      ) {
        this.winner = this.ticTacToeBoardValue[0][0];
        return true;
      } else if (
        this.ticTacToeBoardValue[0][1] &&
        this.ticTacToeBoardValue[0][1] === this.ticTacToeBoardValue[1][1] &&
        this.ticTacToeBoardValue[0][1] === this.ticTacToeBoardValue[2][1]
      ) {
        this.winner = this.ticTacToeBoardValue[0][1];
        return true;
      } else if (
        this.ticTacToeBoardValue[0][2] &&
        this.ticTacToeBoardValue[0][2] === this.ticTacToeBoardValue[1][2] &&
        this.ticTacToeBoardValue[0][2] === this.ticTacToeBoardValue[2][2]
      ) {
        this.winner = this.ticTacToeBoardValue[0][2];
        return true;
      }

      if (
        this.ticTacToeBoardValue[0][0] &&
        this.ticTacToeBoardValue[0][0] === this.ticTacToeBoardValue[1][1] &&
        this.ticTacToeBoardValue[0][0] === this.ticTacToeBoardValue[2][2]
      ) {
        this.winner = this.ticTacToeBoardValue[0][0];
        return true;
      } else if (
        this.ticTacToeBoardValue[0][2] &&
        this.ticTacToeBoardValue[0][2] === this.ticTacToeBoardValue[1][1] &&
        this.ticTacToeBoardValue[0][2] === this.ticTacToeBoardValue[2][0]
      ) {
        this.winner = this.ticTacToeBoardValue[0][2];
        return true;
      }

      return false;
    },
    isFilledBoard() {
      return this.ticTacToeBoardValue.every((rows) =>
        rows.every((cell) => cell)
      );
    },
    resetGame() {
      this.ticTacToeBoardValue = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];
      this.player = 1;
      this.winner = null;
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
