import { DEFAULT_TITLE } from "../../tools/const";
import { useNavigate } from "react-router-dom";

export default function BtnStop(props) {
  let navigate = useNavigate();
  function stop() {
    if (props.player) {
      const buttons = document.querySelectorAll("li > button");

      for (let button of buttons) {
        button.className = "";
        button.closest("li").className = "";
      }
      props.player.stop();
      navigate("/");
      props.setTitleCallback(DEFAULT_TITLE);
    }
  }
  return (
    <button id="stop" className="btn" onClick={stop}>
      Stop
    </button>
  );
}
