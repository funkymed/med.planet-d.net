import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import FlodPlayer from "funkymed-flod-module-player/src/FlodPlayer";
import ajaxLoader from "funkymed-flod-module-player/src/ajaxLoader";
let player = null;
export default function Loader(props) {
  let location = useLocation();
  const progress = useRef(null);

  function load(filename) {
    let currentBtn;
    let li;
    const buttons = document.querySelectorAll("li > button");

    for (let button of buttons) {
      button.className = "";
      button.closest("li").className = "";
      if (
        "/" + button.attributes.getNamedItem("data-filename").value ===
        filename
      ) {
        currentBtn = button;
      }
    }
    if (currentBtn) {
      currentBtn.className = "active";
      li = currentBtn.closest("li");
      li.className = "active";
      currentBtn.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }

    progress.current.style.width = 0;
    progress.current.style.opacity = 1;

    ajaxLoader(
      `./${filename}`,
      function (bytes) {
        if (player) {
          player.stop();
        }

        player = FlodPlayer.load(bytes);
        player.loopSong = true;
        player.play();

        props.callbackAnalyser(player, filename, li);
        progress.current.style.width = "100%";

        setTimeout(
          (progress) => {
            progress.current.style.opacity = 0;
          },
          200,
          progress
        );
      },
      function (percentage) {
        progress.current.style.width = `${percentage}%`;
      }
    );
  }

  useEffect(() => {
    setTimeout(function () {
      load(location.pathname);
    }, 300); 
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <div id="loader">
      <div id="progress" ref={progress} />
    </div>
  );
}
