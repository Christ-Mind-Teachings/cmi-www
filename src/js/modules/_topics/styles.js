function _getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const styles = [
  "silver-diagonal",
  "wax-diagonal",
  "violet-diagonal",
  "double-bubble",
  "carbon-fibre",
  "dark-paths",
  "diamond",
  "folk-pattern",
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

