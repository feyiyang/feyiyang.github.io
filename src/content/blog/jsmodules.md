---
layout: "../../layouts/BlogPost.astro"
title: "js设计模式"
titlePre: [笔记]
description: "读书笔记"
pubDate: "2022/02/11"
tag:
  - 笔记
  - 设计模式
---

> 设计模式定义：在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案

<!-- ### Table of contents -->
[基础](#基础)  
[面向对象的JavaScript](#面向对象的javascript)

## 基础
### 面向对象的JavaScript
#### 1.1动态类型语言和鸭子类型
鸭子类型指导我们只关注对象的行为，而不关注对象本身，也就是关注HAS-A，而不是IS-A。  
借助鸭子类型思想，轻松地在动态类型语言中实现一个原则：“面向接口编程，而不是面向实现编程”。  
#### 1.2多态
同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。  
做什么、谁去做以及怎样去做 - 将“不变的事物”与“可能改变的事物”分离开来。  
```javascript
var makeSound = function(animal) {
  animal.sound()
}

var Duck = function(){}
Duck.prototype.sound = function() {
  console.log('嘎嘎嘎')
}
var Chicken = function(){}
Chicken.prototype.sound = function() {
  console.log('咯咯咯')
}
makeSound(new Duck())
makeSound(new Chicken())
```
##### 1.2.4使用继承得到多态效果
继承通常包括实现继承和接口继承。  
##### JavaScript的多态是与生俱来的
##### 多态在面向对象程序设计中的作用
多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句。 将行为分布在各个对象中，并让这些对象各自负责自己的行为，这正是面向对象设计的优点。  
##### 设计模式与多态
#### 1.3封装
封装的目的是将信息隐藏。一般是封装数据和封装实现。 我们讨论更广义的封装，包括封装类型和封装变化。  
##### 封装数据
JavaScript只能依赖变量的作用域来实现封装特性，而且只能模拟出public和private这两个封装特性。  
```javascript
var myObj = (function() {
  var _name = 'sven'  //私有变量
  return {
    getName: function() { //公开方法
      return _name
    }
  }
})()
console.log(myObj.getName())  // sven
console.log(myObj._name)  // undefined
```
##### 封装实现
封装地目的是将信息隐藏，应该被视为“任何形式地封装”。不仅仅是隐藏数据，还包括隐藏实现地细节、设计细节以及隐藏对象地类型等。  
##### 封装类型
封装类型是静态类型语言中一种重要的封装方式。一般封装类型是通过象类和接口来进行地。 
##### 封装变化
23种设计模式从意图上可被划分为创建型模式、结构性模式和行为型模式。  
创建型模式的目的就是封装创建对象的变化。而结构型模式封装的是对象之间的组合关系。行为型模式封装的是对象的行为变化。  
#### 原型模式和基于原型继承的JavaScript对象系统
原型模式不单是一种设计模式，也被称为一种编程泛型。  
##### 使用克隆的原型模式
如果我们要创建一个对象，一种方法是先指定它的类型，然后通过类来创建这个对象。原型模式是找到一个对象，然后通过克隆来创建一个一摸一样的对象。  
ES5提供了Object.create方法来克隆对象。  
##### 克隆是创建对象的手段
依赖倒置原则提醒我们创建对象的时候要避免依赖具体类型，而用new XXX创建对象的方式显得很僵硬。原型模式通过克隆对象不用在关心对象的具体类型名字。  
##### 1.4.3体验lo语言
在JavaScript语言中不存在类的概念，对象也并非从类中创建出来的，所有的JavaScript对象都是从某个对象上克隆而来的。  
##### 原型编程泛型的一些规则
· 所有的数据都是对象； · 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它； · 对象会记住它的原型； · 如果对象无法响应某个请求，他会把这个请求委托给它的原型。  
##### JavaScript中的原型继承
1.所有数据都是对象  
 JavaScript有两套类型机制：基本类型和对象类型。number、boolean、string这几种基本类型数据也可以通过“包装类”的方式变成对象类型数据来处理。 JavaScript中的根对象是Object.prototype对象。  
2.要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它  
 JavaScript中的函数既可以作为普通函数被调用，也可以作为构造器被调用。当使用new运算符来调用函数时，此时的函数就是一个构造器。用new运算符来创建对象的过程，实际上也只是先克隆Object.prototype对象，再进行一些其它额外操作的过程。  
3.对象会记住它的原型  
 __proto__是对象跟“对象构造器的原型”联系起来的纽带。  
4.如果对象无法响应某个请求，他会把这个请求委托给它的原型  
 对象构造器的原型并不仅限于Object.prototype对象，而是可以动态指向其它对象。  
 ```javascript
 var obj = {name: 'sven'}
 var A = function() {}
 A.prototype = obj
 var a = new A()
 console.log(a.name)  // sven
 ```
 继承总是发生在对象和对象之间。  
##### 原型继承的未来
通过Object.create来创建对象的效率要比通过构造函数创建对象慢，通过Object.create(null)可以创建出没有原型的对象。  
## this、call和apply
### this
JavaScript的this总是指向一个对象，而具体指向哪个对象是再运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。  
#### this的指向大致可以分为
· 作为对象的方法调用； · 作为普通函数调用； · 构造器调用； · Function.prototype.call或Function.prototype.apply调用。  
1.this指向该对象； 2.指向全局对象window； 3.当用new运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里的this就指向返回的这个对象。如果构造器显式的返回了一个object类型的对象，那么此次运算结果最终返回这个对象，而不是我们之前期待的this。 
```javascript
var MyClass = function() {
  this.name = 'sven'
  return {
    name: 'anne'
  }
}
var obj = new MyClass()
console.log(obj.name) // anne
``` 
4.动态改变传入函数的this；  
##### 丢失的this
## 闭包和高阶函数
闭包的形成与变量的作用域以及变量的生存周期密切相关。  
### 闭包
##### 变量的生存周期
全局变量的生存周期时永久的，除非主动销毁。 对于函数内用var关键字声明的局部变量来说，当退出函数时随着函数调用的结束而被销毁。  
##### 闭包的更多作用
1.封装变量 闭包可以帮助把一些不需要暴露在全局的变量封装成“私有变量”。  
```javascript
var mult = (function() {
  var cache = {}
  var calculate = function() {
    var a = 1
    for(var i=0, l=arguments.length; i<l; i++){
      a = a*arguments[i]
    }
    return a
  }
  return function() {
    var args = Array.prototype.join.call(arguments, ', ')
    if(args in cache){
      return cache[args]
    }
    return cache[args] = calculate.apply(null, arguments)
  }
})()
```
2.延续局部变量的寿命  
##### 闭包和面向对象设计
对象以方法的形式包含了过程，而闭包则是在过程中以环境的形式包含了数据。通常用面向对象思想能实现的功能，用闭包也能实现。  
##### 用闭包实现命令模式
命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的接收者(执行者)之间的耦合关系。 
##### 闭包与内存管理
跟闭包和内存泄漏有关系的地方是，使用闭包的同时比较容易形成循环引用，如果闭包的作用域链中保存着一些DOM节点，这时候就有可能造成内存泄漏。  
#### 高阶函数
高阶函数是指至少满足 · 函数可以作为参数被传递 · 函数可以作为返回值传出 之一的函数。  
##### 函数作为参数传递 
把函数当作参数传递，这代表我们可以抽离出一部分容易变化的业务逻辑，把这部分业务逻辑放在函数参数中，这样可以分离业务代码中变化与不变的部分。  
1.回调函数  异步请求、作为参数“委托”给其它函数执行。  
2.Array.prototype.sort  
##### 函数作为返回值输出
让函数继续返回一个可执行的函数，意味着运算过程是可延续的。  
1.判断数据的类型 `Object.prototype.toString.call([1,2,3]) // [object Array]` `Object.prototype.toString.call('str') // [object String]` 
```javascript
var isType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object '+type+']'
  }
}
var isString = isType('String')
var isArray = isType('Array')
var isNumber = isType('Number')
console.log(isArray([1, 2, 3])) // true
```
2.getSingle
```javascript
var getSingle = function(fn){
  var ret
  return function() {
    return ret || (ret = fn.apply(this, arguments))
  }
}
```
##### 高阶函数实现AOP
AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。抽离出后再通过“动态织入”的方式掺入业务逻辑模块中。  
```javascript
Function.prototype.before = function(beforefn){
  var __self = this
  return function() {
    beforefn.apply(this, arguments) //执行新函数，修正this
    return __self.apply(this, arguments)  //执行原函数
  }
}
Function.prototype.after = function(afterfn){
  var __self = this
  return function() {
    var ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}
var func = function() {
  console.log(2)
}
func = func.before(function() {
  console.log(1)
}).after(function() {
  console.log(3)
})
func()
```
这种使用AOP的方式来给函数添加职责，也是JavaScript语言中一种非常特别和巧妙的装饰着模式实现。  
##### 高阶函数的其它应用
1.currying  函数柯里化,又称部分求值。  一个currying会函数接受一些参数 之后，该函数不立即求职，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值时之前传入的所有参数都会被一次性用于求值。    
```javascript
var currying = function(fn){
  var args = []
  return function() {
    if(arguments.length === 0){
      return fn.apply(this, args)
    }else{
      [].push.apply(args, arguments)
      return arguments.callee
    }
  }
}
var cost = (function() {
  var money = 0
  return function() {
    for(var i=0,l=arguments.length; i<l; i++){
      money += arguments[i]
    }
    return money
  }
})()
var cost = currying(cost) //转化成currying函数
cost(100) // 未真正求职
cost(200) // 未真正求职
cost(300) // 未真正求职
console.log(cost())   //求值并输出： 600
```
2.uncurrying call和apply可以让一个对象借用原本不属于它的方法。  
```javascript
Function.prototype.uncurrying = function() {
  var self = this
  return function() {
    var obj = Array.prototype.shift.call(arguments)
    return self.apply(obj, arguments)
  }
}

for(var i=0, fn, ary = ['push', 'shift', 'forEach']; fn = ary[i++];){
  Array[fn] = Array.prototype[fn].uncurrying()
}
var obj = {"length": 3, "0": 1, "1": 2, "2": 3}
Array.push(obj, 4)
console.log(obj.length)
var first = Array.shift(obj)
console.log(first)
console.log(obj)
Array.forEach(obj, function(i, n){
  console.log(n)
})
```
3.函数节流
 _1)_ 函数被频繁调用的场景  · window.onresize事件 · mousemove事件 · 上传进度  
 _2)_ 函数节流的原理  我们可以按时间段忽略掉一些事件请求 借助setTimeout
 _3)_ 代码实现
```javascript
var throttle = function(fn, interval){
  var __self = fn,
    timer,
    firstTime = true;
  return function(){
    var args = arguments,
      __me = this;
    if(firstTime) {   //第一次调用不需延迟
      __self.apply(__me, args)
      return firstTime = false
    }
    if(timer){
      return false
    }
    timer = setTimeout(function() {
      clearTimeout(timer)
      timer = null
      __self.apply(__me, args)
    }, interval || 500)
  }
}
window.onresize = throttle(function() {
  console.log(1)
}, 500)
```
4.分时函数
渲染数据量大的列表 - timeChunk函数让创建节点的工作分批进行
```javascript
var timeChunk = function(ary, fn, count){
  var obj, t
  var len = ary.length
  var start = function() {
    for(var i=0; i<Math.min(count || 1, ary.length), i++){
      var obj = ary.shift()
      fn(obj)
    }
  }
  return function() {
    t = setInterval(function() {
      if(ary.length === 0){
        return clearInterval(t)
      }
      start()
    }, 200)
  }
}
```
5.惰性加载函数
```javascript
var addEvent = function(elem, type, handler){
  if(window.addEventListener){
    addEvent = function(elem, type, handler){
      elem.addEventListener(type, handler, false)
    }
  }else if(window.attachEvent){
    addEvent = function(elem, type, handler){
      elem.attachEvent('on' + type, handler)
    }
  }
  addEvent(elem, type, handler)
}
```
  
