import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  TITLE_BEST,
  TITLE_CHIPTUNE,
  TITLE_FIRST,
  TITLE_LOVE,
  TITLE_SECOND,
  TITLE_THIRD,
} from "../tools/const";

function ModuleButton(props) {
  const { first, second, third, love, best, chiptune, query, mod } = props;
  let navigate = useNavigate();

  const modFilters = mod?.filters;

  // Compute visibility in a single expression - no state, no effects
  const show = useMemo(() => {
    // Query filter
    if (query && query.trim() !== "") {
      if (!mod.name.toLowerCase().includes(query)) return false;
    }

    // Category filters: if none active, show all
    const anyFilterActive = first || second || third || best || love || chiptune;
    if (!anyFilterActive) return true;

    // Show if mod matches any active filter
    return (
      (modFilters?.first && first) ||
      (modFilters?.second && second) ||
      (modFilters?.third && third) ||
      (modFilters?.best && best) ||
      (modFilters?.love && love) ||
      (modFilters?.chiptune && chiptune) ||
      false
    );
  }, [first, second, third, love, best, chiptune, query, mod, modFilters]);

  function play(evt) {
    evt.preventDefault();
    const filename = evt.target.attributes.getNamedItem("data-filename").value;
    navigate(`/${filename}`);
  }

  if (!show) return null;

  return (
    <li data-text={props.text}>
      <button data-filename={mod?.filename} onClick={play}>
        {modFilters?.first ? (
          <i title={TITLE_FIRST} className="icon first" aria-hidden="true"></i>
        ) : null}
        {modFilters?.second ? (
          <i title={TITLE_SECOND} className="icon second" aria-hidden="true"></i>
        ) : null}
        {modFilters?.third ? (
          <i title={TITLE_THIRD} className="icon third" aria-hidden="true"></i>
        ) : null}
        {modFilters?.best ? (
          <i title={TITLE_BEST} className="icon best" aria-hidden="true"></i>
        ) : null}
        {modFilters?.love ? (
          <i title={TITLE_LOVE} className="icon love" aria-hidden="true"></i>
        ) : null}
        {modFilters?.chiptune ? (
          <i title={TITLE_CHIPTUNE} className="icon chiptune" aria-hidden="true"></i>
        ) : null}
        {mod.name}
        <span className="floatR">{mod.size}</span>
      </button>
    </li>
  );
}

export default React.memo(ModuleButton);
