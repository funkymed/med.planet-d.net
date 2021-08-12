import * as PasuunaPlayer from "@pinkkis/pasuuna-player/dist/pasuunaplayer";
import "./sass/app.scss";
import displayYear from "./Components/Year";
import { getList } from "./tools/modules";
import CanvasBackground from "./Components/CanvasBackground";
import ToolBar from "./Components/ToolBar";
import Timer from "./Timer";
import Loader from "./Components/Loader";

const tracker = new PasuunaPlayer.Tracker();
tracker.init();
tracker.events.on(PasuunaPlayer.EVENT.songLoaded, (song) => {
  tracker.playSong();
});

function App() {
  const listMods = getList();
  return (
    <div className="App">
      <CanvasBackground
        tracker={tracker}
        audioContext={tracker.audio.context}
      />
      <Loader />
      <div id="primary-block">
        <ToolBar />
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