## 设计模式
### 单例模式
定义： 保证一个类仅有一个实例，并提供一个访问它的全局访问点。  
#### 实现单例模式
用一个变量标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。  
#### 透明的单例模式
```javascript
var CreateDiv = (function() {
  var instance
  var CreateDiv = function(html){
    if(instance){
      return instance
    }
    this.html = html
    this.init()
    return instance = this
  }
  CreateDiv.prototype.init = function() {
    var div = document.createElement('div')
    div.innerHTML = this.html
    document.body.appendChild(div)
  }
  return CreateDiv
})()
var a = new CreateDiv('sven1')
var b = new CreateDiv('sven2')
console.log(a === b)    // true
```
#### 用代理实现单例模式
```javascript
var ProxySingletonCreateDiv = (function() {
  var instance
  return function(html){
    if(!instance){
      instance = new CreateDiv(html)
    }
    return instance
  }
})()
```
#### 4.4 JavaScript中的单例模式
单例模式的核心是确保只有一个实例，并提供全局访问。 在JavaScript中，我们经常把全局变量当成单例来使用例如`var a = {}` 。  
全局变量的问题： 很容易造成命名空间的污染(变量冲突)。 降低全局变量命名污染的几种方式  
1.使用命名空间  
```javascript
var namespace1 = {
  a: function() {},
  b: function() {}
}
// 动态创建命名空间
var MyApp = {}
MyApp.namespace = function(name) {
  var parts = name.split('.')
  var current = MyApp
  for(var i in parts){
    if(!current[parts[i]]){
      current[parts[i]] = {}
    }
    current = current[parts[i]]
  }
}
MyApp.namespace('event')
MyApp.namespace('attr.value')
MyApp.namespace('dom.style.width')
console.dir(MyApp)
```
2.使用闭包封装私有变量  
```javascript
var user = (function() {
  var __name = 'sven',
    __age = 22;
  return {
    getUserInfo: function() {
      return __name + '-' + __age
    }
  }
})()
```
#### 惰性单例
惰性单例指的是在需要的时候才创建对象实例。  
```javascript
var createLoginLayer = (function() {
  var div;
  return function() {
    if(!div){
      div = document.createElement('div')
      div.innerHTML = '我是登录浮窗'
      div.style.display = 'none'
      document.body.appendChild('div')
    }
    return div
  }
})()
```
#### 通用的惰性单例
上节例子， · 违反单一职责原则； · 创建页面中唯一标签，把createLoginLayer函数几乎照抄一遍。  
```javascript
var getSingle = function(fn){
  var result
  return function() {
    return result || ( result = fn.apply(this, arguments) )
  }
}

var bindEvent = getSingle(function() {
  document.getElementById('div').onclick = function() {
    console.log('click')
  }
  return true
})
var render = function() {
  console.log('开始渲染列表')
  bindEvent()
}
render()
render()
render()
/// div实际上只被绑定了一个事件
```
### 策略模式
策略模式定义：定义一系列算法，把他们一个一个封装起来，并且使他们可以相互替换。  
#### 使用策略模式计算奖金
1.最初代码实现
```javascript
var calculateBonus = function(performanceLevel, salary){
  if(performanceLevel === 'S'){
    return salary * 4
  }
  if(performanceLevel === 'A'){
    return salary * 3
  }
  if(performanceLevel === 'B'){
    return salary * 2
  }
}
```
缺陷 · 函数比较庞大，包含很多if-else； · 函数缺乏弹性； · 算法复用性差  
2.使用组合函数重构代码
```javascript
var performanceS = function(salary){
  return salary * 4
}
var performanceA = function(salary) {
  return salary * 3
}
var performanceB = function(salary){
  return salary * 2
}
var calculateBonus = function(performanceLevel, salary){
  if(performanceLevel === 'S'){
    return performanceS(salary)
  }
  if(performanceLevel === 'A'){
    return performanceA(salary)
  }
  if(performanceLevel === 'B'){
    return performanceB(salary)
  }
}
```
3.使用策略模式重构代码  策略模式的目的就是将算法的使用与算法的实现分离开来。  
一个基于策略模式的程序至少由两部分组成。一部分是一组策略类，封装了具体算法并负责具体的计算过程，二部分是环境类Context,Context接受客户的请求，随后把请求委托给某一个策略类。  
```javascript
var performanceS = function(){}
performanceS.prototype.calculate = function(salary){
  return salary * 4
}
var performanceA = function(){}
performanceS.prototype.calculate = function(salary){
  return salary * 3
}
var performanceB = function(){}
performanceS.prototype.calculate = function(salary){
  return salary * 2
}

// 定义奖金类
var Bonus = function() {
  this.salary = null
  this.strategy = null
}
Bonus.prototype.setSalary = function(salary){
  this.salary = salary
}
Bonus.prototype.setStrategy = function(strategy){
  this.strategy = strategy
}
Bonus.prototype.getBonus = function(){
  return this.strategy.calculate(this.salary)
}
```
#### JavaScript版本的策略模式
```javascript
var strategies = {
  'S': function(salary) {
    return salary * 4
  },
  'A': function(salary){
    return salary * 3
  },
  'B': function(salary){
    return salary * 2
  }
}
var calculateBonus = function(level, salary){
  return strategies[level](salary)
}
```
#### 多态在策略模式中的体现
替换context中当前保存的策略对象，便能执行不同的算法来得到我们想要的结果。  
#### 使用策略模式实现缓动动画 
##### 实现动画效果的原理
不断改变属性  
##### 思路和一些准备工作
· 动画开始时，小球所在的位置； · 小球移动的目标位置； · 动画开始时的准确时间点； · 小球运动持续的时间。  
##### 让小球动起来
```javascript
var tween = {
  linear: function(t, b, c, d){
    return c*t/d + b
  },
  easeIn: function(t, b, c, d){
    return c * (t/=d) * t + b
  },
  strongEaseIn: function(t, b, c, d){
    return c * (t/=d) * t * t * t * t + b
  },
  strongEaseOut: function(t, b, c, d){
    return c * ((t= t/d - 1) * t * t * t * t + 1) + b
  },
  sineaseIn: function(t, b, c, d){
    return c * (t/=d) * t * t + b
  },
  sineaseOut: function(t, b, c, d){
    return c * ((t = t/d - 1) * t * t + 1) + b
  }
}
```
```javascript
var Animate = function(dom){
  this.dom = dom
  this.startTime = 0
  this.startPos = 0
  this.endPos = 0
  this.propertyName = null
  this.easing = null
  this.duration = null
}

Animate.prototype.start = function(propertyName, endPos, duration, easing){
  this.startTime = +new Date
  this.startPos = this.dom.getBoundingClientRect()[propertyName]
  this.propertyName = propertyName
  this.endPos = endPos
  this.duration = duration
  this.easing = tween[easing]
  var self = this
  var timeId = setInterval(function(){
    if(self.step() === false){
      clearInterval(timeId)
    }
  }, 19)
}
```
· propertyName: 要改变的css属性名； · endPos：小球运动的目标位置； · duration： 动画持续时间； · easing： 缓动算法。  
```javascript
Animate.prototype.step = function() {
  var t = +new Date
  if(t >= this.startTime + this.duration){
    this.update(this.endPos)
    return false
  }
  var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration)
  this.update(pos)
}

//
Animate.prototype.update = function(pos) {
  this.dom.style[ this.propertyName ] = pos + 'px'
}
```
策略模式实现并不复杂，关键是如何从策略模式的实现背后，找到封装变化、委托和多态性这些思想的价值。   
#### 更广义的算法
业务规则指向的目标一致，并且可以被替换使用，我们就可以用策略模式来封装它们。  
#### 表单校验
注册页面  · 用户名不能为空； · 密码长度不能少于6位； · 手机号码必须符合格式。  
##### 用策略模式重构表单校验
```javascript
var strategies = {
  isNonEmpty: function(value, errorMsg){
    if(value === ''){
      return errorMsg
    }
  },
  minLength: function(value, length, errorMsg){
    if(value.length < length){
      return errorMsg
    }
  },
  isMobile: function(value, errorMsg){
    if( !/(^1[3|5|8][0-9]{9}$)/.test(value) ){
      return errorMsg
    }
  }
}
```
Validator类在这里作为Context，负责接收用户的请求并委托给strategy对象。  
```javascript
var Validator = function() {
  this.cache = []
}
Validator.prototype.add = function(dom, rule, errorMsg){
  var ary = rule.split(':')
  this.cache.push(function() {
    var strategy = ary.shift()
    ary.unshift(dom.value)
    return strategies[ strategy ].apply(dom, ary)
  })
}
Validator.prototype.start = function(){
  for(var i=0,validatorFunc; validatorFunc = this.cache[ i++ ]){
    var msg = validatorFunc()
    if(msg){
      return msg
    }
  }
}

//
validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空')
validator.add(registerForm.userName, 'minLength: 10', '用户名长度不能小于10位')
```
##### 给某个文本输入框添加多种校验规则
```javascript
var strategies = {
  isNonEmpty: function(value, errorMsg){
    if(value === ''){
      return errorMsg
    }
  },
  minLength: function(value, length, errorMsg){
    if(value.length < length){
      return errorMsg
    }
  },
  isMobile: function(value, errorMsg){
    if(!/^1[3|5|8][0-9]{9}$/.test(value)){
      return errorMsg
    }
  }
}

//
var Validator = function() {
  this.cache = []
}
Validator.prototype.add = function(dom, rules){
  var self = this
  for(var i=0, rule; rule = rules[i++]){
    (function(rule){
      var strategyAry = rule.strategy.split(':')
      var errorMsg = rule.errorMsg
      self.cache.push(function() {
        var strategy = strategyAry.shift()
        strategy.unshift(dom.value)
        strategy.push(errorMsg)
        return strategies[strategy].apply(dom, strategyAry)
      })
    })(rule)
  }
}
Validator.prototype.start = function() {
  for(var i=0, validatorFunc; validatorFunc = this.cache[i++];){
    var errorMsg = validatorFunc()
    if(errorMsg){
      return errorMsg
    }
  }
}

//
var registerForm = document.getElementById('registerForm')
var validator = new Validator()
validator.add(registerForm.userName, [{
  strategy: 'isNonEmpty',
  errorMsg: '用户名不能为空'
}, {
  strategy: 'minLength: 10',
  errorMsg: '密码长度不能小于10位'
}])
```
#### 策略模式的优缺点
- 策略模式利用组合、委托和多态等技术和思想，可以有效的避免多重条件选择语句。
- 策略模式提供了对开放-封闭原则的完美支持，将算法封装在独立的strategy中，使得他们易于切换，易于理解，易于扩展。  
- 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
- 在策略模式中利用组合和委托来让Context拥有执行算法的能力，这也是继承的一种更轻便的替代方案。  
 _缺点_  
