import Title from "./Title";
import BtnAbout from "./ToolBar/BtnAbout";
import BtnStop from "./ToolBar/BtnStop";
import Filter from "./ToolBar/Filter";
import { useEffect, useRef } from "react";
import Oscilloscope from "./Oscilloscope";
import { getInnerSize } from "../tools/tools";

export default function ToolBar(props) {
  const analyser = useRef(props.analyser);
  const context = useRef();
  const oscilo = useRef();
  const canvasBG = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    analyser.current = props.analyser;
    oscilo.current = new Oscilloscope(
      context.current,
      "#cccccc",
      false,
      1,
      analyser.current
    );
  }, [props.analyser]);

  const animate = (time) => {
    var cW = context.current.canvas.width;
    var cH = context.current.canvas.height;
    context.current.clearRect(0, 0, cW, cH);

    if (oscilo.current) {
      oscilo.current.animate();
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    context.current = canvasBG.current.getContext("2d");
    // const size = getInnerSize();
    // canvasBG.current.width = size.width / 3;

    requestRef.current = requestAnimationFrame(animate);
    return function cleanup() {
      cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div id="toolbar">
      <div className="floatL">
        <Title title={props.title} />
      </div>
      <div id="filters">
        <Filter callback={props.callbackFilter} />
      </div>
      <div className="floatR" id="control">
        <canvas
          ref={canvasBG}
          className="floatL"
          width={300}
          height={"80%"}
          style={{
            marginTop: 10,
            marginRight: 5,
            position: "relative",
            background: "black",
            borderRadius: 15,
          }}
        />
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
