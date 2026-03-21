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
import MobileTabBar from "./Components/MobileTabBar";
import MobileHeader from "./Components/MobileHeader";
import MobileAbout from "./Components/MobileAbout";
import Filter from "./Components/ToolBar/Filter";
import QuadrascopeView from "./Components/QuadrascopeView";


function App() {
  const [titleMusic, setTitleMusic] = useState(DEFAULT_TITLE);
  const [analyser, setAnalyser] = useState(null);
  const [filters, setFilters] = useState(() => {
    try {
      const saved = localStorage.getItem("med-filters");
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return { query: null, first: false, second: false, third: false, best: false, love: false, chiptune: false };
  });
  const [listMods, setListMods] = useState([]);
  const [player, setPlayer] = useState(false);
  const [scrollText, setScrollText] = useState(false);
  const [mobileTab, setMobileTab] = useState("tracks");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const currentBtn = useRef();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function loadList() {
    setListMods(getList(modules_med));
  }

  function toggleFilter(icon) {
    setFilters(prev => {
      const next = { ...prev, [icon]: !prev[icon] };
      try { localStorage.setItem("med-filters", JSON.stringify(next)); } catch (_) {}
      return next;
    });
  }

  function setTitleCallback(str) {
    setTitleMusic(str);
  }

  function callbackAnalyser(_player, filename, _currentBtn) {
    var file = filename.split("/").pop();

    if(window?.neoart?.audioContext && window.neoart.audioContext.state === "suspended" && !window._acxUnblocked){
      window._acxUnblocked = true;
      new AudioContextUnblocker(window.neoart.audioContext);
      setTimeout(() => {
        const el = document.querySelector('.actx-unblocker');
        if (el) {
          const title = el.querySelector('.actx-unblocker__title');
          const subtitle = el.querySelector('.actx-unblocker__subtitle');
          const btn = el.querySelector('.actx-unblocker__button--allow');
          if (title) title.textContent = "\u266B";
          if (subtitle) subtitle.textContent = "Tap to play";
          if (btn) btn.textContent = "\u25B6  Play";

          // Add backdrop mask
          const mask = document.createElement('div');
          mask.className = 'actx-unblocker-mask';
          document.body.appendChild(mask);

          // Remove mask when unblocker is clicked
          const observer = new MutationObserver(() => {
            if (!document.querySelector('.actx-unblocker')) {
              mask.remove();
              observer.disconnect();
            }
          });
          observer.observe(document.body, { childList: true });
        }
      }, 10);
    }

    _player.analyser.minDecibels = -90;
    _player.analyser.maxDecibels = -10;
    _player.analyser.smoothingTimeConstant = 0.85;


    let title = file;
    if (_player.title.trim() !== "") {
      title = `${_player.title ?? file}`;
    }

    let scroll_text = `${
      _currentBtn && _currentBtn.attributes && _currentBtn.attributes.getNamedItem("data-text")
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

  const trackList = listMods.map(function (item, i) {
    return (
      <Years
        key={i}
        year={item.year}
        mods={item.mods}

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
  });

  // ===== MOBILE =====
  if (isMobile) {
    return (
      <Router>
        <div className="App mobile">
          <Routes>
            <Route path="/*" element={<Loader player={player} callbackAnalyser={callbackAnalyser} />} />
          </Routes>

          <MobileHeader
            title={titleMusic}
            player={player}
            setTitleCallback={setTitleCallback}
          />

          <div id="mobile-content">
            {mobileTab === "tracks" && (
              <div id="mobile-tracks-page">
                <div id="mobile-filters">
                  <Filter activeFilters={filters} onToggle={toggleFilter} />
                </div>
                <div id="mobile-tracks">
                  {trackList}
                </div>
              </div>
            )}

            {mobileTab === "scope" && (
              <div id="mobile-scope-page">
                <QuadrascopeView
                  player={player}
                  expanded={true}
                  onToggleExpanded={() => {}}
                />
              </div>
            )}

            {mobileTab === "about" && (
              <MobileAbout />
            )}
          </div>

          <MobileTabBar active={mobileTab} onSelect={setMobileTab} />
        </div>
      </Router>
    );
  }

  // ===== DESKTOP =====
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
            activeFilters={filters}
            onToggleFilter={toggleFilter}
            player={player}
            analyser={analyser}
          />
          <div id="block">
            <div id="tracks">
              {trackList}
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
