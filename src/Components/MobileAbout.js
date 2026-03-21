import React from "react";
import {
  TITLE_BEST,
  TITLE_CHIPTUNE,
  TITLE_FIRST,
  TITLE_LOVE,
  TITLE_SECOND,
  TITLE_THIRD,
} from "../tools/const";
import modules_med from "../tools/modules_med";

const legend = [
  { title: TITLE_FIRST, icon: "first" },
  { title: TITLE_SECOND, icon: "second" },
  { title: TITLE_THIRD, icon: "third" },
  { title: TITLE_CHIPTUNE, icon: "chiptune" },
  { title: TITLE_LOVE, icon: "love" },
  { title: TITLE_BEST, icon: "best" },
];

const filterCounts = {};
legend.forEach(item => {
  filterCounts[item.icon] = modules_med.filter(
    mod => mod.filters && mod.filters[item.icon]
  ).length;
});
const totalTracks = modules_med.length;

export default function MobileAbout() {
  return (
    <div id="mobile-about">
      <h2>About</h2>
      <p>
        Here is the <b>Ultimate Med's MusicDisk.</b>
      </p>
      <p>
        All the tracks were created with Protracker or Fasttracker II
        for the Demoscene.
      </p>
      <p>Stay here all the time you want, enjoy and relax.</p>

      <h2>Legend <span className="mobile-count">({totalTracks} tracks)</span></h2>
      <div className="mobile-legend">
        {legend.map(function (item) {
          return (
            <div key={item.icon} className="mobile-legend-item">
              <i className={`icon ${item.icon} shadowed`} aria-hidden="true"></i>
              <span>{item.title}</span>
              <span className="mobile-count">({filterCounts[item.icon]})</span>
            </div>
          );
        })}
      </div>

      <p className="center">
        If you have any requests or questions feel free to contact me :
        cyril.pereira at gmail.com
      </p>
    </div>
  );
}
