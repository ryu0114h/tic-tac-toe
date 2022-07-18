import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

type State = {
  ticTacToeBoard: (null | number)[][];
  player: number;
  winner: null | number;
  isLoading: boolean;
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
    isLoading: false,
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
    setIsLoading(state, payload) {
      state.isLoading = payload;
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
    setIsLoading(context, payload) {
      context.commit("setIsLoading", payload);
    },
    resetGame(context) {
      context.dispatch("setTicTacToeBoard", initializeState().ticTacToeBoard);
      context.dispatch("setPlayer", initializeState().player);
      context.dispatch("setWinner", initializeState().winner);
    },
    changePlayer(context) {
      context.dispatch("setPlayer", this.state.player === 1 ? 2 : 1);
    },
    isFinishedGame(context) {
      if (
        this.state.ticTacToeBoard[0][0] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[0][1] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[0][2]
      ) {
        context.dispatch("setWinner", this.state.ticTacToeBoard[0][0]);
        return true;
      } else if (
        this.state.ticTacToeBoard[1][0] &&
        this.state.ticTacToeBoard[1][0] === this.state.ticTacToeBoard[1][1] &&
        this.state.ticTacToeBoard[1][0] === this.state.ticTacToeBoard[1][2]
      ) {
        context.dispatch("setWinner", this.state.ticTacToeBoard[1][0]);
        return true;
      } else if (
        this.state.ticTacToeBoard[2][0] &&
        this.state.ticTacToeBoard[2][0] === this.state.ticTacToeBoard[2][1] &&
        this.state.ticTacToeBoard[2][0] === this.state.ticTacToeBoard[2][2]
      ) {
        context.dispatch("setWinner", this.state.ticTacToeBoard[2][0]);
        return true;
      }

      if (
        this.state.ticTacToeBoard[0][0] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[1][0] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[2][0]
      ) {
        context.dispatch("setWinner", this.state.ticTacToeBoard[0][0]);
        return true;
      } else if (
        this.state.ticTacToeBoard[0][1] &&
        this.state.ticTacToeBoard[0][1] === this.state.ticTacToeBoard[1][1] &&
        this.state.ticTacToeBoard[0][1] === this.state.ticTacToeBoard[2][1]
      ) {
        context.dispatch("setWinner", this.state.ticTacToeBoard[0][1]);
        return true;
      } else if (
        this.state.ticTacToeBoard[0][2] &&
        this.state.ticTacToeBoard[0][2] === this.state.ticTacToeBoard[1][2] &&
        this.state.ticTacToeBoard[0][2] === this.state.ticTacToeBoard[2][2]
      ) {
        context.dispatch("setWinner", this.state.ticTacToeBoard[0][2]);
        return true;
      }

      if (
        this.state.ticTacToeBoard[0][0] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[1][1] &&
        this.state.ticTacToeBoard[0][0] === this.state.ticTacToeBoard[2][2]
      ) {
        context.dispatch("setWinner", this.state.ticTacToeBoard[0][0]);
        return true;
      } else if (
        this.state.ticTacToeBoard[0][2] &&
        this.state.ticTacToeBoard[0][2] === this.state.ticTacToeBoard[1][1] &&
        this.state.ticTacToeBoard[0][2] === this.state.ticTacToeBoard[2][0]
      ) {
        context.dispatch("setWinner", this.state.ticTacToeBoard[0][2]);
        return true;
      }

      if (this.getters.isFilledBoard()) {
        context.dispatch("setWinner", null);
        return true;
      }

      return false;
    },
    putBoard(context, payload) {
      const newTicTacToeBoardValue = this.state.ticTacToeBoard.slice();
      const columNum = payload % 3;
      const rowNum = Math.floor(payload / 3);
      newTicTacToeBoardValue[rowNum][columNum] = this.state.player;
      context.dispatch("setTicTacToeBoard", this.state.ticTacToeBoard);
      context.dispatch("changePlayer");
    },
    putRundomBoard(context) {
      context.dispatch("setIsLoading", true);
      let nullIndex = -1;
      while (nullIndex < 0) {
        const ticTacToeBoardFlat = this.state.ticTacToeBoard.flat();
        const randomIndex = Math.floor(
          Math.random() * ticTacToeBoardFlat.length
        );
        if (ticTacToeBoardFlat[randomIndex] === null) {
          nullIndex = randomIndex;
        }
      }
      setTimeout(() => {
        context.dispatch("putBoard", nullIndex);
        context.dispatch("setIsLoading", false);
      }, 500);
    },
  },
  modules: {},
});
