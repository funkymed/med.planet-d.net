import { useEffect, useState } from "react";
import FlodPlayer from "funkymed-flod-module-player/src/FlodPlayer";
import ajaxLoader from "funkymed-flod-module-player/src/ajaxLoader";
import {
  TITLE_BEST,
  TITLE_CHIPTUNE,
  TITLE_FIRST,
  TITLE_LOVE,
  TITLE_SECOND,
  TITLE_THIRD,
} from "../tools/const";

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
      currentBtn.closest("li").className = "";
    }
    currentBtn = evt.target;
    const filename = currentBtn.attributes.getNamedItem("data-filename").value;
    currentBtn.className = "active";

    const li = currentBtn.closest("li");
    li.className = "active";

    /*
    currentBtn.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });*/

    //props.tracker.load(filename);

    ajaxLoader(
      filename,
      function (bytes) {
        if (player) {
          player.stop();
        }
        player = FlodPlayer.load(bytes);
        player.loopSong = true;
        player.play();

        props.callbackAnalyser(player, filename, li);
        document.getElementById("progress").style.width = "100%";
        setTimeout(() => {
          document.getElementById("progress").style.width = 0;
        }, 200);
      },
      function (percentage) {
        document.getElementById("progress").style.width = `${percentage}%`;
      }
    );
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
    updateFilter(props);
  }, [query]);

  // Display icons
  useEffect(() => {
    if (mod?.filters?.first) {
      setFirstIcon(true);
    }
    if (mod?.filters?.second) {
      setSecondIcon(true);
    }
    if (mod?.filters?.third) {
      setThirdIcon(true);
    }
    if (mod?.filters?.best) {
      setBestIcon(true);
    }
    if (mod?.filters?.love) {
      setLoveIcon(true);
    }
    if (mod?.filters?.chiptune) {
      setChiptuneIcon(true);
    }
  }, []);

  return show ? (
    <li>
      <button data-filename={mod?.filename} onClick={play}>
        {mod?.filters?.first ? (
          <i title={TITLE_FIRST} className="icon first"></i>
        ) : (
          ""
        )}
        {mod?.filters?.second ? (
          <i title={TITLE_SECOND} className="icon second"></i>
        ) : (
          ""
        )}
        {mod?.filters?.third ? (
          <i title={TITLE_THIRD} className="icon third"></i>
        ) : (
          ""
        )}
        {mod?.filters?.best ? (
          <i title={TITLE_BEST} className="icon best"></i>
        ) : (
          ""
        )}
        {mod?.filters?.love ? (
          <i title={TITLE_LOVE} className="icon love"></i>
        ) : (
          ""
        )}
        {mod?.filters?.chiptune ? (
          <i title={TITLE_CHIPTUNE} className="icon chiptune"></i>
        ) : (
          ""
        )}
        {mod.name}
        <div className="floatR">{mod.size}</div>
      </button>
    </li>
  ) : (
    ""
  );
}

export default ModuleButton;
