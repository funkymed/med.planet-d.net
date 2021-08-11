import * as PasuunaPlayer from "@pinkkis/pasuuna-player/dist/pasuunaplayer";
import "./sass/theme.scss";
import displayYear from "./Components/Year";
import { getList } from "./modules";
import CanvasBackground from "./Components/CanvasBackground";

const tracker = new PasuunaPlayer.Tracker();
tracker.init();
tracker.events.on(PasuunaPlayer.EVENT.songLoaded, (song) => {
  tracker.playSong();
});

function App() {
  return (
    <div className="App">
      <CanvasBackground
        tracker={tracker}
        audioContext={tracker.audio.context}
      />
      <div id="loader">
        <div id="progress"></div>
      </div>
      <div id="primary-block">
        <div id="toolbar">
          <div className="floatL">
            <h1>Ultimate Med's MusicDisk</h1>
            <p id="title-track">Click on a track to play it</p>
          </div>
          <div className="floatR" id="control">
            <button id="pause" className="btn">
              Pause
            </button>
            <button id="stop" className="btn">
              Stop
            </button>
            <button id="hide" className="btn">
              Hide
            </button>
            <button id="info" className="btn">
              Info
            </button>
          </div>
          <div className="clearfix"></div>
        </div>
        <div id="block">
          <div id="tracks">
            {getList().map(function (year, mods) {
              return displayYear(year, mods, tracker);
            })}
          </div>
          <div id="instruments"></div>
        </div>
        <div id="timer"></div>
      </div>
    </div>
  );
}

export default App;
