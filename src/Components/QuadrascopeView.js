import { useEffect, useRef, useCallback } from "react";
import Quadrascope from "./Quadrascope";
import { subscribe, unsubscribe } from "../tools/renderLoop";

const SMALL_H = 70;
const THROTTLE_MS = 33; // ~30fps in small mode

export default function QuadrascopeView({ player, expanded, onToggleExpanded }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const scopeRef = useRef(null);
  const playerRef = useRef(null);
  const expandedRef = useRef(false);
  const lastFrameRef = useRef(0);

  const positionContainer = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || expandedRef.current) return;

    const filters = document.getElementById("filters");
    const control = document.getElementById("control");
    if (!filters || !control) return;

    const filtersRight = filters.offsetLeft + filters.offsetWidth;
    const controlLeft = control.offsetLeft;
    const padding = 15;
    const w = Math.max(200, controlLeft - filtersRight - padding * 2);

    container.style.left = (filtersRight + padding) + "px";
    canvas.style.width = w + "px";
    canvas.width = w;
  }, []);

  useEffect(() => {
    playerRef.current = player;
    if (!scopeRef.current || !player) return;
    scopeRef.current.setChannelCount(player.channels || 4);
  }, [player]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    scopeRef.current = new Quadrascope(canvas.getContext("2d"));

    subscribe("quadrascope", (timestamp) => {
      // Throttle in small mode
      if (!expandedRef.current) {
        if (timestamp - lastFrameRef.current < THROTTLE_MS) return;
      }
      lastFrameRef.current = timestamp;

      const p = playerRef.current;
      if (p) {
        const count = p.channels || 4;
        if (count !== scopeRef.current.channelCount) {
          scopeRef.current.setChannelCount(count);
        }
      }
      scopeRef.current.animate(playerRef.current);
    });

    positionContainer();
    window.addEventListener("resize", positionContainer);

    return () => {
      unsubscribe("quadrascope");
      window.removeEventListener("resize", positionContainer);
    };
  }, [positionContainer]);

  useEffect(() => {
    expandedRef.current = expanded;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (scopeRef.current) scopeRef.current.expanded = expanded;

    if (expanded) {
      const toolbar = document.getElementById("toolbar");
      const toolbarH = toolbar ? toolbar.offsetHeight : 101;
      canvas.style.width = "";
      canvas.style.height = "";
      if (containerRef.current) containerRef.current.style.left = "";
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - toolbarH;
      document.body.classList.add("quadrascope-expanded");
    } else {
      canvas.height = SMALL_H;
      document.body.classList.remove("quadrascope-expanded");
      requestAnimationFrame(positionContainer);
    }
  }, [expanded, positionContainer]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => {
      if (e.key === "Escape") onToggleExpanded();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded, onToggleExpanded]);

  const handleClick = useCallback(() => {
    if (scopeRef.current) scopeRef.current.cycleMode();
  }, []);

  return (
    <div id="quadrascope-container" ref={containerRef}>
      <canvas
        ref={canvasRef}
        id="quadrascope"
        className={expanded ? "expanded" : ""}
        aria-hidden="true"
        width={350}
        height={SMALL_H}
        onClick={handleClick}
        title="Click to change view mode"
      />
    </div>
  );
}
