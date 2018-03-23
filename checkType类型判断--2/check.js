// plainObject 可译为纯粹对象，意思是该对象是通过"{}""或"new Object" 创建的，含有零个或者多个键值对
//要判断plainObject，是因为跟其他JS对象(如null 数组 宿主对象document等)加以区分
// jQuery提供isPlainObject方法进行判断
function Person(name) {
    this.name = name
}
$.isPlainObject({}) // true
$.isPlainObject(new Object) // true

// Object.create(proto,[propertiesObject]) ==> 创建一个以proto为原型对象的新对象
// 所以 Object.create(null) ==> {} 但是这个{}不存在原型对象
$.isPlainObject(Object.create(null)) // true
// 而Object.create({}) == {} 这里的{}的原型对象是 Object.prototype
$.isPlainObject(Object.create({})) // false

//Object.assign(target,...source) 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象,它将返回目标对象。
//如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似地覆盖早先的属性。
$.isPlainObject(Object.assign({a:1,b:2})) // true

$.isPlainObject(new Person('frank')) //false

function isWindow(obj) {
    return obj !== null && obj === obj.window
}

function isArrayLike(obj) {
    //obj 必须含有length属性
    var length = !!obj && "length" in obj && obj.length
    var typeRes = type(obj)

    //排除函数和window对象
    if (typeRes === 'function' || isWindow(obj)) {
        return false
    }

    return typeRes === 'array' || length === 0 || 
           (typeof length === 'number' && length > 0 && (length-1) in obj)
}