import { isBest, isLove, isFirst, isSecond, isThird } from "../modules";

let currentBtn = null;

function play(tracker, evt) {
  if (currentBtn) {
    currentBtn.className = "";
  }
  currentBtn = evt.target;
  const filename = currentBtn.attributes.getNamedItem("data-filename").value;
  currentBtn.className = "active";
  currentBtn.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
  if (tracker.isPlaying) {
    tracker.stop();
  }

  tracker.load(filename);
}

function ModuleButton(year, mod, i, tracker) {
  return (
    <li id={year + "-" + i}>
      <button data-filename={mod.filename} onClick={play.bind(this, tracker)}>
        {isFirst(mod.name) ? <i className="icon first"></i> : ""}
        {isSecond(mod.name) ? <i className="icon second"></i> : ""}
        {isThird(mod.name) ? <i className="icon third"></i> : ""}
        {isBest(mod.name) ? <i className="icon best"></i> : ""}
        {isLove(mod.name) ? <i className="icon love"></i> : ""}
        {mod.name}
      </button>
    </li>
  );
}

export default ModuleButton;
