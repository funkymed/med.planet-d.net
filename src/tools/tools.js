export function getInnerSize() {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight || e.clientHeight || g.clientHeight;
  return { width, height };
}

export function getList(modules) {
  const list = [];
  for (let f in modules) {
    let d = modules[f].filename.split("/");

    if (typeof list[d[1]] === "undefined") {
      list[d[1]] = [];
    }
    list[d[1]].push({
      filename: modules[f].filename,
      size: modules[f].size,
      name: d[2].toLowerCase(),
      filters: modules[f]?.filters,
      text: modules[f]?.text,
    });
  }

  const mapList = [];
  for (let year in list) {
    mapList.push({
      year,
      mods: list[year].sort((a, b) => (a.name < b.name ? -1 : 1)),
    });
  }
  mapList.reverse();
  return mapList;
}
