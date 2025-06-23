const time = Date.now();
const date = new Date(time);
const month = date.getMonth()
const year = date.getFullYear()
const day = date.getDate()
const h = date.getHours()
const m = date.getMinutes()
const s  = date.getSeconds()
console.log(day, month+1, year, h, m, s)