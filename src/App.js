import { useState, useEffect, useRef } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./sass/app.scss";
import { getList } from "./tools/tools";
import CanvasBackground from "./Components/CanvasBackground";
import ToolBar from "./Components/ToolBar";
import Timer from "./Timer";
import Loader from "./Components/Loader";
import { DEFAULT_TITLE } from "./tools/const";
import Years from "./Components/Year";
import modules_med from "./tools/modules_med";
import { AudioContextUnblocker } from 'audio-context-unblocker'


function App() {
  const [titleMusic, setTitleMusic] = useState(DEFAULT_TITLE);
  const [analyser, setAnalyser] = useState(null);
  const [filters, setFilters] = useState({
    query: null, first: false, second: false, third: false,
    best: false, love: false, chiptune: false,
  });
  const [listMods, setListMods] = useState([]);
  const [player, setPlayer] = useState(false);
  const [scrollText, setScrollText] = useState(false);
  const currentBtn = useRef();

  function loadList() {
    setListMods(getList(modules_med));
  }

  function callbackFilter(query, filterArr) {
    setFilters({
      query: query,
      first: filterArr ? filterArr[0].actived : false,
      second: filterArr ? filterArr[1].actived : false,
      third: filterArr ? filterArr[2].actived : false,
      love: filterArr ? filterArr[3].actived : false,
      best: filterArr ? filterArr[4].actived : false,
      chiptune: filterArr ? filterArr[5].actived : false,
    });
  }

  function setTitleCallback(str) {
    setTitleMusic(str);
  }

  function callbackAnalyser(_player, filename, _currentBtn) {
    var file = filename.split("/").pop();

    if(window?.neoart?.audioContext){
      new AudioContextUnblocker(window.neoart.audioContext);
    }
    
    
    _player.analyser.minDecibels = -90;
    _player.analyser.maxDecibels = -10;
    _player.analyser.smoothingTimeConstant = 0.85;
    

    // _player.analyser.smoothingTimeConstant = 1;
    // _player.analyser.fftSize = 2048;
    // _player.analyser.minDecibels = -90;

    let title = file;
    if (_player.title.trim() !== "") {
      title = `${_player.title ?? file}`;
    }

    let scroll_text = `${
      _currentBtn.attributes.getNamedItem("data-text")
        ? _currentBtn.attributes.getNamedItem("data-text").value
        : ""
    }`;

    switch (filename.substr(13, filename.length).split("_")[0]) {
      case "lgf":
        scroll_text = "composed for the group logofactory";
        break;
      case "condense":
        scroll_text = "composed for the group condense";
        break;
      case "analogik":
        scroll_text =
          "composed for the label analogik     i created this label with kenet        we had great members as nagz  xerxes  willbe  wayfinder  traven  jashiin  edzes redribbon  unaware  skybax  dna-groove  dualtrax and many others     from all over the world      we wanted to make music in chiptune format but in great sound quality ";
        break;
      case "jecoute":
        scroll_text = "composed for the label jecoute";
        break;
      case "tvnet":
        scroll_text =
          "composed for the company tvnet also knowed as alambik     in two thousand during four years i was the main composer of the company";
        break;
      default:
        break;
    }

    setScrollText(
      `now playing ${(_player.title ?? file).toLowerCase()}    ${scroll_text}`
    );

    setTitleCallback(`Now Playing : ${title}`);
    setAnalyser(_player.analyser);
    setPlayer(_player);
    if (_currentBtn) {
      currentBtn.current = _currentBtn;
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  useEffect(() => {
    if (!player) return;
    const interval = setInterval(() => {
      if (player && currentBtn.current) {
        const percent = Math.round((player.order / (player.length - 1)) * 100);
        currentBtn.current.style.backgroundSize = `${percent}% auto`;
      }
    }, 500);
    return () => clearInterval(interval);
  }, [player]);

  return (
    <Router>
      <div className="App">
        <CanvasBackground scrollText={scrollText} />
        <Routes>
          <Route path="/*" element={<Loader player={player} callbackAnalyser={callbackAnalyser} />} />
        </Routes>
        <div id="primary-block">
          <ToolBar
            title={titleMusic}
            setTitleCallback={setTitleCallback}
            callbackFilter={callbackFilter}
            player={player}
            analyser={analyser}
          />
          <div id="block">
            <div id="tracks">
              {listMods.map(function (item, i) {
                return (
                  <Years
                    key={i}
                    year={item.year}
                    mods={item.mods}
                    tracker={false}
                    query={filters.query}
                    love={filters.love}
                    first={filters.first}
                    second={filters.second}
                    third={filters.third}
                    best={filters.best}
                    chiptune={filters.chiptune}
                    callbackAnalyser={callbackAnalyser}
                  />
                );
              })}
            </div>
            <div id="instruments"></div>
          </div>
          <Timer />
        </div>
      </div>
    </Router>
  );
}

export default App;
