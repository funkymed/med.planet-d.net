import Title from "./Title";
import BtnAbout from "./ToolBar/BtnAbout";
import BtnStop from "./ToolBar/BtnStop";
import Filter from "./ToolBar/Filter";

export default function ToolBar(props) {
  return (
    <div id="toolbar">
      <div className="floatL">
        <Title title={props.title} />
      </div>
      <div id="filters">
        <Filter callback={props.callbackFilter}/>
      </div>
      <div className="floatR" id="control">
        <BtnAbout />
        <BtnStop
          setTitleCallback={props.setTitleCallback}
          player={props.player}
        />
      </div>
      <div className="clearfix"></div>
    </div>
  );
}
