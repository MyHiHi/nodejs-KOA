// async function getData(){
//     console.log(2)
//     return 'this is data '
// }
// console.log(getData())
// var p = getData()
// p.then((data)=>{
//     console.log(data+"*******")
// })

// async function fun(){
//     console.log(1)
//     var p = await getData()
//     console.log(p)
//     console.log(3)
// }
// fun()

function getData(){
    return new Promise((resolve,reject)=>{
            setTimeout(() => {
                var name = "晓梅"
                resolve(name)
            }, 1000);
    })
}
async function test(){
    var data = await getData()
    console.log(data)
}
test()
