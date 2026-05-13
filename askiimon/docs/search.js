let searchableIndex = [];

function buildIndex(data) {
  const index = [];
  for (const [methodName, methodData] of Object.entries(data)) {
    for (const [paramName, paramConfig] of Object.entries(methodData)) {
      if (paramConfig.type === undefined && typeof paramConfig === 'object') {
        for (const [nestedParam, nestedConfig] of Object.entries(paramConfig)) {
          index.push({
            method: methodName,
            path: `${methodName} ➔ ${paramName} ➔ ${nestedParam}`,
            param: nestedParam,
            type: nestedConfig.type || "",
            required: nestedConfig.required ?? false,
            default: nestedConfig.default ?? ""
          });
        }
      } else {
        index.push({
          method: methodName,
          path: `${methodName} ➔ ${paramName}`,
          param: paramName,
          type: paramConfig.type || "",
          required: paramConfig.required ?? false,
          default: paramConfig.default ?? ""
        });
      }
    }
  }
  return index;
}

async function init() {
  const response = await fetch("./api.json");
  const data = await response.json();
  searchableIndex = buildIndex(data);
}

function search(query) {
  if (!query.trim()) return [];
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const result = searchableIndex
    .map(doc => {
      let score = 0;
      const methodLower = doc.method.toLowerCase();
      const paramLower = doc.param.toLowerCase();
      const typeLower = doc.type.toLowerCase();

      tokens.forEach(token => {
        if (methodLower === token) score += 10;
        else if (methodLower.includes(token)) score += 5;
        if (paramLower === token) score += 8;
        else if (paramLower.includes(token)) score += 4;
        if (typeLower === token) score += 2;
      });

      return { ...doc, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
    console.log(result, searchableIndex)
  return result;
}


const searchJs = {
    search, buildIndex, init
}

export default searchJs;