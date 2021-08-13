import { DEFAULT_TITLE } from "../../tools/const";

export default function BtnStop(props) {
  function stop() {
    /*if (props.tracker.isPlaying) {
      props.tracker.stop();
      props.setTitleCallback(DEFAULT_TITLE);
    }*/
  }
  return (
    <button id="stop" className="btn" onClick={stop}>
      Stop
    </button>
  );
}
