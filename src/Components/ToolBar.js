import Title from "./Title";
import BtnAbout from "./ToolBar/BtnAbout";
import BtnStop from "./ToolBar/BtnStop";

export default function ToolBar(props) {
  return (
    <div id="toolbar">
      <Title title={props.title} />
      <div className="floatR" id="control">
        <BtnAbout tracker={props.tracker} />
        <BtnStop tracker={props.tracker} setTitleCallback={props.setTitleCallback} />
      </div>
      <div className="clearfix"></div>
    </div>
  );
}
