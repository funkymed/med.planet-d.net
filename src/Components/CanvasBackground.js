import { useEffect, useRef, useState} from "react";
import Oscilloscope from "./Oscilloscope";
import Spectrum from "./Spectrum";
import { getInnerSize, hextoRGB } from "../tools/tools";

let clock = null;
function CanvasBackground(props) {
  const requestRef = useRef();
  const context = useRef();
  const canvasBG = useRef(null);
  const size = useRef(getInnerSize());

  function resizeCanvas() {
    size.current = getInnerSize();
    context.current.canvas.width = size.current.width;
    context.current.canvas.height = size.current.height;
  }

  const animate = (time) => {
    console.log(props.analyser)
    if (props.analyser) {
      /*Spectrum(
      context,
      false,
      hextoRGB("#222222"),
      hextoRGB("#333333"),
      1,
      (size.current.width / 256) * 16
    );*/

      Oscilloscope(context.current, false, "#cccccc", false, 1, props.analyser);
    }

    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    context.current = canvasBG.current.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return <canvas ref={canvasBG} width={size.width} height={size.height} />;
}

export default CanvasBackground;
