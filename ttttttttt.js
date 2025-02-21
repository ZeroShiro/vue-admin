let str = "sdfafdsdsfaaaaaaa";
// let newStr = "";
// for (let i = 0; i < str.length; i++) {
//   if (newStr.indexOf(str[i]) == -1) {
//     newStr += str[i];
//   }
// }
// let newStr = "";
// let obj = {};
// for (let i = 0; i < str.length; i++) {
//   if (!obj[str[i]]) {
//     newStr += str[i];
//     obj[str[i]] = 1;
//   }
// }

// let arr = [1, 2, 3, 4, 45, 5, 6, 6, 6, 6];
// let newArr = [];
// let obj = {};
// for (let i = 0; i < arr.length; i++) {
//   if (!obj[arr[i]]) {
//     obj[arr[i]] = 1;
//     newArr.push(arr[i]);
//   }
// }
// for (let i = 0; i < arr.length; i++) {
//   if (newArr.indexOf(arr[i]) == -1) {
//     newArr.push(arr[i]);
//   }
// }
// console.log(newArr);
// let newStr = Array.from(new Set(str.split(""))).join("");
// console.log(newStr);
function throttle2(fn, delay = 100) {
  let last = 0;
  return function() {
    let curr = +new Date();
    if (curr - last > delay) {
      fn.apply(this, arguments);
      last = curr;
    }
  };
}
let fn = function() {
  console.log("1231");
};
throttle2(fn);
