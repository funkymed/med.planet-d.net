import { useState } from "react";
import {
  TITLE_BEST,
  TITLE_CHIPTUNE,
  TITLE_FIRST,
  TITLE_LOVE,
  TITLE_SECOND,
  TITLE_THIRD,
} from "../../tools/const";

export default function Filter(props) {
  const [filters, setFilters] = useState([
    { icon: "first", title: TITLE_FIRST, actived: false },
    { icon: "second", title: TITLE_SECOND, actived: false },
    { icon: "third", title: TITLE_THIRD, actived: false },
    { icon: "love", title: TITLE_LOVE, actived: false },
    { icon: "best", title: TITLE_BEST, actived: false },
    { icon: "chiptune", title: TITLE_CHIPTUNE, actived: false },
  ]);

  const toggleSelected = (e) => {
    e.target.classList.toggle("selected");
    const icon = e.target.dataset.filter;
    const activated = e.target.classList.contains("selected");

    const newFilters = filters.map(f =>
      f.icon === icon ? { ...f, actived: activated } : f
    );
    setFilters(newFilters);
    props.callback(null, newFilters);
  };

  return (
    <>
      <div>
        {filters.map(function (item, i) {
          return (
            <button
              key={i}
              data-filter={item.icon}
              className="btn"
              onClick={toggleSelected}
              title={`Filter : ${item.title.toLowerCase()}`}
            >
              <i className={`icon big ${item.icon}`} />
            </button>
          );
        })}
      </div>
    </>
  );
}
