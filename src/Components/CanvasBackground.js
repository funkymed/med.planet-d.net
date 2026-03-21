import { useEffect, useRef, useState } from "react";
import ScrollText from "./ScrollText";
import Starfield from "./Starfield";
import { getInnerSize } from "../tools/tools";
import Rasters from "./Rasters";
import { subscribe, unsubscribe } from "../tools/renderLoop";

function CanvasBackground(props) {
  const context = useRef();
  const scrollCtx = useRef();
  const canvasBG = useRef(null);
  const canvasScroll = useRef(null);
  const size = useRef(getInnerSize());
  const rasts = useRef();
  const scroller = useRef();
  const stars = useRef();
  const quadExpanded = useRef(false);
  const canvasW = useRef(0);
  const canvasH = useRef(0);

  const [visible, setVisible] = useState(true);
  const reducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  function resizeCanvas() {
    size.current = getInnerSize();
    const w = size.current.width;
    const h = size.current.height;
    canvasW.current = w;
    canvasH.current = h;

    context.current.canvas.width = w;
    context.current.canvas.height = h;
    scrollCtx.current.canvas.width = w;
    scrollCtx.current.canvas.height = h;

    if (rasts.current) {
      rasts.current.updateSize(context.current);
    }
  }

  useEffect(() => {
    if (scrollCtx.current) {
      scroller.current = new ScrollText(scrollCtx.current, props.scrollText);
    }
    if (stars.current) {
      stars.current.forcePush({ key: " " });
    }
  }, [props.scrollText]);

  useEffect(() => {
    context.current = canvasBG.current.getContext("2d");
    scrollCtx.current = canvasScroll.current.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility, false);

    const observer = new MutationObserver(() => {
      quadExpanded.current = document.body.classList.contains("quadrascope-expanded");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    rasts.current = new Rasters(context.current);
    stars.current = new Starfield(context.current);

    subscribe("canvas-bg", (time) => {
      if (!visible || quadExpanded.current) return;

      const ctx = context.current;
      const sCtx = scrollCtx.current;
      ctx.clearRect(0, 0, canvasW.current, canvasH.current);
      sCtx.clearRect(0, 0, canvasW.current, canvasH.current);

      if (!reducedMotion.current) {
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
    });

    return () => {
      unsubscribe("canvas-bg");
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", resizeCanvas);
      if (stars.current) {
        stars.current.destroy();
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <canvas
        id="canvas-bg"
        aria-hidden="true"
        ref={canvasBG}
        width={size.current.width}
        height={size.current.height}
      />
      <canvas
        id="canvas-scrolltext"
        aria-hidden="true"
        ref={canvasScroll}
        width={size.current.width}
        height={size.current.height}
      />
    </>
  );
}

export default CanvasBackground;
