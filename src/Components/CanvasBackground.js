import { useEffect, useRef } from "react";
import Oscilloscope from "./Oscilloscope";
import Spectrum from "./Spectrum";
import { getInnerSize, hextoRGB } from "../tools/tools";
import Rasters from "./Rasters";

function CanvasBackground(props) {
  const requestRef = useRef();
  const context = useRef();
  const canvasBG = useRef(null);
  const size = useRef(getInnerSize());
  const analyser = useRef(props.analyser);
  const rasts = useRef();

  function resizeCanvas() {
    size.current = getInnerSize();
    context.current.canvas.width = size.current.width;
    context.current.canvas.height = size.current.height;
    if (rasts.current) {
      rasts.current.updateSize(context.current);
    }
  }

  useEffect(() => {
    analyser.current = props.analyser;
  }, [props.analyser]);

  useEffect(() => {
    const animate = (time) => {
      var cW = context.current.canvas.width;
      var cH = context.current.canvas.height;
      context.current.clearRect(0, 0, cW, cH);
      
      
      Spectrum(
        context.current,
        false,
        hextoRGB("#222222"),
        hextoRGB("#333333"),
        1,
        (size.current.width / 256) * 32,
        analyser.current
      );
      if (rasts.current) {
        rasts.current.animate(time);
      }
      Oscilloscope(
        context.current,
        false,
        "#cccccc",
        false,
        1,
        analyser.current
      );

      requestRef.current = requestAnimationFrame(animate);
    };
    context.current = canvasBG.current.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    requestRef.current = requestAnimationFrame(animate);
    rasts.current = new Rasters(context.current);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return <canvas ref={canvasBG} width={size.width} height={size.height} />;
}

export default CanvasBackground;
