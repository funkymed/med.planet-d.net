import { useEffect, useState } from "react";
import {
  TITLE_BEST,
  TITLE_CHIPTUNE,
  TITLE_FIRST,
  TITLE_LOVE,
  TITLE_SECOND,
  TITLE_THIRD,
} from "../tools/const";
import {
  isBest,
  isLove,
  isFirst,
  isSecond,
  isThird,
  isChiptune,
} from "../tools/modules";
import { streamXhr } from "../tools/tools";
import FileLoader from "../lib/Player/includes/FileLoader.js";

let currentBtn = null;
let player = null;
function ModuleButton(props) {
  const { first, second, third, love, best, chiptune, query, mod } = props;

  const [show, setShow] = useState(true);
  const [firstIcon, setFirstIcon] = useState(false);
  const [secondIcon, setSecondIcon] = useState(false);
  const [thirdIcon, setThirdIcon] = useState(false);
  const [bestIcon, setBestIcon] = useState(false);
  const [loveIcon, setLoveIcon] = useState(false);
  const [chiptuneIcon, setChiptuneIcon] = useState(false);

  function play(evt) {
    evt.preventDefault();
    if (currentBtn) {
      currentBtn.className = "";
    }
    currentBtn = evt.target;
    const filename = currentBtn.attributes.getNamedItem("data-filename").value;
    currentBtn.className = "active";

    /*
    currentBtn.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });*/

    //props.tracker.load(filename);

    streamXhr(filename, function (bytes) {
      if (player) {
        player.stop();
      }
      player = FileLoader.load(bytes);
      player.loopSong = true;
      player.play();

      props.callbackAnalyser(player,filename);
    });
  }

  function updateFilter(_props) {
    if (
      !_props.first &&
      !_props.second &&
      !_props.third &&
      !_props.best &&
      !_props.love &&
      !_props.chiptune
    ) {
      setShow(true);
    } else {
      setShow(false);
      if (firstIcon && _props.first) {
        setShow(true);
      }
      if (secondIcon && _props.second) {
        setShow(true);
      }
      if (thirdIcon && _props.third) {
        setShow(true);
      }
      if (loveIcon && _props.love) {
        setShow(true);
      }
      if (bestIcon && _props.best) {
        setShow(true);
      }
      if (chiptuneIcon && _props.chiptune) {
        setShow(true);
      }
    }
  }

  useEffect(() => {
    updateFilter({
      first,
      second,
      third,
      love,
      best,
      chiptune,
    });
  }, [first, second, third, love, best, chiptune]);

  useEffect(() => {
    if (query && query.trim() !== "") {
      setShow(mod.name.toLowerCase().includes(query));
    } else {
      setShow(true);
    }
  }, [query]);

  // Display icons
  useEffect(() => {
    if (isFirst(mod.name)) {
      setFirstIcon(true);
    }
    if (isSecond(mod.name)) {
      setSecondIcon(true);
    }
    if (isThird(mod.name)) {
      setThirdIcon(true);
    }
    if (isBest(mod.name)) {
      setBestIcon(true);
    }
    if (isLove(mod.name)) {
      setLoveIcon(true);
    }
    if (isChiptune(mod.name)) {
      setChiptuneIcon(true);
    }
  }, []);

  return show ? (
    <li>
      <button data-filename={mod.filename} onClick={play}>
        {firstIcon ? <i title={TITLE_FIRST} className="icon first"></i> : ""}
        {secondIcon ? <i title={TITLE_SECOND} className="icon second"></i> : ""}
        {thirdIcon ? <i title={TITLE_THIRD} className="icon third"></i> : ""}
        {bestIcon ? <i title={TITLE_BEST} className="icon best"></i> : ""}
        {loveIcon ? <i title={TITLE_LOVE} className="icon love"></i> : ""}
        {chiptuneIcon ? (
          <i title={TITLE_CHIPTUNE} className="icon chiptune"></i>
        ) : (
          ""
        )}
        {mod.name}
      </button>
    </li>
  ) : (
    ""
  );
}

export default ModuleButton;
