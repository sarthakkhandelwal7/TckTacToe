export function GameOver({ winner, restart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>Player {winner} Won</p>}
      {!winner && <p>Game is Draw</p>}
      <p>
        <button onClick={restart}>Rematch</button>
      </p>
    </div>
  );
}
