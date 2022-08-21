function fizzbuzz(arrayLength) {
  let numberArr = [];
  numberArr = Array.from(
    { length: arrayLength },
    (num, index) => (num = index + 1)
  );

  let printArr = numberArr.map((num) => {
    if (num % 3 === 0) {
      return "FIZZ";
    } else if (num % 5 === 0) {
      return "BUZZ";
    } else if (num % 3 === 0 && num % 5 === 0) {
      return "FIZZBUZZ";
    } else return num;
  });
  return printArr;
}

console.table(fizzbuzz(10));
