import ModuleButton from "./ModuleButton";

function Years(props) {
  return (
    <div id={"year-" + props.year}>
      <h2>{props.year}</h2>
      <ul>
        {props.mods.map(function (mod, i) {
          return (
            <ModuleButton
              key={i}
              year={props.year}
              mod={mod}
              tracker={props.tracker}
              query={props.query}
              filters={props.filters}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Years;
