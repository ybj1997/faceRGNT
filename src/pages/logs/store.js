let str = "{'method': 'mima', 'Person': '', 'Time': 'Thu May 12 23:12:27 2022'}, {'method': 'mima', 'Person': '', 'Time': 'Thu May 12 23:12:27 2022'}, {'method': 'renlian', 'Person': 'taosheng', 'Time': 'Fri May 13 15:32:15 2022'},{'method': 'renlian', 'Person': 'taosheng', 'Time': 'Fri May 13 15:32:23 2022'},{'method': 'renlian', 'Person': 'taosheng', 'Time': 'Fri May 13 15:32:34 2022'}"

let arr = eval("("+str+")");

console.log(arr)