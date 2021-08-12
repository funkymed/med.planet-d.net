export default function BtnStop(props) {
  function stop() {
    console.log(props)
    if (props.tracker.isPlaying) {
      props.tracker.stop();
    }
  }
  return (
    <button id="stop" className="btn" onClick={stop}>
      Stop
    </button>
  );
}
