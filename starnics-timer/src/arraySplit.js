const array = [1, 2, 3, 4, 5, 6];

const midPoint = Math.ceil(array.length / 2);

const arrFirstHalf = array.slice(0, midPoint);
const arrSecondHalf = array.slice(-midPoint);

console.log(arrFirstHalf);
console.log(arrSecondHalf);
