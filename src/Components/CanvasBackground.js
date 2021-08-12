import { useEffect, useRef } from "react";
import Oscilloscope from "./Oscilloscope";
import Spectrum from "./Spectrum";
import { getInnerSize, hextoRGB } from "../tools/tools";

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

  const analyser = props.audioContext.createAnalyser();
  //analyser.smoothingTimeConstant = 0.75;
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;
  analyser.fftSize = 256; //2048;
  analyser.connect(props.audioContext.destination);
  console.log(props);

  const animate = (time) => {
    /*Spectrum(
      context,
      false,
      hextoRGB("#222222"),
      hextoRGB("#333333"),
      1,
      (size.current.width / 256) * 16
    );*/
    Oscilloscope(context.current, false, "#cccccc", false, 1, analyser);
    requestRef.current = requestAnimationFrame(animate);
  };

  size.current = getInnerSize();
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
