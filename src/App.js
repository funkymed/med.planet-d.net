import { useState, useEffect } from "react";
import "./sass/app.scss";
import { getList } from "./tools/modules";
import CanvasBackground from "./Components/CanvasBackground";
import ToolBar from "./Components/ToolBar";
import Timer from "./Timer";
import Loader from "./Components/Loader";
import { DEFAULT_TITLE } from "./tools/const";
import Years from "./Components/Year";

function App() {
  const [titleMusic, setTitleMusic] = useState(DEFAULT_TITLE);
  const [analyser, setAnalyser] = useState(null);
  const [filename, setFilename] = useState(null);
  const [query, setQuery] = useState(null);
  const listMods = getList();
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [best, setBest] = useState(false);
  const [love, setLove] = useState(false);
  const [chiptune, setChiptune] = useState(false);

  function callbackFilter(query, filters) {
    setQuery(query);
    setFirst(filters ? filters[0].actived : false);
    setSecond(filters ? filters[1].actived : false);
    setThird(filters ? filters[2].actived : false);
    setLove(filters ? filters[3].actived : false);
    setBest(filters ? filters[4].actived : false);
    setChiptune(filters ? filters[5].actived : false);
  }

  function setTitleCallback(str) {
    setTitleMusic(str);
  }

  function callbackAnalyser(newAnalyser){
    setAnalyser(newAnalyser);
  }

  return (
    <div className="App">
      <CanvasBackground
        analyser={analyser}
        filename={filename}
      />
      <Loader />
      <div id="primary-block">
        <ToolBar
          tracker={false}
          title={titleMusic}
          setTitleCallback={setTitleCallback}
          callbackFilter={callbackFilter}
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
                  query={query}
                  love={love}
                  first={first}
                  second={second}
                  third={third}
                  best={best}
                  chiptune={chiptune}
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
  );
}

export default App;
