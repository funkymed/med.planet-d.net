import React, { useState } from "react";
import {
  TITLE_BEST,
  TITLE_CHIPTUNE,
  TITLE_FIRST,
  TITLE_LOVE,
  TITLE_SECOND,
  TITLE_THIRD,
} from "../../tools/const";
import Popup from "../Popup";

const legend = [
  { title: TITLE_FIRST, icon: "first" },
  { title: TITLE_SECOND, icon: "second" },
  { title: TITLE_THIRD, icon: "third" },
  { title: TITLE_CHIPTUNE, icon: "chiptune" },
  { title: TITLE_LOVE, icon: "love" },
  { title: TITLE_BEST, icon: "best" },
];

export default function BtnAbout() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="floatL">
      <button id="stop" className="btn " onClick={togglePopup}>
        About
      </button>
      {isOpen && (
        <Popup
          btnClose={true}
          content={
            <>
              <b>About</b>
              <br />
              <br />
              <p>
                Here is the <b>Ultimate Med's MusicDisk.</b>
              </p>
              <p>
                All the tracks were created with Protracker or Fasttracker II
                for the Demoscene.
              </p>
              <br />
              <p>Stay here all the time you want, enjoy and relax.</p>

              <br />
              <b>Legend</b>
              <br />
              <br />
              <p>
                {legend.map(function (item) {
                  return (
                    <div>
                      <i className={`icon ${item.icon} shadowed`}></i>{" "}
                      {item.title}
                      <br />
                      <div className="clearfix"></div>
                    </div>
                  );
                })}
              </p>

              <br />
              <p className="center">
                If you have any requests or questions feel free to contact me :
                cyril.pereira at gmail.com
              </p>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}
