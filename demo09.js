// function Person(name,age){
//     this.name = name;
//     this.age = age;
//     this.run = function(){
//         console.log(`${this.name} 's age is ${this.age}`)
//     }
// }

// Person.prototype.sex = '男'
// Person.prototype.work = function(){
//     console.log(`${this.name} 's sex is ${this.sex}`)
// }

// function Web(name,age){
//     Person.call(this.name,age)
// }


// Web.prototype=new Person()

// var w = new Web("小米",44)
// w.work()
// w.run()
// // var p = new Person("Ploy",33)
// // p.run()
// // p.work()
// // Person.setName = function(name){
// //     this.name= name;
// //     console.log(this.sex,name)
// // }
// // Person.setName('PKK')
// // p.run()
// // p.work()
// // p.run()



// function Person(name,age){
//     this.name = name;
//     this.age = age;
//     this.run = function(){
//         console.log(this.name+' ---- '+this.age)
//     }

// }

// Person.prototype.work = function(){
//     console.log('work')
// }

// function Web(name,age){
//     // Person.call(name,age)
// }
// Web.prototype = new Person()
// var r = new Web('小华',33)
// r.run()


// class Person{
//     constructor (name,age){
//         this._name = name;
//         this._age = age;
//     }
//     getName(){
//         console.log(this._name)
//     }
//     setName(name){
//         this._name=name
//     }
// }

// var p = new Person('小华',33)
// p.getName()
// p.setName('芳华')
// p.getName()



// class Person{
//     constructor(name,age){
//         this._name = name
//         this.age = age
//     }
//      getInfo(){
//         console.log(`${this._name} 's age is ${this.age}`)
//     }
//     run(){
//         console.log(`${this._name} is running...`)
//     }
//     static work(){
//         console.log('my name is '+this._name)
//     }
// }


// class Ploy extends Person{
//     constructor(name,age,sex){
//         super(name,age)
//         this.sex = sex
//     }
//     print(){
//         console.log(`${this._name} age: ${this.age} gender: ${this.sex}`)
//     }
// }

// var ploy = new Ploy('Mar',22,'男')
// ploy.print()
// ploy.getInfo()
// console.log(ploy._name)
// Person.work()


class Db{
    static getInstance(name){
        if(!Db.info){
            Db.info = new Db(name)
        }
        return Db.info
    }
    constructor(name){
        console.log('触发构造函数',name)
        this.name = name
        this.getConnect()
    }
    getConnect(){
        console.log('连接数据库')
    }
    find(){
        console.log('************',this.name)
    }
}

var a1 = Db.getInstance('小华')

var a2 = Db.getInstance('baid')
a1.find()
a2.find()
console.log(a2)