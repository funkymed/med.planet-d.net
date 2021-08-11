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
  analyser.smoothingTimeConstant = 0.75;
  analyser.fftSize = 2048;
  //props.audioContext.destination.connect(analyser);

  const animate = (time) => {
    Spectrum(
      context,
      false,
      hextoRGB("#222222"),
      hextoRGB("#333333"),
      1,
      (size.current.width / 256) * 16
    );
    Oscilloscope(context.current, false, "#cccccc", 1, analyser);
    requestRef.current = requestAnimationFrame(animate);
  };

  size.current = getInnerSize();
  useEffect(() => {
    context.current = canvasBG.current.getContext("2d");
    requestRef.current = requestAnimationFrame(animate);

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return function () {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    };
  }, []);

  return <canvas ref={canvasBG} width={size.width} height={size.height} />;
}

export default CanvasBackground;
