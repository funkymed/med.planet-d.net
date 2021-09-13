import { DEFAULT_TITLE } from "../../tools/const";
import { useHistory } from "react-router-dom";

export default function BtnStop(props) {
  let history = useHistory();
  function stop() {
    if (props.player) {
      const buttons = document.querySelectorAll("li > button");

      for (let button of buttons) {
        button.className = "";
        button.closest("li").className = "";
      }
      props.player.stop();
      history.push("/");
      props.setTitleCallback(DEFAULT_TITLE);
    }
  }
  return (
    <button id="stop" className="btn" onClick={stop}>
      Stop
    </button>
  );
}
