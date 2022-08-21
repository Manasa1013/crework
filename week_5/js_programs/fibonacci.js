function fibonacci(count) {
  let first = 0;
  let second = 1;
  let third = 1;
  let fibArr = [];
  for (let i = 0; i < count; i++) {
    fibArr.push(third);
    third = first + second;
    first = second;
    // fibArr.push(second);
    second = third;
    // fibArr.push(first);
  }
  return fibArr;
}
console.log(fibonacci(5));
