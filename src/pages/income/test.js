let arr = [
  {time: 20, key: 'aa'},
  {time: 20, key: 'bb'},
  {time: 20, key: 'cc'},
  {time: 18, key: 'dd'},
  {time: 18, key: 'ee'},
  {time: 16, key: 'ff'},
  {time: 14, key: 'gg'},
  {time: 10, key: 'hh'},
  {time: 9, key: 'mm'},
  {time: 9, key: 'nn'},
  {time: 7, key: 'ss'},
  {time: 5, key: 'ww'},
  {time: 5, key: 'hy'},
  {time: 1, key: 'ko'}
]
let asy = []
let index = 0
for (let i = 0; i < arr.length; i++) {
  asy[index] = {deta: arr[i].time, list: [arr[i]]}
  for (let a = i + 1; a < arr.length; a++) {
    if(arr[i].time === arr[a].time){
      asy[index].list.push(arr[a])
      i++
      a = i
    }
  }
  index++
}
console.log(asy)
