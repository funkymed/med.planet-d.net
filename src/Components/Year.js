import ModuleButton from "./ModuleButton";
import { useEffect, useState } from "react";

function Years(props) {
  const { first, second, third, love, best, chiptune, query } = props;
  const [firstFilter, setFirstFilter] = useState(props.first);
  const [secondFilter, setSecondFilter] = useState(props.second);
  const [thirdFilter, setThirdFilter] = useState(props.third);
  const [bestFilter, setBestFilter] = useState(props.best);
  const [loveFilter, setLoveFilter] = useState(props.love);
  const [chiptuneFilter, setChiptuneFilter] = useState(props.chiptune);
  const [queryFilter, setQueryFilter] = useState(props.query);

  function updateFilter(_props) {
    setFirstFilter(_props.first);
    setSecondFilter(_props.second);
    setThirdFilter(_props.third);
    setBestFilter(_props.best);
    setLoveFilter(_props.love);
    setChiptuneFilter(_props.chiptune);
  }

  useEffect(() => {
    updateFilter({
      first,
      second,
      third,
      love,
      best,
      chiptune,
    });
  }, [first, second, third, love, best, chiptune]);

  useEffect(() => {
    setQueryFilter(query);
  }, [query]);

  return (
    <div id={"year-" + props.year}>
      <h2>{props.year}</h2>
      <ul>
        {props.mods.map(function (mod, i) {
          return (
            <ModuleButton
              mod={mod}
              key={i}
              tracker={props.tracker}
              first={firstFilter}
              second={secondFilter}
              third={thirdFilter}
              love={loveFilter}
              best={bestFilter}
              chiptune={chiptuneFilter}
              query={queryFilter}
              callbackAnalyser={props.callbackAnalyser}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Years;
