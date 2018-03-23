//jQuery 的 extend 是 jQuery 中应用非常多的一个函数
//jQuery功能：Merge the contents of two or more objects together into the first object
//jQuery.extend(target,[,object1][,objectN])
var obj1 = {
    a: 1,
    b: {
        b1: 1,
        b2: 2
    }
}
var obj2 = {
    c: 3,
    b: {
        b1: 3,
        b3: 4
    }
}
var obj3 = {
    d: 4
}
console.log($.extend(obj1,obj2,obj3))
// {a: 1,b: {b1: 3,b3: 4},c: 3,d: 4}

//也就是说，当两个对象出现相同字段的时候，后者会覆盖前者，而不会进行深层次的覆盖。