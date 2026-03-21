import React from "react";
import { DEFAULT_TITLE } from "../tools/const";

function MobileHeader({ title, player, setTitleCallback }) {
  function stop() {
    if (player) {
      const buttons = document.querySelectorAll("li > button");
      for (let button of buttons) {
        button.className = "";
        button.closest("li").className = "";
      }
      player.stop();
      setTitleCallback(DEFAULT_TITLE);
    }
  }

  return (
    <header id="mobile-header">
      <div id="mobile-title">Med's MusicDisk</div>
      <div id="mobile-nowplaying">
        {title !== DEFAULT_TITLE ? title : "Select a track"}
      </div>
      {player && title !== DEFAULT_TITLE && (
        <button id="mobile-stop" onClick={stop} aria-label="Stop">
          Stop
        </button>
      )}
    </header>
  );
}

export default React.memo(MobileHeader);
