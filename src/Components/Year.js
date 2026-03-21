import ModuleButton from "./ModuleButton";

function Years(props) {
  const { first, second, third, love, best, chiptune, query } = props;

  return (
    <div id={"year-" + props.year}>
      <h2>{props.year}</h2>
      <ul>
        {props.mods.map(function (mod, i) {
          return (
            <ModuleButton
              mod={mod}
              key={i}
              first={first}
              second={second}
              third={third}
              love={love}
              best={best}
              chiptune={chiptune}
              query={query}
              text={mod.text}
              callbackAnalyser={props.callbackAnalyser}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Years;
