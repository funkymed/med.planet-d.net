import { useEffect, useRef, useState } from "react";
import Oscilloscope from "./Oscilloscope";
import Spectrum from "./Spectrum2";
import { getInnerSize, hextoRGB } from "../tools/tools";
import Rasters from "./Rasters";

function CanvasBackground(props) {
  const requestRef = useRef();
  const context = useRef();
  const canvasBG = useRef(null);
  const size = useRef(getInnerSize());
  const analyser = useRef(props.analyser);
  const rasts = useRef();
  const oscilo = useRef();
  const spectr = useRef();

  const [visible, setVisible] = useState(true);

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
    oscilo.current = new Oscilloscope(
      context.current,
      "#cccccc",
      false,
      1,
      analyser.current
    );

    spectr.current = new Spectrum(
      context.current,
      hextoRGB("#222222"),
      hextoRGB("#333333"),
      1,
      (size.current.width / 256) * 32,
      analyser.current
    );
  }, [props.analyser]);

  const animate = (time) => {
    if (visible) {
      var cW = context.current.canvas.width;
      var cH = context.current.canvas.height;
      context.current.clearRect(0, 0, cW, cH);

      if (spectr.current) {
        spectr.current.animate();
      }
      if (oscilo.current) {
        oscilo.current.animate();
      }

      if (rasts.current) {
        rasts.current.animate(time);
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  };
  function cleanUpVisible() {
    if (document.hidden) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }

  useEffect(() => {
    context.current = canvasBG.current.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    // save cpu
    document.addEventListener("visibilitychange", cleanUpVisible, false);
    requestRef.current = requestAnimationFrame(animate);
    rasts.current = new Rasters(context.current);

    return function cleanup() {
      cancelAnimationFrame(requestRef.current);
      document.removeEventListener("visibilitychange", cleanUpVisible);
      window.removeEventListener("resize", resizeCanvas);
    };
    // eslint-disable-next-line
  }, []);

  return <canvas ref={canvasBG} width={size.width} height={size.height} />;
}

export default CanvasBackground;
