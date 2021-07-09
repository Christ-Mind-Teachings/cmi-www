/*
 * Parse front matter from string
 * - no objects supported, just string
 */

export function parse(st) {
  let result = {content: st, data: {}};

  if (!st.startsWith("---")) {
    return result;
  }

  let pos = st.indexOf("---", 3);
  if (pos === -1) {
    return result;
  }

  result.content = st.substring(pos + 3).trim();

  //extract front matter
  let fmArray = st.substring(3, pos).split("\n").filter(i => i.length > 0);
  fmArray.forEach(i => {
    let cpos = i.indexOf(":");
    if (cpos > -1) {
      result.data[i.substring(0, cpos)] = i.substring(cpos + 1).trim();
    }
  });
  //console.log(fmArray);

  return result;
}