- 会在程序中增加许多策略类或策略对象，但实际上这比把他们负责的逻辑堆砌在Context中要好。
- 要使用策略模式必须了解所有的strategy，必须了解各个strategy之间的不同点，这样才能选择一个合适的strategy。  
#### 5.8一等函数对象与策略模式
> 在函数作为一等对象的语言中，策略模式是隐形的。strategy就是值为函数的变量。  
在JavaScript中，“函数对象的多态性”来得更加简单。  
### 代理模式
代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。  
代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制这个对象的访问。  
#### 保护代理和虚拟代理
虚拟代理把一些开销很大的代理对象，延迟到真正需要它的时候才去创建。  
保护代理用于控制不同权限的对象对目标对象的访问。 在JavaScript中不易实现保护代理。  
#### 虚拟代理实现图片预加载
```javascript
var myImage = (function() {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src){
      imgNode.src = src
    }
  }
})()
var proxyImage = (function() {
  var img = new Image
  img.onload = function() {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('file:// /c:/Users/svenzeng/DeskTop/loading.gif')
      img.src = src
    }
  }
})()
proxyImage.setSrc('http://imgcache.qq.com/music/photo/k/000GGDys0yAoNk.jpg')
```
#### 代理的意义
单一职责原则指，就一个类(通常也包括对象和函数等)而言，应该仅有一个引起它变化的原因。  
#### 代理和本体接口的一致性
· 用户可以放心地请求代理，他只关心是否能得到想要的结果。  · 在任何使用本地的地方都可以替换成使用代理。  
如果代理对象和本体对象都为一个函数(函数也是对象)，函数必然都能被执行，则可以认为他们也具有一致的“接口”。  
```javascript
var myImage = (function(){
  var imgNode = document.createElement( 'img' )
  document.body.appendChild(imgNode)
  return function(src){
    imgNode.src = src
  }
})()
var proxyImage = (function(){
  var img = new Image
  img.onload = function(){
    myImage(this.src)
  }
  return function(src){
    myImage('file:// /c/Users/svenzeng/Desktop/loading.gif')
    img.src = src
  }
})()
proxyImage('http://imgcache.qq.com/music/n/k/000GGDys0ys0yA0Nk.jpg')
```
#### 虚拟代理合并HTTP请求
```javascript
var synchronousFile = function(id){
  console.log('开始同步文件， id为： ' + id)
}
var proxySynchoronousFile = (function(){
  var cache = [],
    timer
  return function(id){
    cache.push(id)
    if(timer){
      return
    }
    timer = setTimeout(function() {
      synchronousFile(cache.join(', '))
      clearTimeout(timer)
      timer = null
      cache.length = 0
    }, 2000)
  }
})()
var checkbox = document.getElementsByTagName('input')
for(var i=0, c; c = checkbox[i++]){
  c.onclick = function(){
    if(this.checked === true){
      proxySynchorousFile(this.id)
    }
  }
}
```
#### 虚拟代理在惰性加载中的应用
```javascript
var miniConsole = (function() {
  var cache = []
  var handler = function(ev){
    if(ev.keyCode === 113){
      var script = document.createElement('script')
      script.onload = function() {
        for(var i=0, fn; fn=cache[i++]){
          fn()
        }
      }
      script.src = 'miniConsole.js'
      document.getElementsByTagName('head')[0].appendChild(script)
      document.body.removeEventListener('keydown', handler)
    }
  }
  document.body.addEventListener('keydown', handler, false)
  return {
    log: function(){
      var args = arguments
        cache.push(function(){
          return miniConsole.log.apply(miniConsole, args)
        })
    }
  }
})()
miniConsole.log(11)
miniConsole = {
  log: function(){
    console.log(Array.prototype.join.call(arguments))
  }
}
```
#### 缓存代理
缓存代理可以为一些开销大的运算结果提供暂时的存储，在下一次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。  
##### 计算乘积
```javascript
var mult = function(){
  console.log('开始计算乘积')
  var a = 1
  for(var i=0, l=arguments.length; i<l; i++){
    a = a*arguments[i]
  }
  return a
}
mult(2, 3)
mult(2, 3, 4)

//加入缓存代理
var proxyMult = (function(){
  var cache = {}
  return function(){
    var args = Array.prototype.join.call(arguments, ', ')
    if(args in cache){
      return cache[args]
    }
    return cache[args] = mult.apply(this, arguments)
  }
})()
proxyMult(1, 2, 3, 4)
proxyMult(1, 2, 3, 4)
```
##### 缓存代理用于ajax异步请求数据
#### 用高阶函数动态创建代理
```javascript
var mult = function(){
  var a = 1
  for(var i=0, l=arguments.length; i<l; i++){
    a = a * arguments[i]
  }
  return a
}

var plus = function(){
  var a = 0
  for(var i=0, l=arguments.length; i<l; i++){
    a = a + arguments[i]
  }
  return a
}

var createProxyFactory = function(fn){
  var cache = {}
  return function(){
    var args = Array.prototype.join.call(arguments, ', ')
    if(args in cache){
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}

var proxyMult = createProxyFactory(mult),
  proxyPlus = createProxyFactory(plus)

console.log(proxyMult(1, 2, 3, 4))
```
#### 其他代理模式
· 防火墙代理；  · 远程代理：为一个对象在不同的地址空间提供局部代表；  · 保护代理： 用于对象应该有不同访问权限的情况； · 智能引用代理：取代了简单的指针；  · 写时复制代理：通常用于复制一个庞大的对象的情况。  
### 迭代器模式
迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。  
#### 实现自己的迭代器
```javascript
var each = function(ary, callback){
  for(var i=0, l=ary.length; i<l; i++){
    callback.call(ary[i], i, ary[i])
  }
}
each([1, 2, 3, 4], function(i, n){
  console.log([i, n])
})
```
#### 内部迭代器和外部迭代器
1.内部迭代器  
each函数属于内部迭代器，由于内部迭代器的迭代规则已经被提前规定，无法同时迭代2个数组。  
2.外部迭代器  
外部迭代器必须显式地请求迭代下一个元素。  
```javascript
var Iterator = function(obj){
  var current = 0
  var next = function(){
    current += 1
  }
  var isDone = function(){
    return current >= obj.length
  }
  var getCurrItem = function(){
    return obj[current]
  }
  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem,
    length: obj.length
  }
}

var compare = function(iterator1, iterator2){
  if(iterator1.length !== iterator2.length){
    console.log('iterator1和iterator2不相等')
  }
  while(!iterator1.isDone() && !iterator2.isDone()){
    if(iterator1.getCurrItem() !== iterator2.getCurrItem()){
      throw new Error('iterator1和iterator2不相等')
    }
    iterator1.next()
    iterator2.next()
  }
  console.log('iterator1和iterator2相等')
}
```
#### 迭代类数组对象和字面量对象
只要被迭代的聚合对象拥有length属性而且可以用下标访问，那它就可以被迭代。  
#### 倒叙迭代器
```javascript
var reverseEach = function(ary, callback){
  for(var l=ary.length-1; l>=0; l--){
    callback(l, ary[l])
  }
}
reverseEach([0, 1, 2], function(i, n){
  console.log(n)
})
```
#### 中止迭代器
```javascript
var each = function(ary, callback){
  //...
  if(callback(i, ary[i]) === false){
    break
  }
}

each([1, 2, 3, 4, 5], function(i, n){
  if(n>3){
    return false
  }
})
```
#### 迭代器模式的应用举例
```javascript
//不同浏览器应用不同上传控件
var iteratorUploadObj = function() {
  for(var i=0, fn; fn = arguments[i++]){
    var uploadObj = fn()
    if(uploadObj !== false){
      return uploadObj
    }
  }
}
var uploadObj = iteratorUploadObj(getActiveUpload, getFlashUploadObj, getFormUploadObj)
```
### 发布--订阅模式
又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。  
#### 发布-订阅模式的作用
发布订阅模式可以广泛应用于异步编程中，这是一种替代传递回调函数的方案。  在异步编程中使用发布订阅模式，无需过多关注对象在异步运行期间的内部状态，而只需要订阅感兴趣的事件发生点。  
可以取代对象之间硬编码的通知机制，一个对象不用再显示的调用另一个对象的某个接口。  
#### DOM事件
ie fireEvent, 标准浏览器用 dispatchEvent.  
#### 自定义事件
实现发布-订阅模式  
· 指定好谁充当发布者；  · 给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者；  · 发布消息时，发布者遍历这个缓存列表，依次触发里面存放的订阅回调函数。  
```javascript
var salesOffices = {}
salesOffices.clientList = {}
salesOffices.listen = function(key, fn){
  if(!this.clientList[key]){
    this.clientList[key] = []
  }
  this.clientList[key].push(fn)
}
salesOffices.trigger = function(){
  var key = Array.prototype.shift.call(arguments),
    fns = this.clientList[key]
  if(!fns || fns.length === 0){
    return false
  }
  for(var i=0, fn; fn=fns[i++];){
    fn.apply(this, arguments)
  }
}
salesOffices.listen('squareMeter88', function(price){
  console.log('价格=' + price)
})
salesOffices.listen('squareMeter110', function(price){
  console.log('价格=' + price)
})
salesOffices.listen('squareMeter110', function(price){
  console.log('价格changed=' + price)
})
salesOffices.trigger('squareMeter88', 200000)
salesOffices.trigger('squareMeter110', 300000)
salesOffices.trigger('squareMeter110', 330000)
```
#### 发布-订阅模式的通用实现
```javascript
var event = {
  clientList: [],
  listen: function(key, fn){
    if(!this.clientList[key]){
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function(){
    var key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key]
    if(!fns || fns.length === 0){
      return false
    }
    for(var i=0, fn; fn=fns[i++];){
      fn.apply(this, arguments)
    }
  }
}
// 给所有对象动态安装发布-订阅模式
var installEvent = function(obj){
  for(var i in event){
    obj[i] = event[i]
  }
}
// 动态增加
var salesOffices = {}
installEvent(salesOffices)
salesOffices.listen('squareMeter88', function(price){
  console.log('价格=' + price)
})
salesOffices.listen('squareMeter110', function(price){
  console.log('价格=' + price)
})
salesOffices.trigger('squareMeter88', 200000)
salesOffices.trigger('squareMeter110', 300000)
```
#### 取消订阅的事件
```javascript
event.remove = function(key, fn){
  var fns = this.clientList[key]
  if(!fns){
    return false
  }
  if(!fn){
    fns && (fns.length = 0)
  }else{
    for(var l=fns.length-1; l>=0; l--){
      var _fn = fns[l]
      if(_fn === fn){
        fns.splice(l, 1)
      }
    }
  }
}
var salesOffices = {}
var installEvent = function(obj){
  for(var i in event){
    obj[i] = event[i]
  }
}
installEvent(salesOffices)
salesOffices.listen('squareMeter88', fn1 = function(price){
  console.log('价格=' + price)
})
salesOffices.listen('squareMeter88', fn2 = function(price){
  console.log('价格=' + price)
})
salesOffices.remove('squareMeter88', fn1)
salesOffices.trigger('squareMeter88', 200000)
```
#### 真实例子--网站登录
```javascript
$.ajax('http://xxx.com/login', function(data){
  login.trigger('loginSucc', data)
})

var address = (function(){
  login.listen('loginSucc', function(obj){
    address.refresh(obj)
  })
  return {
    refresh: function(avatar){
      console.log('刷新收货地址列表')
    }
  }
})()
```
#### 全局的发布-订阅对象
```javascript
var Event = (function(){
  var clientList = {},
    listen,
    trigger,
    remove
  listen = function(key, fn){
    if(!clientList[key]){
      clientList[key] = []
    }
    clientList[key].push(fn)
  }
  trigger = function(){
    var key  = Array.prototype.shift.call(arguments)
    fns = clientList[key]
    if(!fns || fns.length ===0){
      return false
    }
    for(var i=0,fn; fn = fns[i++];){
      fn.apply(this, arguments)
    }
  }
  remove = function(key, fn){
    var fns = clientList[key]
    if(!fns){
      return false
    }
    if(!fn){
      fns && (fns.length = 0)
    }else{
      for(var l=fns.length-1; l>=0; l--){
        var _fn = fns[l]
        if(_fn === fn){
          fns.splice(l, 1)
        }
      }
    }
  }
  return {
    listen,
    trigger,
    remove
  }
})()
Event.listen('squareMeter88', function(price){
  console.log(price)
})
Event.trigger('squareMeter88', 200000)
```
#### 模块间通信
模块间如果用了太多全局发布-订阅模式通信，那么模块与模块之间的联系就被隐藏到了背后。我们最终会搞不清楚消息来自哪个模块，或者消息会流向哪些模块。  
#### 必须先订阅再发布吗
要建立一个存放离线事件的堆栈，可以把发布事件的动作包裹在一个函数里，包装函数将存入堆栈中。  
#### 全局事件的命名冲突
```javascript
// 有命名空间的发布订阅
var Event = (function(){
  var global = this,
    Event,
    _default = 'default'
  Event = function(){
    var _listen,
      _trigger,
      _remove,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {},
      _create,
      find,
      each = function(ary, fn){
        var ret
        for(var i=0, l=ary.length; i<l; i++){
          var n = ary[i]
          ret = fn.call(n, i, n)
        }
        return ret
      }
    _listen = function(key, fn, cache){
      if(cache[key]){
        if(fn){
          for(var i=cache[key].length; i>=0; i--){
            if(!cache[key]){
              cache[key] = []
            }
            cache[key].push(fn)
          }
        }
      }
    }
    _remove = function(key, cache, fn){
      if(cache[key]){
        if(fn){
          for(var i=cache[key].length; i>=0; i--){
            if(cache[key][i] === fn){
              cache[key].splice(i, 1)
            }
          }
        }
      }else{
        cache[key] = []
      }
    }
    _trigger = function(){
      var cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        ret,
        stack = cache[key]
      if(!stack || !stack.length){
        return
      }
      return each(stack, function(){
        return this.apply(_self, args)
      })
    },
    _create = function(namespace){
      var namespace = namespace || _default
      var cache = {},
        offlineStack = [],
        ret = {
          listen: function(key, fn, last){
            _listen(key, fn, cache)
            if(offlineStack === null){
              return
            }
            if(last === 'last'){
              offlineStack.length && offlineStack.pop()()
            }else{
              each(offlineStack, function(){
                this()
              })
            }
            offlineStack = null
          },
          one: function(key, fn, last){
            _remove(key, cache)
            this.listen(key, fn, last)
          },
          remove: function(key, fn){
            _remove(key, cache, fn)
          },
          trigger: function(){
            var fn,
              args,
              _self = this
            _unshift.call(arguments, cache)
            args = arguments
            fn = function(){
              return _trigger.apply(_self, args)
            }
            if(offlineStack){
              return offlineStack.push(fn)
            }
            return fn()
          }
        }
      return namespace ? (namespaceCache[namespace]?namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret
    }
    return {
      create: _create,
      one: function(key, fn, last){
        var event = this.create()
        event.one(key, fn, last)
      },
      remove: function(key, fn){
        var event = this.create()
        event.remove(key, fn)
      },
      listen: function(key, fn, last){
        var event = this.create()
        event.listen(key, fn, last)
      },
      trigger: function(){
        var event = this.create()
        event.trigger.apply(this, arguments)
      }
    }
  }
  return Event
})()
```
#### JavaScript实现发布-订阅模式的便利性
推模型是指在事件发生时，发布者一次性把所有更改的状态和数据都推送给订阅者。拉模型是发布者仅仅通知订阅者事件已经发生了，此外发布者要提供一些公开的接口供订阅者来主动拉取数据。  JavaScript中，arguments可以很方便地表示参数列表，一般选推模型。   
#### 小结
优点： 时间上的解耦，对象间的解耦。 帮助实现中介者模式。  mvc、mvvm中发布-订阅模式的参与。  
缺点： 创建订阅者本身要消耗一定的时间和内存。 如果过度使用，对象和对象之间的联系也将被深埋背后，会导致程序难以跟踪维护和理解。  
### 命令模式
#### 命令模式的用途
最常见的应用场景：有时候需要向某些对象发送请求，但并不知道请求的接收者是谁，也不知道被请求的操作是什么。  command对象可以在程序中被四处传递；拥有更长的声明周期；支持撤销、排队等操作。  
#### 命令模式的例子--菜单程序
```javascript
var setCommand = function(button, command){
  button.onclick = function(){
    command.execute()
  }
}

// 按钮功能分布
var MenuBar = {
  refresh: function(){
    console.log('刷新菜单目录')
  }
}
var SubMenu = {
  add: function(){
    console.log('增加子菜单')
  },
  del: function(){
    console.log('删除子菜单')
  }
}

// 封装命令类
var RefreshMenuBarCommand = function(receiver){
  this.receiver = receiver
}
RefreshMenuBarCommand.prototype.execute = function(){
  this.receiver.refresh()
}
var AddSubMenuCommand = function(receiver){
  this.receiver = receiver
}
AddSubMenuCommand.prototype.execute = function(){
  this.receiver.add()
}
var DelSubMenuCommand = function(receiver){
  this.receiver = receiver
}
DelSubMenuCommand.prototype.execute = function(){
  console.log('删除子菜单')
}

//安装
var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar)
var addSubMenuCommand = new AddSubMenuCommand(SubMenu)
var delSubMenuCommand = new DelSubMenuCommand(SubMenu)
setCommand(button2, addSubMenuCommand)
setCommand(button3, delSubMenuCommand)
```
#### JavaScript中的命令模式
```javascript
var bindClick = function(botton, func){
  botton.onclick = func
}
var MenuBar = {
  refresh: function(){
    console.log('刷新菜单')
  }
}
var SubMenu = {
  add: function(){
    consoel.log('增加子菜单')
  },
  del: function(){
    console.log('删除子菜单')
  }
}
bindClick(button1, MenuBar.refresh)
```
命令模式的由来，其实是回调函数的一个面向对象的替代品。  
```javascript
var RefreshMenuBarCommand = function(receiver){
  return{
    execute: function(){
      receiver.refresh()
    }
  }
}
var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)
setCommand(button1, refreshMenuBarCommand)
```
#### 撤销命令
```javascript
var ball = document.getElementById(''ball)
var pos = document.getElementById('pos')
var moveBtn = document.getElementById('moveBtn')
var cancelBtn = document.getElementById('cancelBtn')
var MoveCommand = function(receiver, pos){
  this.receiver = receiver
  this.pos = pos
  this.oldPos = null
}
MoveCommand.prototype.execute = function(){
  this.receiver.start('left', this.pos, 1000, 'strongEaseOut')
  this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]
}
MoveCommand.prototype.undo = function(){
  this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut')
}
var moveCommand
moveBtn.onclick = function(){
  var animate = new Animate(ball)
  moveCommand = new MoveCommand(animate, pos.value)
  moveCommand.execute()
}
cancelBtn.onclick = function(){
  moveCommond.undo()
}
```
#### 撤销和重做
记录命令日志，然后重复执行他们，这是逆转不可逆命令的一个好办法。  
#### 宏命令
通过执行宏命令的方式，可以一次执行一批命令。  
```javascript
var MacroCommand = function(){
  return {
    commandsList: [],
    add: function(command){
      this.commandsList.push(command)
    },
    execute: function(){
      for(var i=0, command; command = this.commandsList[i++];){
        command.execute()
      }
    }
  }
}
```
宏命令是命令模式与组合模式的连用产物。  
#### 智能命令与傻瓜命令
一般来说，命令模式都会在command对象中保存一个接收者来负责真正执行客户的请求，这种情况下命令对象是“傻瓜式”的，它只负责把客户的请求转交给接收者来执行，这种模式的好处是请求发起者和请求接收者之间尽可能地得到了解耦。  
策略模式指向地问题域更小，所有策略对象地目标总是一致的，它们只是达到这个目标地不同手段，它们的内部实现是针对“算法”而言的。而智能命令模式指向的问题域更广，command对象解决的目标更具发散性。命令模式还可以完成撤销、排队等功能。  
JavaScript可以用高阶函数非常方便地实现命令模式。命令模式再JavaScript语言中是一种隐形地模式。  
### 组合模式
程序设计中有”事物是由相似的子事物构成“类似的思想。组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小的”孙对象“构成的。  
#### 回顾宏命令
#### 组合模式的用途
组合模式将对象组合成树形结构，以表示”部分-整体“的层次结构。  
· 表示树形结构  
· 利用对象多态性统一对待组合对象和单个对象。  
#### 请求在树中传递的过程
如果子节点是叶对象，叶对象自身会处理这个请求，而如果子节点还是组合对象，请求会继续往下传递。  
#### 更强大的宏命令
基本对象可以被组合成更复杂的组合对象，组合对象又可以被组合，这样不断递归下去，这棵树的结构可以支持任意多的复杂度。  
#### 抽象类在组合模式中的作用
组合模式最大的优点在于可以一致的对待组合对象和基本对象。  
JavaScript中实现组合模式的难点在于要保证组合对象和叶对象拥有同样的方法，这通常需要用鸭子类型的思想对它们进行接口检查。  在JavaScript中实现组合模式，看起来缺乏一些严谨性，我们的代码算不上安全，但能更快速和自有的开发，这既是JavaScript的缺点，也是它的有点。  
#### 透明性带来的安全问题
给叶对象也增加add方法，调用时抛出异常来及时提醒客户。  
#### 组合模式的例子--扫描文件夹
```javascript
var Folder = function(name){
  this.name = name
  this.files = []
}
Folder.prototype.add = function(file){
  this.files.push(file)
}
Folder.prototype.scan = function(){
  console.log('开始扫描文件夹' + this.name)
  for(var i=0, file, files=this.files; file=files[i++];){
    file.scan()
  }
}
////
var File = function(name){
  this.name = name
}
File.prototype.add = function(){
  throw new Error('文件下面不能再添加问价')
}
File.prototype.scan = function(){
  console.log('开始扫描文件'+ this.name)
}
```
```javascript
var folder = new Folder('学习资料')
var folder1 = new Folder('Javascript')
var folder2 = new Folder('jQuery')
var file1 = new File('Javascript设计模式域开发实践')
var file1 = new File('精通jQuery')
var file1 = new File('重构与模式')
```
#### 一些值得注意的地方
1.组合模式不是父子关系  组合模式是一种HAS-A(聚合)的关系，而不是IS-A。  
2.对叶对象操作的一致性  只有用一致的方式对待列表中的每个叶对象的时候，才适合使用组合模式。(发放过节费vs发送生日礼物)  
3.双向映射关系  要考虑对象之间的关系并不是严格意义上的层次结构，在这种情况下，是不适合使用组合模式的。 可以引入中介者模式来管理这些对象。  
4.用职责链模式提高组合模式性能   
#### 引用父对象
有时可能需要需要让请求从子节点往父节点上冒泡传递。当删除某个文件时实际上是从这个文件所在的上层文件夹中删除该文件的。  
```javascript
var Folder = function(name){
  this.name = name
  this.parent = null
  this.files = []
}
Folder.prototype.add = function(file){
  file.parent = this
  this.files.push(file)
}
Folder.prototype.scan = function(){
  console.log('开始扫描文件夹' + this.name)
  for(var i=0, file, files=this.files; file = files[i++]){
    this.scan()
  }
}

Folder.prototype.remove = function(){
  if(!this.parent){
    return
  }
  for(var files = this.parent.files, l=files.length-1; l>=0; l--){
    var file = files[l]
    if(file === this){
      files.splice(l, 1)
    }
  }
}
```
#### 何时使用组合模式
· 表示对象的部分-整体层次结构。  · 客户希望统一对待树中的所有对象。  
#### 小结
可能产生- 系统中每个对象看起来差不多。它们的区别只有运行时显现，这会使代码难以理解。此外，如果通过组合模式创建了太多对象，那么这些对象可能会让系统负担不起。  
### 模板方法模式
基于继承的设计模式--模板方法模式  
#### 模板方法模式的定义和组成
由 抽象父类、具体的实现子类 组成。  
如果相同和不同的行为都混合在各个子类的实现中，说明这些相同的行为会在各个子类中重复出现。 模板方法模式中，子类实现中的相同部分被上移到父类中，而将不同的部分留待子类来实现。这也很好的体现了泛化的思想。  
#### 第一个例子--Coffee or Tea
分离出共同点  · 把水煮沸  · 用沸水冲泡饮料  · 把饮料倒进杯子  · 加调料
```javascript
var Beverage = function(){}
Beverage.prototype.boilWater = function(){
  console.log('把水煮沸')
}
Beverage.prototype.brew = function(){}
Beverage.prototype.pourInCup = function(){}
Beverage.prototype.addCondiments = function(){}
Beverage.prototype.init = function(){
  this.boilWater()
  this.brew()
  this.pourInCup()
  this.addCondiments()
}
```
#### 抽象类
具体类 可以被实例化， 抽象类 不能被实例化。  除了用于向上转型，抽象类也可以表示一种契约。  
隐藏对象的类型在JavaScript中并不重要。  
#### 模板方法模式的使用场景
HttpServlet  
构建UI组件 初始化一个div容器；通过ajax请求拉取相应的数据；把数据渲染到div容器里面，完成组件的构造；通知用户组件渲染完毕。  
#### 钩子方法
放置(hook)是隔离变化的一种常见手段。 钩子方法的返回结果决定了模板方法后面部分的执行步骤，也就是程序接下来的方向，这样程序就拥有了变化的可能。  
```javascript
var Beverage = function(){}
Beverage.prototype.boilWater = function(){
  console.log('把水煮沸')
}
Beverage.prototype.brew = function(){
  throw new Error('子类必须重写brew')
}
Beverage.prototype.pourInCup = function(){throw 'rewrite cup'}
Beverage.prototype.addCondiments = function(){throw 'rewrite addc'}
Beverage.prototype.customerWantsCondiments = function(){
  return true
}
Beverage.prototype.init = function(){
  this.boilWater()
  this.brew()
  this.pourInCup()
  if(this.customerWantsCondiments()){
    this.addCondiments()
  }
}

var CoffeeWithHook = function(){}
CoffeeWithHook.prototype = new Beverage()
CoffeeWithHook.prototype.brew = function(){
  console.log('用沸水冲泡咖啡')
}
CoffeeWithHook.prototype.pourInCup = function(){
  console.log('把咖啡倒进杯子')
}
CoffeeWithHook.prototype.addCondiments = function(){
  console.log('加糖和牛奶')
}
CoffeeWithHook.prototype.customerWantsCondiments = function(){
  return window.confirm('请问需要调料吗？')
}
var coffeeWithHook = new CoffeeWithHook()
coffeeWithHook.init()
```
#### 好莱坞原则
“别调用我们，我们会调用你”  当我们用模板方法模式编写一个程序时，就意味着子类放弃了对自己的控制权，而是改为父类通知子类，哪些方法应该在什么时候被调用。作为子类，只负责提供一些设计上的细节。  
· 发布订阅模式  · 回调函数  
#### 真的需要继承吗
模板方法模式是基于继承的一种设计模式。  
```javascript
var Beverage = function(param){
  var boilWater = function(){
    console.log('把水煮沸')
  }
  var brew = param.brew || function(){
    throw new Error('必须传递brew')
  }
  var pourInCup = param.pourInCup || function(){
    throw new Error('必须传入pourInCup')
  }
  var addCondiments = param.addCondiments || function(){
    throw new Error('必须传入addCondiments')
  }
  var F = function(){}
  F.prorotyp.init = function(){
    boilWater()
    brew()
    pourInCup()
    addCondiments()
  }
  return F
}
```
#### 小结
模板方法模式是一种典型的通过封装变化提高系统扩展性的设计模式。  但在JavaScript中，高阶函数是更好的选择。  
### 享元模式
享元模式一种用于性能优化的模式，核心是运用共享技术来有效支持特大量细粒度的对象。 如果系统中因创建了大量类似的对象而导致内存占用过高，享元模式就非常有用。  
#### 内部状态与外部状态
享元模式要求将对象的属性划分为内部状态与外部状态(状态通常在这里指属性)。享元模式的目标是尽量减少共享对象的数量。  
如何划分内部状态和外部状态：  
· 内部状态存储于对象内部；  · 内部状态可以被一些对象共享；  · 内部状态独立于具体的场景，通常不会改变。  · 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。   
剥离了外部状态的对象称为共享对象，外部状态在必要时被传入共享对象来组装成一个完整的对象。 享元模式是一种用时间换空间的优化模式。  
#### 享元模式的通用结构
用工厂对象创建真正被需要的共享对象；用管理器记录对象相关外部状态。  
#### 文件上传的例子
uploadType作为内部状态  
```javascript
var Upload = function(uploadType){
  this.uploadType = uploadType
}
Upload.prototype.delFile = function(id){
  uploadManager.setExternalState(id, this)
  if(this.fileSize<3000){
    return this.dom.parentNode.removeChild(this.dom)
  }
  if(window.confirm('确定要删除该文件吗？'+this.filename)){
    return this.dom.parentNode.removeChild(this.dom)
  }
}
// 工厂进行对象实例化
var UploadFactory = (function(){
  var createdFlyWeightObjs = {}
  return {
    create: function(uploadType){
      if(createdFlyWeightObjs[uploadType]){
        return createdFlyWeightObjs[uploadType]
      }
      return createdFlyWeightObjs[uploadType] = new Upload(uploadType)
    }
  }
})()
// 管理器封装外部状态
var uploadManager = (function(){
  var uploadDatabase = {}
  return {
    add: function(id, uploadType, fileName, fileSize){
      var flyWeightObj = UploadFactory.create(uploadType)
      var dom = document.createElement('div')
      dom.innerHTML = '<span>文件名称：'+fileName+',文件大小：'+fileSize+'</span>'+
        '<button class="delFile">删除</button>'
      dom.querySelector('.delFile').onclick = function(){
        flyWeightObj.delFile(id)
      }
      document.body.appendChild(dom)
      uploadDatabase[id] = {
        fileName: fileName,
        fileSize: fileSize,
        dom: dom
      }
      return flyWeightObj
    },
    setExternalState: function(id, flyWeightObj){
      var uploadData = uploadDatabase[id]
      for(var i in uploadData){
        flyWeightObj[i] = uploadData[i]
      }
    }
  }
})()

var id = 0 
window.startUpload = function(uploadType, files){
  for(var i=0, file; file=files[i++]){
    var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize)
  }
}
```
#### 享元模式的适用性
享元模式是很好的性能优化方案，但也会带来一些复杂性的问题。  
· 一个程序中使用了大量的相似对象；  · 由于使用了大量对象，造成很大的内存开销；  · 对象的大多数状态都可以变为外部状态。  · 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。  
#### 再谈内部状态和外部状态  
**没有内部状态的享元**  
```javascript
var UploadFactory = (function(){
  var uploadObj
  return {
    create: function(){
      if(uploadObj){
        return uploadObj
      }
      return uploadObj = new Upload()
    }
  }
})()
```
**没有外部状态的享元**  不是一个纯粹的享元模式。  
#### 对象池
对象池维护一个装载空闲对象的池子，如果需要对象的时候，不是直接new，而是转从对象池里获取。如果对象池没有空闲对象则创建新对象，当获取的对象完成职责后再进入池子等待被下次获取。  
HTTP连接池和数据库连接池都是对象池技术代表应用。  
**对象池实现**  
```javascript
var objectPoolFactory = function(createObjFn){
  var objectPool = {}
  return {
    create: function(){
      var obj = objectPool.length === 0 ?
        createObjFn.apply(this, arguments) :
        objectPool.shift()
      return obj
    },
    recover: function(obj){
      objectPool.push(obj)
    }
  }
}

// 装载iframe
var iframe = document.createElement('iframe')
document.body.appendChild(iframe)
iframe.onload = function(){
  iframe.onload = null
  iframeFactory.recover(iframe)
  return iframe
}
var iframe1 = iframeFactory.create()
iframe1.src = 'http://baidu.com'
var iframe2 = iframeFactory.create()
iframe2.src = 'http://QQ.com'
```
### 职责链模式
使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连城一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。  
#### 现实中的职责链模式
请求发送者只需要找到链中的第一个节点，从而弱化了发送者和一组接收者之间的强联系。  
#### 实际开发中的职责链模式
```javascript
// 订金500 返100，  订金200 返50，  普通常规 且缺货
var order = function(orderType, pay, stock){
  if(orderType === 1){
    if(pay === true){
      console.log('500 & 100')
    }else{
      if(stock>0){
        console.log('buy & normal')
      }else{
        console.log('stock 0')
      }
    }
  }else if(orderType === 2){
    if(pay === true){
      console.log('200 & 50')
    }else{
      if(stock>0){
        console.log('buy & normal')
      }else{
        console.log('stock 0')
      }
    }
  }
}
```
#### 灵活可拆分的职责链节点
```javascript
var order500 = function(orderType, pay, stock){
  if(orderType === 1 && pay === true){
    console.log('500 & 100')
  }else{
    return 'nextSuccessor'
  }
}
var order200 = function(orderType, pay, stock){
  if(orderType === 2 && pay === true){
    console.log('200 & 50')
  }else{
    return 'nextSuccessor'
  }
}
var orderNormal = function(orderType, pay, stock){
  if(stock>0){
    console.log('buy & normal')
  }else{
    console.log('stock 0')
  }
}

// 包装进职责链节点
var Chain = function(fn){
  this.fn = fn
  this.successor = null
}
Chain.prototype.setNextSuccessor = function(successor){
  return this.successor = successor
}
Chain.prototype.passRequest = function(){
  var ret = this.fn.apply(this, arguments)
  if(ret === 'nextSuccessor'){
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }
  return ret
}

var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1, true, 500)
chainOrder500.passRequest(3, false, 0)
```
#### 异步的职责链
```javascript
Chain.prototype.next = function(){
  return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}
```
#### 用AOP实现职责链
```javascript
Function.Prototype.after = function(fn){
  var self = this
  return function(){
    var ret = self.apply(this, arguments)
    if(ret === 'nextSuccessor'){
      return fn.apply(this, arguments)
    }
    return ret
  }
}
var order = order500yuan.after(order200yuan).after(orderNormal)
```
如果链条太长会对性能有较大影响  
### 中介者模式
中介者模式用于解释对象与对象之间的耦合关系。  
1.机场指挥塔，(调停者)；  2.博彩公司  
#### 中介者模式的例子--泡泡堂游戏
```javascript
// function Player(name){
//   this.name = name
//   this.enemy = null
// }
// Player.prototype.win = function(){
//   console.log(this.name + 'won')
// }
// Player.prototype.lose = function(){
//   console.log(this.name + 'lost')
// }
// Player.prototype.die = function(){
//   this.lose()
//   this.enemy.win()
// }

// // 增加队伍
// player1.partners = [player1, player2, player3, player4]
// player1.enemies = [player5, player6, player7, player8]

var players = []
function Player(name, teamColor){
  this.partners = []
  this.enemies = []
  this.state = 'live'
  this.name = name
  this.teamColor = teamColor
}
Player.prototype.win = function(){
  console.log('winner- ' + this.name)
}
Player.prototype.lose = function(){
  console.log('loser- ' + this.name)
}
Player.prototype.die = function(){
  var all_dead = true
  this.state = 'dead'
  for(var i=0, partner; partner = this.partners[i++];){
    if(partner.state !== 'dead'){
      all_dead = false
      break
    }
  }
  
  if(all_dead === true){
    this.lose()
    for(var i=0, partner; partner = this.partners[i++];){
      partner.lose()
    }
    for(var i=0, enemy; enemy=this.enemies[i++];){
      enemy.win()
    }
  }
}

// 创建玩家工厂
var playerFactory = function(name, teamColor){
  var newPlayer = new Player(name, teamColor)
  for(var i=0, player; player = players[i++];){
    if(player.teamColor === newPlayer.teamColor){
      player.partners.push(newPlayer)
      newPlayer.partners.push(player)
    }else{
      player.enemies.push(newPlayer)
      newPlayer.enemies.push(player)
    }
  }
  players.push(newPlayer)
  return newPlayer
}

var player1 = playerFactory('1', 'red'),
  player2 = playerFactory('2', 'red'),
  player3 = playerFactory('3', 'red'),
  player4 = playerFactory('4', 'red')
var player5 = playerFactory('5', 'blue'),
  player6 = playerFactory('6', 'blue'),
  player7 = playerFactory('7', 'blue'),
  player8 = playerFactory('8', 'blue')

player1.die()
player2.die()
player3.die()
player4.die()
```
**玩家增多带来的困扰** 解除队伍添加到别的队伍，红色玩家可以突然变成蓝色玩家，这就不再仅仅是循环解决的问题了。  
**用中介者模式改造**  
· 利用发布-订阅模式。  · 在playerDirector中开放一些接收消息的接口。  
```javascript
// 
var playerDirector = (function(){
  var players {},
    operations = {}

  operations.addPlayer = function(player){
    var teamColor = player.teamColor
    players[teamColor] = players[teamColor] || []
    players[teamColor].push(player)
  }
  operations.removePlayer = function(player){
    var teamColor = player.teamColor,
      teamPlayers = players[teamColor] || []
    for(var i=teamPlayers.length-1; i>=0; i--){
      if(teamPlayers[i] === player){
        teamPlayers.splice(i, 1)
      }
    }
  }
  // 换队
  operations.changeTeam = function(player, newTeamColor){
    operations.removePlayer(player)
    player.teamColor = newTeamColor
    operations.addPlayer(player)
  }
  operations.playerDead = function(player){
    var teamColor = player.teamColor,
      teamPlayers = players[teamColor]
    var all_dead = true
    
    for(var i=0, player; player=teamPlayers[i++];){
      if(players.state!=='dead'){
        all_head = false
        break
      }
    }
    if(all_dead === true){
      for(var i=0, player; player = teamPlayers[i++];){
        player.lose()
      }
      for(var color in players){
        if(color !== teamColor){
          var teamPlayers = players[color]
          for(var i=0, player; player = teamPlayers[i++];){
            player.win()
          }
        }
      }
    }
  }
  var reciveMessage = function(){
    var message = Array.prototype.shift.call(arguments)
    operations[message].apply(this, arguments)
  }
  return {
    reciveMessage: reciveMessage
  }
})()
```
#### 中介者模式的例子--购买商品
遇到至少5个节点   · 下拉选择colorSelect;  · 文本输入框numberInput； · 展示颜色信息colorInfo； · 展示购买数量信息numberInfo；  · 决定下一步操作的按钮。  
```javascript
var goods = {
  'red|32G': 3,
  'red|16G': 0,
  'blue|32G': 1,
  'blue"16G': 6
}
var mediator = (function(){
  var colorSelect = document.getElementById('colorSelect'),
    memorySelect = document.getElementById('memorySelect'),
    numberInput = document.getElementById('numberInput'),
    colorInfo = document.getElementById('colorInfo'),
    memoryInfo = document.getElementById('memoryInfo'),
    numberInfo = document.getElementById('numberInfo'),
    nextBtn = document.getElementById('nextBtn')
  
  return {
    changed: function(obj){
      var color = colorSelect.value,
        memory = memorySelect.value,
        number = numberInput.value,
        stock = goods[color + '|' + memory]
      
      if(obj === colorSelect){
        colorInfo.innerHTML = color
      }else if(obj === memorySelect){
        memoryInfo.innerHTML = memory
      }else if(obj === numberInput){
        numberInfo.innerHTML = number
      }
      if(!color){
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择手机颜色'
        return
      }
      if(!memory){
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择内存大小'
        return
      }
      if(!Number.isInteger(number -0) && number > 0){
        nextBtn.disabled = true
        nextBtn.innerHTML = '请输入正确的购买数量'
        return
      }
      nextBtn.disabled = false
      nextBtn.innerHTML = '放入购物车'
    }
  }
})()
colorSelect.onchange = function(){
  mediator.changed(this)
}
memorySelect.onchange = function(){
  mediator.changed(this)
}
numberInput.oninput = function(){
  mediator.changed(this)
}
```
#### 小结
中介者模式是迎合迪米特法则的一种实现。迪米特法则也叫最少知识原则，是指一个对象应该尽可能地了解另外的对象。  
对象之间交互的复杂性转移成了中介者对象的复杂性，使得中介者对象经常是巨大的。  
一般来说，如果对象之间的复杂耦合确实导致调用和维护出现了困难，而且这些耦合度随项目的变化呈指数增长曲线，那我们就可以考虑用中介者模式来重构代码。  
### 装饰着模式
装饰者模式可以动态的给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。  
继承方式的问题：导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之改变；继承这种功能复用方式通常被称为“白箱复用”，“白箱”是相对可见性而言，继承常常被认为破坏了封装性；在完成一些功能复用同时，有可能创建出大量的子类，使子类的数量成爆炸性增长。    
跟继承相比，装饰者是一种更轻便灵活的做法，这是一种“即用即付”的方式。  
#### 模拟传统
```javascript
var Plane = function(){}
Plane.prototype.fire = function(){
  console.log('发射普通子弹')
}
var MissileDecorator = function(plane){
  this.plane = plane
}
MissileDecorator.prototype.fire = function(){
  this.plane.fire()
  console.log('发射导弹')
}
var AtomDecorator = function(plane){
  this.plane = plane
}
AtomDecorator.prototype.fire = function(){
  this.plane.fire()
  console.log('发射原子弹')
}

var plane = new Plane()
plane = new MissileDecorator(plane)
plane = new AtomDecorator(plane)
plane.fire()
```
这种给对象动态增加职责的方式，并没有真正的改动对象自身，而是将对象放入另一个对象之中，这些对象以一条链的方式进行引用，形成一个聚合对象。 当请求达到链中某个对象这个对象执行自身的操作，随后把请求转发给链中的下一个对象。  
#### 装饰着也是包装器
装饰者模式将一个对象嵌入另一个对象之中，实际上相当于这个对象被另一个对象包装起来，形成一条包装链。请求随着这条链依次传递到所有的对象，每个对象都有处理这条请求的机会。  
#### JavaScript的装饰者
```javascript
var plane = {
  fire: function(){
    console.log('发射普通子弹')
  }
}
var missileDecorator = function(){
  console.log('发射导弹')
}
var atomDecorator = function(){
  console.log('发射原子弹')
}
var fire1 = plane.fire
plane.fire = function(){
  fire1()
  missileDecorator()
}
var fire2 = plane.fire
plane.fire = function(){
  fire2()
  atomDecorator()
}
plane.fire()
```
#### 装饰函数
在代码运行期间很难切入某个函数的执行环境。 通过保存原引用可以改写某个函数
```javascript
window.onload = function(){alert(1)}
var _onload = window.onload || function(){}
window.onload = function(){
  _onload()
  alert(2)
}
```
存在的问题：
- 必须维护_onload这个中间变量，如果函数的装饰链较长或需要装饰的函数变多，这些中间变量的数量也会越来越多
- this被劫持的问题， 需要手动传this
#### 用AOP装饰函数
```javascript
Function.prototype.before = function(beforefn){
  var __self = this
  return function(){
    beforefn.apply(this, arguments)
    return __self.apply(this, arguments)
  }
}
Function.prototype.after = function(afterfn){
  var __self = this
  return function(){
    var ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}
```
变通，将原函数和新函数作为参数
```javascript
var before = function(fn, beforefn){
  return function(){
    beforefn.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}
var a = before(
  function(){console.log(3)},
  function(){console.log(2)}
)
a = before(a, function(){console.log(1)})
a()
```
#### AOP的应用实例
**数据统计上报**  
分离业务代码和数据统计代码，无论在什么语言中，都是AOP的经典应用之一。  
```javascript
Function.prototype.after = function(afterfn){
  //...
}
var showLogin = function(){
  console.log('打开登录浮窗')
}
var log = function(){
  console.log('上报标签为：'+this.getAttribute('tag'))
}
showLogin = showLogin.after(log)
document.getElementById('button').onclick = showLogin
```
**用AOP动态改变函数的参数**  
```javascript
var getToken = function(){
  return 'Token'
}
ajax = ajax.before(function(type, url, param){
  param.Token = getToken()
})
ajax('get', 'http://xxx.com/userinfo', {name: 'sven'})
```
**插件式的表单验证**  
值得注意的是原函数保存的属性会丢失。这种方式也叠加了函数作用域，如果装饰链条过长性能会受到影响。  
#### 装饰者模式和代理模式
代理模式的目的是，当直接访问本体不方便或者不符合需要时，为这个本体提供一个替代者。本体定义了关键功能，而代理提供或拒绝对它的访问，或者访问本体前做些额外事情。 装饰者模式的作用就是为对象动态加入行为。 代理模式通常只是一层代理-本体的引用，而装饰者模式经常会形成一条长长的装饰链。  
### 状态模式
状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。  
#### 初识状态模式
**电灯程序**  
来个返例
```javascript
Light.prototype.buttonWasPressed = function(){
  if(this.state === 'off'){
    console.log('弱光')
    this.state = 'weakLight'
  }else if(this.state === 'weakLight'){
    console.log('强光')
    this.state = 'strongLight'
  }else if(this.state === 'strongLight'){
    console.log('关灯')
    this.state = 'off'
  }
}
```
· 违反开放-封闭原则； · 所有跟状态有关的行为都被封装在buttonWasPressed方法里(处理的事情多了他会很庞大)；  · 大量if else语句，难以阅读。  
**状态模式改进**  
状态模式会把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部。  
```javascript
var OffLightState = function(light){
  this.light = light
}
OffLightState.prototype.buttonWasPressed = function(){
  console.log('弱光')
  this.light.setState(this.light.weakLightState)
}
var WeakLightState = function(light){
  this.light = light
}
WeakLightState.prototype.buttonWasPressed = function(){
  console.log('强光')
  this.light.setState(this.light.strongLightState)
}
var StrongLightState = function(light){
  this.light = light
}
StrongLightState.prototype.buttonWasPressed = function(){
  console.log('关灯')
  this.light.setState(this.light.offLightState)
}

var Light = function(){
  this.offLightState = new OffLightState(this)
  this.weakLightState = new WeakLightState(this)
  this.strongLightState = new StrongLightState(this)
  this.button = null
}

Light.prototype.init = function(){
  var button = document.createElement('button'),
    self = this
  this.button = document.body.appendChild(button)
  this.button.innerHTML = '开关'
  this.currState = this.offLightState
  this.button.onclick = function(){
    self.currState.buttonWasPressed()
  }
}

Light.prototype.setState = function(newState){
  this.currState = newState
}

var light = new Light()
light.init()
```
#### 状态模式的定义
> <GoF> 允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。  
#### 缺少抽象类的变通方式
JavaScript既不支持抽象类也没有接口的概念。如果忘记实现状态子类(buttonWasPressed)，则会抛出异常。  
#### 另一个状态模式实例--文件上传
文件上传程序中有扫描、正在上传、暂停、上传成功、上传失败； 音乐播放器可分为加载中、正在播放、暂停、播放完毕。  
· 文件在扫描状态中，是不能进行任何操作的。扫描完成根据文件md5值判断若存在于服务器则直接跳到上传完成状态。...  
· 上传中可暂停、继续上传。  
· 扫描和上传过程中点击删除无效，在暂停、上传完成、上传失败之后才能删除。  
在页面放置一个用于上传的插件对象
```javascript
var plugin = (function(){
  var plugin = document.createElement('embed')
  plugin.style.display = 'none'
  plugin.type = 'application/txftn-webkit'
  plugin.sign = function(){
    console.log('开始文件扫描')
  }
  //略...
  document.body.appendChild(plugin)
  return plugin
})()

var Upload = function(fileName){
  this.plugin = plugin
  this.fileName = fileName
  this.button1 = null
  this.button2 = null
  this.state = 'sign'
}

Upload.prototype.init = function(){
  //...
}

Upload.prototype.bindEvent = function(){
  this.button1.onclick = function(){
    //...
  }
  this.button2.onclick = function(){
    //...
  }
}

Upload.prototype.changeState = function(state){
  //...
}
```
**状态模式重构文件上传程序**  
```javascript
window.external.upload = function(state){
  console.log(state)  // sign uploading done error
}
var plugin = (function(){
  var plugin = document.createElement('embed')
  plugin.style.display = 'none'
  plugin.type = 'application/txftn-webkit'
  plugin.sign = function(){
    console.log('开始文件扫描')
  }
  plugin.pause = function(){
    console.log('暂停文件上传')
  }
  plugin.uploading = function(){
    console.log('开始文件上传')
  }
  plugin.del = function(){
    console.log('删除文件上传')
  }
  plugin.done = function(){
    console.log('文件上传完成')
  }
  document.body.appendChild(plugin)
  return plugin
})()

var Upload = function(fileName){
  this.plugin = plugin
  this.fileName = fileName
  this.button1 = null
  this.button2 = null
  this.signState = new SignState(this)
  this.uploadingState = new UploadingState(this)
  this.pauseState = new PauseState(this)
  this.doneState = new DoneState(this)
  this.errorState = new ErrorState(this)
  this.currState = this.signState
}

Upload.prototype.init = function(){
  var that = this
  this.dom = document.createElement('div')
  this.dom.innerHTML = `<span>文件名称：${this.fileName}</span>
  <button data-action="button1">扫描中</button>
  <button data-action="button2">删除</button>
  `
  document.body.appendChild(this.dom)
  this.button1 = this.dom.querySelector('[data-action="button1"]')
  this.button2 = this.dom.querySelector('[data-action="button2"]')
  this.bindEvent()
}

Upload.prototype.bindEvent = function(){
  var self = this
  this.button1.onclick = function(){
    self.currState.clickHandler1()
  }
  this.button2.onclick = function(){
    self.currState.clickHandler2()
  }
}
Upload.prototype.sign = function(){
  this.plugin.sign()
  this.currState = this.signState
}
Upload.prototype.uploading = function(){
  this.button1.innerHTML = '正在上传、点击暂停'
  this.plugin.uploading()
  this.currState = this.uploadingState
}
Upload.prototype.pause = function(){
  this.button1.innerHTML = '已暂停，点击继续上传'
  this.plugin.pause()
  this.currState = this.pauseState
}
Upload.prototype.done = function(){
  this.button1.innerHTML = '上传完成'
  this.plugin.done()
  this.currState = this.doneState
}
Upload.prototype.error = function(){
  this.button1.innerHTML = '上传失败'
  this.currState = this.errorState
}
Upload.prototype.del = function(){
  this.plugin.del()
  this.dom.parentNode.removeChild(this.dom)
}

var StateFactory = (function(){
  var State = function(){}
  State.prototype.clickHandler1 = function(){
    throw new Error('子类必须重写父类的clickHandler1方法')
  }
  State.prototype.clickHandler2 = function(){
    throw new Error('子类必须重写父类的clickHandler2方法')
  }
  return function(param){
    var F = function(uploadObj){
      this.uploadObj = uploadObj
    }
    F.prototype = new State()
    for(var i in param){
      F.prototype[i] = param[i]
    }
    return F
  }
})()
var SignState = StateFactory({
  clickHandler1: function(){
    console.log('扫描中，点击无效...')
  },
  clickHandler2: function(){
    console.log('文件正在上传中，不能删除')
  }
})
var UploadingState = StateFactory({
  clickHandler1: function(){
    this.uploadObj.pause()
  },
  clickHandler2: function(){
    console.log('文件正在上传中，不能删除')
  }
})
var PauseState = StateFactory({
  clickHandler1: function(){
    this.uploadObj.uploading()
  },
  clickHandler2: function(){
    this.uploadObj.del()
  }
})
var DoneState = StateFactory({
  clickHandler1: function(){
    console.log('文件上传已完成，点击无效')
  },
  clickHandler2: function(){
    this.uploadObj.del()
  }
})
var ErrorState = StateFactory({
  clickHandler1: function(){
    console.log('文件上传失败，点击无效')
  },
  clickHandler2: function(){
    this.uploadObj.del()
  }
})

var uploadObj = new Upload('JavaScript设计模式')
uploadObj.init()
window.external.upload = function(state){
  uploadObj[state]()
}
window.external.upload('sign')
setTimeout(function(){
  window.external.upload('uploading')
}, 1000)
setTimeout(function(){
  window.external.upload('done')
}, 5000)
```
#### 状态模式的优缺点
优点：  
- 状态模式定义了状态与行为之间关系并将他们封装在一个类。通过增加新的状态类，很容易增加新的状态和转换。
- 避免Context无限膨胀，状态切换的逻辑被分布在状态中，也去掉了Context中原本过多的条件分支。
- 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然。
- Context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响。

