// typeof
typeof undefined // undefined
typeof null // object
typeof true // boolean
typeof 1 // number
typeof '1' // string
typeof (new Object()) //object
typeof (new Function()) //function

//Obejct.prototype.toString() 
//ES5规范:当 toString 方法被调用的时候,下面的步骤会被执行
//1. 如果this的值是undefined，就返回[object Undefined]
//2. 如果this的值是null，就返回[object Null]
//3. 如果this不为undefined/null,那么就让O成为ToObject(this)的结果
//4. 让class成为O的内部属性[[Class]]的值
//5. 最后返回由[object class]这样的字符串

var number = 1 // [object Number]
var string = '1' // [object String]
var boolean = true // [object Boolean]
var und = undefined // [object Undefined]
var nul = null // [object Null]
var obj = {a:1} // [object Object]
var arr = [1,2,3] // [object Array]
var date = new Date() // [object Date]
var err = new Error() // [object Error]
var reg = /a/g // [object RegExp]
var func = function a() {console.log('a')} // [object Function]

function checkType() {
    for (var i=0;i<arguments.length;i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}
checkType(number,string,boolean,und,nul,oobj,arr,date,err,reg,func)

//除去以上常见的，还有以下
Object.prototype.toString.call(Math) // [object Math]
Object.prototype.toString.call(JSON) // [object JSON]
function a() {
    Object.prototype.toString.call(arguments) // [object Arguments]
}

//既然拥有Object.prototype.toString这个神器，那么我们就可以写数据类型检测函数了

// 写一个 type 函数能检测各种类型的值，如果是基本类型，就使用 typeof,引用类型就使用 toString
// 此外鉴于 typeof 的结果是小写，我也希望所有的结果都是小写
// 虑到实际情况下并不会检测 Math 和 JSON，所以去掉这两个类型的检测
var class2type = {}
"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map((item,index) => {
    class2type["[object "+item+"]"] = item.toLocaleLowerCase()
})
function type(obj) {
    //typeof obj === "object"?x:typeof obj
    if (typeof obj === "object" || typeof obj === "function") {
        // x = typeof obj === "function"?"function":class2type[Object.prototype.toString.call(obj)]
            return class2type[Object.prototype.toString.call(obj)]
    } else {
        return (typeof obj)
    }
}

//上述方案，如果要考虑兼容ie6，会有点问题
//因为null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]！
function type(obj) {
    //一箭双雕
    if (obj == null) {
        return obj + ''
    }
    if (typeof obj === "object" || typeof obj === "function") {
            return class2type[Object.prototype.toString.call(obj)]
    } else {
        return (typeof obj)
    }
}

//现在有了type这个函数，我们可以检测任意数据类型的值了

function type(data) {
    var class2type = {}
    "Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map((item,index) => {
        class2type["[object " + item + "]"] = item.toLowerCase()
    })
    if (data == null) {
        return data + ""
    }
    if (typeof data === "object" || typeof data === "function") {
        return class2type[Object.prototype.toString.call(data)]
    } else {
        return (typeof data)
    }
}