import { Player } from "./components/Player.jsx";
import { Gameboard } from "./components/Gameboard.jsx";
import { Log } from "./components/Log.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import { GameOver } from "./components/GameOver.jsx";

const initial_board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function get_current_player(turns) {
  let player = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    player = "O";
  }
  return player;
}

function App() {
  const [game_turns, set_game_turns] = useState([]);
  const active_player = get_current_player(game_turns);
  const [players, set_players] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  let winner;
  const is_draw = game_turns.length === 9;
  let game_board = [...initial_board.map((inner_array) => [...inner_array])];
  for (const turn of game_turns) {
    const { square, player } = turn;
    const { row, col } = square;
    game_board[row][col] = player;
  }

  for (const combinations of WINNING_COMBINATIONS) {
    const first_square_symbol =
      game_board[combinations[0].row][combinations[0].col];
    const second_square_symbol =
      game_board[combinations[1].row][combinations[1].col];
    const third_square_symbol =
      game_board[combinations[2].row][combinations[2].col];

    if (
      first_square_symbol &&
      first_square_symbol === second_square_symbol &&
      first_square_symbol === third_square_symbol
    ) {
      winner = players[first_square_symbol];
    }
  }

  function handle_select_square(row_index, col_index) {
    set_game_turns((prev_turns) => {
      let player = get_current_player(prev_turns);
      const updated_turns = [
        { square: { row: row_index, col: col_index }, player: player },
        ...prev_turns,
      ];
      return updated_turns;
    });
  }

  function handle_player_name_change(symbol, new_name) {
    set_players((prev_players) => {
      return {
        ...prev_players,
        [symbol]: new_name,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initial_name="Player 1"
            symbol="X"
            is_active={active_player === "X"}
            onNameChange={handle_player_name_change}
          />
          <Player
            initial_name="Player 2"
            symbol="O"
            is_active={active_player === "O"}
            onNameChange={handle_player_name_change}
          />
        </ol>
        {(winner || is_draw) && (
          <GameOver winner={winner} restart={() => set_game_turns([])} />
        )}
        <Gameboard
          handle_select_square={handle_select_square}
          game_board={game_board}
        />
      </div>
      <Log turns={game_turns} />
    </main>
  );
}

export default App;
