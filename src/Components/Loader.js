import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FlodPlayer from "funkymed-flod-module-player/src/FlodPlayer";
import ajaxLoader from "funkymed-flod-module-player/src/ajaxLoader";
let player = null;
export default function Loader(props) {
  let location = useLocation();

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
        document.getElementById("progress").style.width = "100%";
        setTimeout(() => {
          document.getElementById("progress").style.width = 0;
        }, 200);
      },
      function (percentage) {
        document.getElementById("progress").style.width = `${percentage}%`;
      }
    );
  }

  useEffect(() => {
    setTimeout(function () {
      console.log("loading : ", location.pathname);
      load(location.pathname);
    }, 300);
  }, [location.pathname]);

  return (
    <div id="loader">
      <div id="progress"></div>
    </div>
  );
}