缺点是会在系统中定义许多状态类， 逻辑分散，无法在一个地方就看出整个状态机的逻辑。  
#### 状态模式中的性能优化点
· 两种选择管理state对象的创建和销毁。 一是仅当state对象被需要时才创建并随后销毁(state对象较大)； 一是一开始就创建好所有的状态对象，并且始终不销毁它们(状态改变很频繁)。  
· 各Context对象可以共享一个state对象。  
#### 状态模式和策略模式的关系
相同点： 它们都有一个上下文、一些策略或者状态类，上下文把请求委托给这些类来执行  
区别： 策略模式中各个策略类之间是平等又平行的，它们之间没有任何联系；状态模式中，状态和状态对应的行为是早已被封装好的，状态之间的切换也早被规定完成，“改变行为”这件事发生在状态模式内部。  
#### JavaScript版本的状态机
```javascript
var Light = function(){
  this.currState = FSM.off
  this.button = null
}
Light.prototype.init = function(){
  var button = document.createElement('button'),
    self = this
  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)
  this.button.onclick = function(){
    self.currState.buttonWasPressed.call(self)
  }
}
var FSM = {
  off: {
    buttonWasPressed: function(){
      console.log('关灯')
      this.button.innerHTML = '下一次按我是开灯'
      this.currState = FSM.on
    }
  },
  on: {
    buttonWasPressed: function(){
      console.log('开灯')
      this.button.innerHTML = '下一次按我是关灯'
      this.currState = FSM.off
    }
  }
}
var light = new Light()
light.init()
```
delegate函数
```javascript
var delegate = function(client, delegation){
  return {
    buttonWasPressed: function(){
      return delegation.buttonWasPressed.apply(client, arguments)
    }
  }
}
var FSM = {
  off: {
    buttonWasPressed: function(){
      console.log('关灯')
      this.button.innerHTML = '下一次按我是开灯'
      this.currState = this.onState
    }
  },
  on: {
    buttonWasPressed: function(){
      console.log('开灯')
      this.button.innerHTML = '下一次按我是关灯'
      this.currState = this.offState
    }
  }
}
var Light = function(){
  this.offState = delegate(this, FSM.off)
  this.onState = delegate(this, FSM.on)
  this.currState = this.offState
  this.button = null
}
Light.prototype.init = function(){
  var button = document.createElement('button'),
    self = this
  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)
  this.button.onclick = function(){
    self.currState.buttonWasPressed()
  }
}
var light = new Light()
light.init()
```
#### 表驱动的有限状态机
```javascript
var fsm = StateMachine.create({
  initial: 'off',
  events: [
    {name: 'buttonWasPressed', from: 'off', to: 'on'},
    {name: 'buttonWasPressed', from: 'on', to: 'off'}
  ],
  callbacks: {
    onbuttonWasPressed: function(event, from, to){
      console.log(arguments)
    }
  },
  error: function(eventName, from, to, args, errorCode, errorMessage){
    console.log(arguments)
  }
})
button.onclick = function(){
  fsm.buttonWasPressed()
}
```
#### 实际项目中的其它状态机
下拉菜单hover动作有显式、悬浮、隐藏等； TCP请求有建立连接、监听、关闭等； 格斗游戏人物有攻击、防御、跳跃、跌倒等。 状态机在游戏开发中有广泛用途。  
### 适配器模式
适配器模式的作用是解决两个软件实体间的接口不兼容的问题。 别名包装器。  
#### 现实中的适配器
1 港式插头转换器 2 电源适配器 3 USB转接口  
#### 适配器模式的应用
```javascript
var addressAdapter = function(oldAddressfn){
  var address = {},
    oldAddress = oldAddressfn()
  for(var i=0, c; c=oldAddress[i++];){
    address[c.name] = c.id
  }
  return function(){
    return address
  }
}
render(addressAdapter(getGuangdongCity))
```
#### 小结
· 适配器模式主要用来解决两个已有接口之间不匹配的问题。 ·  装饰者模式是为了给对象增加功能，适配模式通常只包装一次。代理模式是为了控制对象的访问。  · 外观模式显著特点是定义了一个新接口。  
## 设计原则和编程技巧
这部分我们将学习一些面向对象的设计原则，前辈总结的设计原则通常指 单一职责原则、里氏替换原则、依赖倒置原则、接口隔离原则、合成复用原则和最少知识原则。  
### 单一职责原则
就一个类而言，应该仅有一个引起它变化的原因。 JavaScript中更多的是被运用在对象或者方法级别上。 单一职责原则(SRP)的职责被定义为“引起变化的原因”。 SRP原则体现为：一个对象(方法)只做一件事情。  
#### 设计模式中的SRP原则
SRP原则有广泛运用 如代理模式、迭代器模式、单例模式和装饰者模式。  
__1 代理模式__   
通过增加虚拟代理把预加载图片的职责放到代理对象中，而本体仅仅负责往页面中添加img标签
```javascript
var myImage = (function(){
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src){
      imgNode.src = src
    }
  }
})()

var proxyImage = (function(){
  var img = new Image
  img.onload = function(){
    mImage.setSrc(this.src)
  }
  return {
    setSrc: function(src){
      myImage.setSrc('file:// /C:/Users/someone/Desktop/loading.gif')
      img.src = src
    }
  }
})()
proxyImage.setSrc('http://imgcache.qq.com/music/photo/sfeisdfeEDEde.jpg')
```
__2 迭代器模式__  
遍历集合往页面添加div  
```javascript
var appendDiv = function(data){
  for(var i=0, l=data.length; i<l; i++){
    var div = document.createElement('div')
    div.innerHTML = data[i]
    document.body.appendChild(div)
  }
}
appendDiv([1, 2, 3, 4, 5, 6])
```
如果数据从array变成object，那遍历data的代码会出现问题，这时候必须修改appendDiv里的代码。  
```javascript
var each = function(obj, callback){
  var value,
    i=0,
    length=obj.length,
    isArray=Array.isArray(obj)
  if(isArray){
    for(; i<length; i++){
      callback.call(obj[i], i, obj[i])
    }
  }else{
    for(i in obj){
      value = callback.call(obj[i], i, obj[i])
    }
  }
  return obj
}

var appendDiv = function(data){
  each(data, function(i, n){
    var div = document.createElement('div')
    div.innerHTML = n
    document.body.appendChild(div)
  })
}

appendDiv([1, 2, 3, 4, 5])
appendDiv({a:1, b:2, c:3, d:4, e:5})
```
__3 单例模式__  
```javascript
var getSingle = function(fn){
  var result
  return function(){
    return result || (result = fn.apply(this, arguments))
  }
}
var createLoginLayer = function(){
  var div = document.createElement('div')
  div.innerHTML = '一个登录浮窗'
  document.body.appendChild(div)
  return div
}
var createSingleLoginLayer = getSingle(createLoginLayer)
var loginLayer1 = createSingleLoginLayer()
var loginLayer2 = createSingleLoginLayer()
console.log(loginLayer1 === loginLayer2)  //true
```
__4 装饰者模式__  
通常让类或者对象开始时只具有一些基础职责。装饰者模式可以为对象动态增加职责。  
```javascript
Function.prototype.after = function(afterfn){
  //...
}
```
SRP原则的应用难点就是如何去分离职责。  
#### 何时应该分离职责
要明确并不是所有职责都应该一一分离。 一方面随着需求变化有职责是同时变化那就不需要分离他们。 另一方面职责变化轴线仅当他们确定发生变化时才有意义，即使职责被耦合在一起，但他们没有发生改变征兆则没必要分离。  
#### 违反SRP原则
jQuery中的attr既负责赋值又负责取值，这对于维护者带来一些苦难，但却简化了用户的使用。  
在方便性与稳定性之间要有一些取舍。  
#### SRP原则的优缺点
优点是 降低了单个类或者对象的复杂度，有助于代码复用和进行单元测试。  
缺点是 会增加编写代码的复杂度。  
### 最少知识原则
最少知识原则(LKP)说的是一个软件实体应当尽可能少的与其它实体发生相互作用。 这里的软件实体是一个广义概念，包括对象、 系统、类、模块、函数、变量等。   
#### 减少对象之间的联系
最少知识原则要求我们在设计程序时，应当尽量减少对象之间的交互。 如果两个对象间不必彼此直接通信，那么这两个对象就不要发生直接的相互联系。   
#### 设计模式中的最少知识原则
__1 中介者模式__  
让所有相关的对象都通过中介者对象来通信，而不是互相引用。  
__2 外观模式__
在JavaScript中使用场景不多。 外观模式主要是为了子系统中的一组接口提供一个一致的界面，外观模式定义了高层接口，使子系统更加容易使用。  
#### 封装在最少知识原则中的体现
我们可以让对象只暴露必要的接口，让对象之间的联系限制在最小的范围之内。同时，封装也用来限制变量的作用域。在JavaScript中对变量作用域的规定是：
- 变量在全局声明，或者在代码任何位置隐式声明(不用var)，则该变量在全局可见
- 变量在函数内显式声明(使用var)，则在函数内可见
最少知识原则也叫迪米特法则。  
### 开放-封闭原则
> 软件实体(类、模块、函数)等应该是可以扩展的，但是不可修改。  
#### 开放和封闭
开放-封闭原则的思想：当需要改变一个程序的功能或者这个程序增加新功能的时候，可以使用增加代码的方式，但是不允许改动程序的源代码。  
#### 用对象的多态性消除条件分支
过多条件分支语句使造成程序违反开放-封闭原则的一个常见原因。 利用对象的多态性来让程序遵循开放-封闭原则，是一个常用的技巧。  
#### 找出变化的地方
通过封装变化的方式，可以把系统中稳定不变的部分和容易变化的部分隔离开来。  
__1 放置挂钩__  
我们在程序有可能发生变化的地方放置挂钩，挂钩的返回结果决定了程序的下一步走向。  
__2 使用回调函数__
在JavaScript版本的设计模式中，策略模式和命令模式等都可以用回调函数轻松实现。  
```javascript
var arrayMap = function(ary, callback){
  var i=0,
   length=ary.length,
   value,
   ret=[]
  for(; i<length; i++){
    value = callback(i, ary[i])
    ret.push(value)
  }
  return ret
}
var a = arrayMap([1, 2, 3], function(i, n){
  return n*2
})
var b = arrayMap([1, 2, 3], function(i, n){
  return n*3
})
console.log(a)
console.log(b)
```
#### 设计模式中的开放-封闭原则
可以这样说，开放-封闭原则是编写一个好程序的目标，其它设计原则都是达到这个目标的过程。  
-1 发布-订阅模式  
对象不用再显式地调用另外一个对象的某个接口。当有新的订阅者出现发布者的代码不需要进行任何修改；发布者改变也不影响也不影响之前的订阅者。  
-2 模板方法模式  
在一个运用了模板方法模式的程序中，子类的方法种类和执行顺序是不变的，所以我们把这部分逻辑抽出来放到父类的模板方法里；而子类的方法具体怎么实现则是可变的，于是把这部分变化的逻辑封装到子类中。  
-3 策略模式  
模板方法模式基于继承的思想，而策略模式则偏重于组合和委托。  
-4 代理模式 预加载图片  
-5 职责链模式   
#### 开放-封闭原则的相对性  
- 挑选出最容易发生变化的地方，然后构造抽象来封闭这些变化
- 在不可避免发生修改的时候，尽量修改哪些相对容易修改的地方。  
#### 接受第一次愚弄
> 有句古老的谚语说：“愚弄我一次，应该羞愧的是你。再次愚弄我，应该羞愧的是我。”这也是一种有效的对待软件设计的态度。为了防止软件背着不必要的复杂性，我们会允许自己被愚弄一次。
一方面我们需要尽快知道程序在哪些地方会发生变化，这要求我们有一些“未卜先知”的能力。 另一方面在最初编码时，先假设变化永远不会发生，有利于我们迅速完成需求。当变化发生且影响我们工作时，再回头来封装这些变化。  
### 接口和面向接口编程  
第一种接口，通过主动暴露接口通信，可以隐藏软件系统内部的工作细节。  
第二种接口，一些语言提供的关键字。  
第三种接口，“面向接口编程”中的接口 _接口是对象能响应的请求的集合。_   
JavaScript中除了number、string、boolean等基本数据类型外，其他对象可以被看成“天生”被“向上转型”成了Object类型。  
#### typescript版本的命令模式
```typescript
interface Command{
  execute: Function;
}
class RefreshMenuBarCommand implements Command{
  constructor() {
  }
  execute(){
    console.log('刷新菜单界面')
  }
}
class AddSubMenuCommand implements Command{
  constructor(){}
}
var refreshMenuBarCommand = new RefreshMenuBarCommand(),
  addSubMenuCommand = new AddSubMenuCommand(),
  delSubMenuCommand = new DelSubMenuCommand();
refreshMenuBarCommand.execute();
addSubMenuCommand.execute();
delSubMenuCommand.execute();
```
### 代码重构
模式和重构之间有着一种与生俱来的关系。从某种角度来看，设计模式的目的就是为许多重构行为提供目标。  
#### 提炼函数
- 避免出现超大函数。
- 独立出来的函数有助于代码复用。
- 独立出来的函数更容易被覆写。
- 独立出来的函数如果拥有一个良好的命名，它本身就起到了注释作用。
#### 合并重复的条件片段
```javascript
var paging = function(currPage){
  if(currPage == 0){
    currPage = 0
    jump(currPage)
  }else if(currPage >= totalPage){
    currPage = totalPage
    jump(currPage)
  }else{
    jump(currPage)
  }
}
```
#### 把条件分支语句提炼成函数
```javascript
var isSummer = function(){
  var date = new Date()
  return date.getMonth() >= 6 && date.getMonth() <=9
}
var getPrice = function(price){
  if(isSummer){
    return price * 0.8
  }
  return price
}
```
#### 合理使用循环 
```javascript
var createXHR = function(){
  var versions = ['MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0','MSXML2.XMLHttp']
  for(var i=0, version; version=versions[i++];){
    try{
      return new ActiveXObject(version)
    }catch(e){}
  }
}
var xhr = createXHR()
```
#### 提前让函数退出代替嵌套条件分支 
```javascript
var del = function(obj){
  if(obj.isReadOnly){
    return
  }
  if(obj.isFolder){
    return deleteFolder(obj)
  }
  if(obj.isFile){
    return deleteFile(obj)
  }
}
```
#### 传递对象参数代替过长的参数列表
```javascript
var setUserInfo = function(id, name, address, sex, mobile, qq){
  //...
}
// VS
var setUserInfo = function(obj){
  //...
  console.log(obj.id)
}
```
#### 尽量减少参数数量
`var draw = function(width, height, square){}` square应当再函数内部计算。(由传入的参数加一定规则)  
#### 少用三目运算符
如果条件分支逻辑简单且清晰，无碍我们使用三目运算符。 当逻辑分支非常复杂，if else语句的好处-阅读相对容易、修改方便等。  
#### 合理使用链式调用
让方法调用结束后返回对象自身。 如果链条结构相对稳定，后期不易发生修改，那么使用链式调用无可厚非。但如果该链条很容易发生变化，导致调试和维护困难，则建议普通调用的形式。  
#### 分解大型类
面向对象设计鼓励将行为分布在合理数量的更小对象之中。  
```javascript
var Attack = function(spirit){
  this.spirit = spirit
}
Attack.prototype.start = function(type){
  return this.list[type].call(this)
}
Attack.prototype.list = {
  waveBoxing: function(){
    console.log(this.spirit.name + '波动拳')
  },
  whirlKick: function(){
    console.log(this.spirit.name + '旋风腿')
  }
}

//这段代码也是策略模式的运用之一
var Spirit = function(name){
  this.name = name
  this.attackObj = new Attack(this)
}
Spirit.prototype.attack = function(type){
  this.attackObj.start(type)
}
var spirit = new Spirit('RYU')
spirit.attack('waveBoxing')
spirit.attack('whirlKick')
```
#### 用return退出多重循环
```javascript
var print = function(i){
  console.log(i)
}
var func = function(){
  for(var i=0; i<10; i++){
    for(var j=0; j<10; j++){
      if(i*j > 30){
        return print(i)
      }
    }
  }
}
func()
```


































