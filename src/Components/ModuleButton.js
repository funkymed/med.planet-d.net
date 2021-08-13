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

let currentBtn = null;
function ModuleButton(props) {
  const [show, setShow] = useState(true);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [best, setBest] = useState(false);
  const [love, setLove] = useState(false);
  const [chiptune, setChiptune] = useState(false);

  function play(tracker, evt) {
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

    if (tracker.isPlaying) {
      tracker.stop();
    }

    tracker.load(filename);
  }

  useEffect(() => {
    if (props.filters) {
      console.log('filter');
      setShow(false);
      /*for (let filter of props.filters) {
        //console.log(filter);
        if (filter.icon == "best" && filter.actived && best) {
          setShow(true);
        }
        if (filter.icon == "love" && filter.actived && love) {
          console.log("love");
          setShow(true);
        }
        if (filter.icon == "chiptune" && filter.actived && chiptune) {
          setShow(true);
        }
      }*/
    }
  }, [props.filters]);

  useEffect(() => {
    const { mod } = props;
    if (props.query && props.query.trim() != "") {
      setShow(mod.name.toLowerCase().includes(props.query));
    } else {
      setShow(true);
    }
  }, [props.query]);

  useEffect(() => {
    const { mod } = props;
    if (isFirst(mod.name)) {
      setFirst(true);
    }
    if (isSecond(mod.name)) {
      setSecond(true);
    }
    if (isThird(mod.name)) {
      setThird(true);
    }
    if (isBest(mod.name)) {
      setBest(true);
    }
    if (isLove(mod.name)) {
      setLove(true);
    }
    if (isChiptune(mod.name)) {
      setChiptune(true);
    }
  }, []);

  const { mod } = props;

  return show ? (
    <li>
      <button
        data-filename={mod.filename}
        onClick={play.bind(this, props.tracker)}
      >
        {first ? <i title={TITLE_FIRST} className="icon first"></i> : ""}
        {second ? <i title={TITLE_SECOND} className="icon second"></i> : ""}
        {third ? <i title={TITLE_THIRD} className="icon third"></i> : ""}
        {best ? <i title={TITLE_BEST} className="icon best"></i> : ""}
        {love ? <i title={TITLE_LOVE} className="icon love"></i> : ""}
        {chiptune ? (
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
