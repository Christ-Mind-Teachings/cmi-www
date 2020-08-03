function _getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/*
  "carbon-fibre",
  "dark-paths",
  "folk-pattern",
*/

const styles = [
  "silver-diagonal",
  "wax-diagonal",
  "violet-diagonal",
  "double-bubble",
  "diamond",
  "full-bloom",
  "leaves",
  "terrazzo",
  "pow-star",
  "repeated-square",
  "triangle-mosaic"
];

export function getRandomStyle() {
  return styles[_getRandomInt(styles.length)]; 
}

