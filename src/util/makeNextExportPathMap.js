function makeNextExportPathMap(pathMap) {
  if (!Array.isArray(pathMap)) return {};

  const nextExportPathMap = { '/': { page: '/' } };
  pathMap.forEach(function (oneGroup) {
    const baseUri = oneGroup.pathname;
    const nameList = oneGroup.children;
    if (nameList == null) {
      const page = `/${baseUri}`;
      nextExportPathMap[page] = { page };
    } else {
      nameList.forEach(function (oneName) {
        const page = `/${baseUri}/${oneName}`;
        nextExportPathMap[page] = { page };
      });
    }
  });
  return nextExportPathMap;
}

module.exports = makeNextExportPathMap;
