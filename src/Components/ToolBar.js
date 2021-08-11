import Title from "./Title";

export default function ToolBar() {
  return (
    <div id="toolbar">
      <Title />
      <div className="floatR" id="control">
        <button id="pause" className="btn">
          Pause
        </button>
        <button id="stop" className="btn">
          Stop
        </button>
        <button id="hide" className="btn">
          Hide
        </button>
        <button id="info" className="btn">
          Info
        </button>
      </div>
      <div className="clearfix"></div>
    </div>
  );
}
