function factorial(num) {
  if (num === 1 || num === 0) {
    return 1;
  } else if (num > 1) {
    return factorial(num - 1) * num;
  } else if (num < 1) {
    return "complex number";
  }
}
console.log(factorial(7));
