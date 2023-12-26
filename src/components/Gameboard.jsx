import { useState } from "react";

export function Gameboard({ handle_select_square, game_board }) {
  return (
    <ol id="game-board">
      {game_board.map((row, row_index) => (
        <li key={row_index}>
          <ol>
            {row.map((symbol, col_index) => (
              <li key={col_index}>
                <button
                  onClick={() => handle_select_square(row_index, col_index)}
                  disabled={symbol !== null}
                >
                  {symbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
