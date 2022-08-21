function stairPattern(num) {
  let string_pattern = "";
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < i + 1; j++) {
      string_pattern += "* ";
    }
    string_pattern += "\n";
  }
  return string_pattern;
}
console.log(stairPattern(5));
