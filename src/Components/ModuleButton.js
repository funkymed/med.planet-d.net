import { TITLE_BEST, TITLE_CHIPTUNE, TITLE_FIRST, TITLE_LOVE, TITLE_SECOND, TITLE_THIRD } from "../tools/const";
import { isBest, isLove, isFirst, isSecond, isThird, isChiptune } from "../tools/modules";

let currentBtn = null;

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

function ModuleButton(year, mod, i, tracker) {
  return (
    <li id={year + "-" + i}>
      <button data-filename={mod.filename} onClick={play.bind(this, tracker)}>
        {isFirst(mod.name) ? <i title={TITLE_FIRST} className="icon first"></i> : ""}
        {isSecond(mod.name) ? <i title={TITLE_SECOND} className="icon second"></i> : ""}
        {isThird(mod.name) ? <i title={TITLE_THIRD} className="icon third"></i> : ""}
        {isBest(mod.name) ? <i title={TITLE_BEST} className="icon best"></i> : ""}
        {isLove(mod.name) ? <i title={TITLE_LOVE} className="icon love"></i> : ""}
        {isChiptune(mod.name) ? <i title={TITLE_CHIPTUNE} className="icon chiptune"></i> : ""}
        {mod.name}
      </button>
    </li>
  );
}

export default ModuleButton;
