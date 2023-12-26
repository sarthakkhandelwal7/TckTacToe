import { useState } from "react";

export function Player({ initial_name, symbol, is_active, onNameChange }) {
  const [player_name, set_player_name] = useState(initial_name);
  const [edit_name, set_edit_name] = useState(false);

  function handleNameChange(event) {
    set_player_name(event.target.value);
  }

  function handle_edit_save_buttion() {
    set_edit_name((edit_name) => !edit_name);

    if (edit_name) {
      onNameChange(symbol, player_name);
    }
  }

  return (
    <li className={is_active ? "active" : undefined}>
      <span className="player">
        {edit_name ? (
          <input
            type="text"
            required
            value={player_name}
            onChange={handleNameChange}
          />
        ) : (
          <span className="player-name">{player_name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handle_edit_save_buttion}>
        {edit_name ? "Save" : "Edit"}
      </button>
    </li>
  );
}
