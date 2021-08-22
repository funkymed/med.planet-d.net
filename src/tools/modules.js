export function getList(modules) {
  const list = [];
  for (let f in modules) {
    let d = modules[f].filename.split("/");
    if (typeof list[d[2]] === "undefined") {
      list[d[2]] = [];
    }
    list[d[2]].push({
      filename: modules[f].filename,
      size: modules[f].size,
      name: d[3],
      filters: modules[f]?.filters,
    });
  }

  const mapList = [];
  for (let year in list) {
    mapList.push({
      year,
      mods: list[year],
    });
  }
  return mapList;
}
