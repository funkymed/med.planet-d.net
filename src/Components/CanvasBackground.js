import { useEffect, useRef, useState } from "react";
import Spectrum from "./Spectrum2";
import ScrollText from "./ScrollText";
import Starfield from "./Starfield";
import Smoke from "./Smoke";
import { getInnerSize, hextoRGB } from "../tools/tools";
import Rasters from "./Rasters";

function CanvasBackground(props) {
  const requestRef = useRef();
  const context = useRef();
  const canvasBG = useRef(null);
  const size = useRef(getInnerSize());
  const analyser = useRef(props.analyser);
  const rasts = useRef();
  const scroller = useRef();
  const spectr = useRef();
  const stars = useRef();
  const smoke = useRef();

  const [visible, setVisible] = useState(true);
  const reducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  function resizeCanvas() {
    size.current = getInnerSize();
    context.current.canvas.width = size.current.width;
    context.current.canvas.height = size.current.height;
    // context.current.globalCompositeOperation = "luminosity";
    if (rasts.current) {
      rasts.current.updateSize(context.current);
    }
  }

  useEffect(() => {
    analyser.current = props.analyser;

    spectr.current = new Spectrum(
      context.current,
      hextoRGB("#222222"),
      hextoRGB("#333333"),
      .1,
      (size.current.width / 256) * 92,
      analyser.current
    );
  }, [props.analyser]);

  useEffect(() => {
    if (context.current) {
      scroller.current = new ScrollText(context.current, props.scrollText);
    }
    if (stars.current) {
      stars.current.forcePush({ key: " " });
    }
  }, [props.scrollText]);

  const animate = (time) => {
    if (visible) {
      var cW = context.current.canvas.width;
      var cH = context.current.canvas.height;
      
      context.current.clearRect(0, 0, cW, cH);
      
      
      if (!reducedMotion.current) {
        if (smoke.current) {
          smoke.current.update();
          smoke.current.draw(time);
        }
        if (stars.current) {
          stars.current.animate(time);
        }
        if (rasts.current) {
          rasts.current.animate(time);
        }
        if (scroller.current) {
          scroller.current.animate(time);
        }
      }
      if (spectr.current) {
        spectr.current.animate();
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
    stars.current = new Starfield(context.current);
    smoke.current = new Smoke(context.current)
    return function cleanup() {
      cancelAnimationFrame(requestRef.current);
      document.removeEventListener("visibilitychange", cleanUpVisible);
      window.removeEventListener("resize", resizeCanvas);
      if (stars.current) {
        stars.current.destroy();
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <canvas
      aria-hidden="true"
      ref={canvasBG}
      width={size.width}
      height={size.height}
    />
  );
}

export default CanvasBackground;
