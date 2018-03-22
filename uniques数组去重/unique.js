//最原始的方法--兼容性好
var arr = [1, 1, '1', '1']
function unique1(arr) {
    //res存储去重后的数组
    var res = []
    var arrLen = arr.length
    var resLen = res.length
    for (let i = 0; i < arrLen; i++) {
        for (let j = 0; j < resLen; j++) {
            if (arr[i] === res[j]) {
                break
            }
        }
        if (j === resLen) {
            res.push(arr[i])
        }
    }
    return res
}

//用indexOf优化内层循环
function unique2(arr) {
    var res = []
    var arrLen = arr.length
    for (let i = 0; i < arrLen; i++) {
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i])
        }
    }
    return res
}

//先排序后去重
function unique3(arr) {
    var res = []
    var sortedArray = arr.concat().sort()
    var sortLen = sortedArray.length
    var seen
    for (let i = 0; i < sortLen; i++) {
        //如果第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i]
    }
    return res
}

//知道了这两种方法后，我们可以去尝试写一个名为 unique 的工具函数
//们根据一个参数 isSorted 判断传入的数组是否是已排序的，如果为 true，我们就判断相邻元素是否相同
//如果为 false，我们就使用 indexOf 进行判断
//而且考虑一个新需求：字母的大小写视为一致，比如'a'和'A'，保留一个就可以了
var arr = [1, 1, 'a', 'A', 2, 2]
function unique4(arr,isSorted,iteratee) {
    //iteratee 迭代、重复
    var res = []
    var seen = []
    var len = array.length
    for (let i = 0; i < len; i++) {
        var value = arr[i]
        var computed = iteratee ? iteratee(value,i,array) : value
        if (isSorted) {
            if (!i || seen !== computed) {
                res.push(value)
            }
            seen = computed
        } else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed)
                res.push(value)
            }
        } else if (res.indexOf(value) === -1) {
            res.push(value)
        }
    }
    return res
}
unique4(arr2,false,function(item) {
    return typeof item == 'string'?item.toLowerCase():item
})

//ES5 filter

var arr = [1, 2, 1, 1, '1']
//数组未排序
function unique5(arr) {
    var res = arr.filter((item,index,arr) => {
        return arr.indexOf(item) === index
    })
    return res
}
//数组已排序
function unique6(arr) {
    return array.concat().sort().filter((item,index,array) => {
        return !index || item !== arr[index-1]
    })
}


//Object键值对去重
var arr = [1, 2, 1, 1, '1']
function unique(arr) {
    var obj = {}
    return arr.filter((item,index,arr) => {
        return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
}

//1 和 '1' 是不同的，但是上面的方法会判断为同一个值
//typeof item + item 拼成字符串作为 key 值来避免这个问题 number1 string1
function unique(arr) {
    var obj = {}
    return arr.filter((item,index,arr) => {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}

//新问题:依然无法正确区分出两个对象，比如 {value: 1} 和 {value: 2}
//因为 typeof item + item 的结果都会是 object[object Object]
//使用 JSON.stringify 将对象序列化来解决这个问题
function unique(arr) {
    var obj = {}
    return arr.filter((item,index,arr) => {
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ?
        false : (obj[typeof item + JSON.stringify(item)])
    })
}

//ES6 Set和Map
var arr = [1, 2, 1, 1, '1']
function unique(arr) {
    return Array.from(new Set(arr))
}
//简化下
function unqiue(arr) {
    return [...new Set(arr)]
}

//使用Map
function unique(arr) {
    const seen = new Map()
    return arr.filter((item) => {
        return !seen.has(item) && seen.set(item,1)
    })
}

//indexOf低层使用===进行判断，NaN === NaN结果为false，所以使用indexOf查找不到NaN