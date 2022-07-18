import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

type State = {
  ticTacToeBoard: (null | number)[][];
  player: number;
  winner: null | number;
};

const initializeState = () => {
  return {
    ticTacToeBoard: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    player: 1,
    winner: null,
  };
};

export default new Vuex.Store({
  state: initializeState() as State,
  getters: {
    isFilledBoard(state) {
      return () =>
        state.ticTacToeBoard.every((rows) => rows.every((cell) => cell));
    },
  },
  mutations: {
    setTicTacToeBoard(state, payload) {
      state.ticTacToeBoard = payload;
    },
    setPlayer(state, payload) {
      state.player = payload;
    },
    setWinner(state, payload) {
      state.winner = payload;
    },
  },
  actions: {
    setTicTacToeBoard(context, payload) {
      context.commit("setTicTacToeBoard", payload);
    },
    setPlayer(context, payload) {
      context.commit("setPlayer", payload);
    },
    setWinner(context, payload) {
      context.commit("setWinner", payload);
    },
    resetGame(context) {
      context.commit("setTicTacToeBoard", initializeState().ticTacToeBoard);
      context.commit("setPlayer", initializeState().player);
      context.commit("setWinner", initializeState().winner);
    },
    changePlayer(context) {
      context.commit("setPlayer", this.state.player === 1 ? 2 : 1);
    },
    isFinishedGame(context) {
      if (
        this.state.ticTacToeBoard[0][0] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[0][1] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[0][2]
      ) {
        context.commit("setWinner", this.state.ticTacToeBoard[0][0]);
        return true;
      } else if (
        this.state.ticTacToeBoard[1][0] &&
        this.state.ticTacToeBoard[1][0] === this.state.ticTacToeBoard[1][1] &&
        this.state.ticTacToeBoard[1][0] === this.state.ticTacToeBoard[1][2]
      ) {
        context.commit("setWinner", this.state.ticTacToeBoard[1][0]);
        return true;
      } else if (
        this.state.ticTacToeBoard[2][0] &&
        this.state.ticTacToeBoard[2][0] === this.state.ticTacToeBoard[2][1] &&
        this.state.ticTacToeBoard[2][0] === this.state.ticTacToeBoard[2][2]
      ) {
        context.commit("setWinner", this.state.ticTacToeBoard[2][0]);
        return true;
      }

      if (
        this.state.ticTacToeBoard[0][0] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[1][0] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[2][0]
      ) {
        context.commit("setWinner", this.state.ticTacToeBoard[0][0]);
        return true;
      } else if (
        this.state.ticTacToeBoard[0][1] &&
        this.state.ticTacToeBoard[0][1] === this.state.ticTacToeBoard[1][1] &&
        this.state.ticTacToeBoard[0][1] === this.state.ticTacToeBoard[2][1]
      ) {
        context.commit("setWinner", this.state.ticTacToeBoard[0][1]);
        return true;
      } else if (
        this.state.ticTacToeBoard[0][2] &&
        this.state.ticTacToeBoard[0][2] === this.state.ticTacToeBoard[1][2] &&
        this.state.ticTacToeBoard[0][2] === this.state.ticTacToeBoard[2][2]
      ) {
        context.commit("setWinner", this.state.ticTacToeBoard[0][2]);
        return true;
      }

      if (
        this.state.ticTacToeBoard[0][0] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[1][1] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[2][2]
      ) {
        context.commit("setWinner", this.state.ticTacToeBoard[0][0]);
        return true;
      } else if (
        this.state.ticTacToeBoard[0][2] &&
        this.state.ticTacToeBoard[0][2] === this.state.ticTacToeBoard[1][1] &&
        this.state.ticTacToeBoard[0][2] === this.state.ticTacToeBoard[2][0]
      ) {
        context.commit("setWinner", this.state.ticTacToeBoard[0][2]);
        return true;
      }

      if (this.getters.isFilledBoard()) {
        context.commit("setWinner", null);
        return true;
      }

      return false;
    },
    putBoard(context, payload) {
      const newTicTacToeBoardValue = this.state.ticTacToeBoard.slice();
      const columNum = payload % 3;
      const rowNum = Math.floor(payload / 3);
      newTicTacToeBoardValue[rowNum][columNum] = this.state.player;
      context.commit("setTicTacToeBoard", this.state.ticTacToeBoard);
      context.dispatch("changePlayer");
    },
    putRundomBoard(context) {
      let nullIndex = -1;
      while (nullIndex < 0) {
        const ticTacToeBoardFlat = this.state.ticTacToeBoard.flat();
        const randomIndex = Math.floor(
          Math.random() * ticTacToeBoardFlat.length
        );
        console.log(randomIndex);
        if (ticTacToeBoardFlat[randomIndex] === null) {
          nullIndex = randomIndex;
        }
      }
      setTimeout(() => {
        context.dispatch("putBoard", nullIndex);
      }, 500);
    },
  },
  modules: {},
});
