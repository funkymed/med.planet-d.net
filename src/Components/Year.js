import ModuleButton from "./ModuleButton";

function displayYear(mods, year, tracker) {
  return (
    <div id={"year-" + year}>
      <h2>{year}</h2>
      <ul>
        {mods.map(function (mod, i) {
          return ModuleButton(year, mod, i, tracker);
        })}
      </ul>
    </div>
  );
}

export default displayYear;
