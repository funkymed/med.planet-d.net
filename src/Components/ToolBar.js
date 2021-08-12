import Title from "./Title";
import BtnAbout from "./ToolBar/BtnAbout";
import BtnStop from "./ToolBar/BtnStop";

export default function ToolBar(props) {
  return (
    <div id="toolbar">
      <Title />
      <div className="floatR" id="control">
        <BtnAbout tracker={props.tracker} />
        <BtnStop tracker={props.tracker} />
      </div>
      <div className="clearfix"></div>
    </div>
  );
}
