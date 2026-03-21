import { useState, useCallback } from "react";
import Title from "./Title";
import BtnAbout from "./ToolBar/BtnAbout";
import BtnStop from "./ToolBar/BtnStop";
import Filter from "./ToolBar/Filter";
import QuadrascopeView from "./QuadrascopeView";

export default function ToolBar(props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  return (
    <div id="toolbar">
      <div className="floatL">
        <Title title={props.title} />
      </div>
      <div id="filters">
        <Filter activeFilters={props.activeFilters} onToggle={props.onToggleFilter} />
      </div>
      <div className="floatR" id="control">
        <button
          className="btn"
          onClick={toggleExpanded}
          title={expanded ? "Reduce (Escape)" : "Expand Quadrascope"}
        >
          {expanded ? "Reduce" : "Scope"}
        </button>
        <BtnAbout />
        <BtnStop
          setTitleCallback={props.setTitleCallback}
          player={props.player}
        />
      </div>
      <QuadrascopeView
        player={props.player}
        expanded={expanded}
        onToggleExpanded={toggleExpanded}
      />
      <div className="clearfix"></div>
    </div>
  );
}
