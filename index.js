// var koa  =require('koa')
// var app  =new koa()
// app.use(async (ctx)=>{
//     ctx.body = "您好 koa2.x"
// })
// app.listen(4000)
// const va = 33;
// va=566
// console.log(va)

// var name="张三",age=34
// console.log(`${name}的年龄是${age}`)

// var name="黄玉"
// var app={
//     name,
//     run(){
//         console.log(`${this.name}在跑步`)
//     }
// }
// app.run()

// let friends = ["Mike","Jerry","Spol"]
// for (var i in friends){
//     console.log(`${friends[i]} is my friend`)
// }

var p = new Promise((resolve,reject)=>{
    setTimeout(() => {
        var name = "晓梅";
        if (Math.random() < 0.1) {
            reject("失白了");
        } else {
            resolve(name)
        }
    }, 1000);

})
p.then((data) => {
    console.log(data)
})
