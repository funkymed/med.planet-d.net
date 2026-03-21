import {
  TITLE_BEST,
  TITLE_CHIPTUNE,
  TITLE_FIRST,
  TITLE_LOVE,
  TITLE_SECOND,
  TITLE_THIRD,
} from "../../tools/const";

const FILTER_DEFS = [
  { icon: "first", title: TITLE_FIRST },
  { icon: "second", title: TITLE_SECOND },
  { icon: "third", title: TITLE_THIRD },
  { icon: "love", title: TITLE_LOVE },
  { icon: "best", title: TITLE_BEST },
  { icon: "chiptune", title: TITLE_CHIPTUNE },
];

export default function Filter({ activeFilters, onToggle }) {
  return (
    <>
      <div>
        {FILTER_DEFS.map(function (item) {
          const isActive = activeFilters[item.icon] || false;
          return (
            <button
              key={item.icon}
              data-filter={item.icon}
              className={`btn filter-btn${isActive ? " selected" : ""}`}
              onClick={() => onToggle(item.icon)}
              aria-label={`Filter : ${item.title.toLowerCase()}`}
            >
              <i className={`icon big ${item.icon}`} aria-hidden="true" />
              <span className="filter-tooltip">{item.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
