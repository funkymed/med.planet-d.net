import { useState, useEffect } from "react";
import * as PasuunaPlayer from "@pinkkis/pasuuna-player/dist/pasuunaplayer";
import "./sass/app.scss";
import displayYear from "./Components/Year";
import { getList } from "./tools/modules";
import CanvasBackground from "./Components/CanvasBackground";
import ToolBar from "./Components/ToolBar";
import Timer from "./Timer";
import Loader from "./Components/Loader";
import { DEFAULT_TITLE } from "./tools/const";

const tracker = new PasuunaPlayer.Tracker();
tracker.init();

function App() {
  const [titleMusic, setTitleMusic] = useState(DEFAULT_TITLE);
  const [analyser, setAnalyser] = useState(null);
  const listMods = getList();

  function getAnalyser() {
    if (tracker.clock) {
      const ctx = tracker.audio.context;
      const clockNode = tracker.clock._clockNode;
      const _analyser = ctx.createAnalyser();
      _analyser.smoothingTimeConstant = 0.75; // 0.85;
      _analyser.minDecibels = -90;
      _analyser.maxDecibels = -10;
      _analyser.fftSize = 256; //2048;
      _analyser.connect(ctx.destination);
      clockNode.disconnect();
      clockNode.connect(_analyser);
      return _analyser;
    }
  }

  function setTitleCallback(str) {
    setTitleMusic(str);
  }

  useEffect(() => {
    tracker.events.on(PasuunaPlayer.EVENT.songLoading, (song) => {
      setTitleCallback(`Loading : ${song}`);
    });

    tracker.events.on(PasuunaPlayer.EVENT.songLoaded, (song) => {
      const title = song.title.trim() !== "" ? song.title : song.filename;
      tracker.playSong();
      setTitleCallback(`Playing : ${title}`);
      setAnalyser(getAnalyser());
    });
  }, []); // Make sure the effect runs only once

  return (
    <div className="App">
      <CanvasBackground tracker={tracker} analyser={analyser} />
      <Loader />
      <div id="primary-block">
        <ToolBar
          tracker={tracker}
          title={titleMusic}
          setTitleCallback={setTitleCallback}
        />
        <div id="block">
          <div id="tracks">
            {listMods.map(function (item) {
              return displayYear(item.year, item.mods, tracker);
            })}
          </div>
          <div id="instruments"></div>
        </div>
        <Timer />
      </div>
    </div>
  );
}

export default App;
