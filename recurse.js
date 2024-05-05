// const getMaxCallStackSize = (i) => {
//   try {
//     return getMaxCallStackSize(++i);
//   } catch {
//     return i;
//   }
// };

// console.log(getMaxCallStackSize(0));

const factorial = (n) => {
  let rnd = Math.random() * 5;
  if (n === 0) {
    return 1;
  } else {
    console.log(rnd);
    let fct = factorial(n - 1);
    console.log(rnd);
    return n * fct;
  }
};
console.log(factorial(10));
