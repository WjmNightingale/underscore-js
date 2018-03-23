//数组浅拷贝
var arr = ['old',1,true,null,undefined]
var new_arr1 = arr.concat()
var new_arr2 = arr.slice()
new_arr1[0] = 'new'
new_arr2[0] = 'new'
console.log(arr) //  ['old',1,true,null,undefined]
console.log(new_arr1,new_arr2) //  ['new',1,true,null,undefined]

//适用于数组和对象的简单粗暴深拷贝,但是不能拷贝函数这样的
var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]
var new_arr = JSON.parse(JSON.stringify(arr))
console.log(new_arr) //  ['old', 1, true, ['old1', 'old2'], {old: 1}]

//浅拷贝
function shallowCopy(obj) {
    //只拷贝对象
    if (typeof obj !== 'object') return
    //根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {}
    //遍历obj属性并判断是obj属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}

//深拷贝 递归调用
function deepCopy(obj) {
    if (typeof obj !== 'object') return
    var newObj = obj instanceof Array ? [] : {}
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
        }
    }
    return newObj
}