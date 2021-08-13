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
  const [query, setQuery] = useState();
  const [filters, setFilters] = useState([
    { icon: "first", title: TITLE_FIRST, actived: false },
    { icon: "second", title: TITLE_SECOND, actived: false },
    { icon: "third", title: TITLE_THIRD, actived: false },
    { icon: "love", title: TITLE_LOVE, actived: false },
    { icon: "best", title: TITLE_BEST, actived: false },
    { icon: "chiptune", title: TITLE_CHIPTUNE, actived: false },
  ]);

  function update() {
    props.callback(query, filters);
  }

  function onChange(e) {
    setQuery(e.target.value);
    update();
  }

  function togglerFilter(icon, activated) {
    const filtR = filters;
    for (let filter in filtR) {
      if (filtR[filter].icon === icon) {
        filtR[filter].actived = activated;
      }
    }
    setFilters(filtR);
  }

  const toggleSelected = (e) => {
    e.target.classList.toggle("selected");
    if (e.target.classList.contains("selected")) {
      togglerFilter(e.target.dataset.filter, true);
    } else {
      togglerFilter(e.target.dataset.filter, false);
    }
    update();
  };

  return (
    <>
      <input onChange={onChange} value={query} />
      <div>
        {filters.map(function (item) {
          return (
            <button
              data-filter={item.icon}
              className="btn"
              onClick={toggleSelected}
              title={`Filter : ${item.title.toLowerCase()}`}
            >
              <i className={`icon small ${item.icon}`} />
            </button>
          );
        })}
      </div>
    </>
  );
}
