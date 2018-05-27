var mongoClient = require("mongodb").MongoClient
var url = "mongodb://127.0.0.1:27017/"
var dbName = 'koa'

console.time('start')
mongoClient.connect(url,function(err,client){
    if (err){
        console.log(err)
        return;
    }
    var db = client.db(dbName)
    var k= db.collection('user')
    k.find({}).toArray((err,data)=>{
        if (!err){
            console.log(data.length)
        }
        console.timeEnd('start')
    })
    // k.insert({'username':'plulo',age:33,sex:"男"},(err,res)=>{
    //     if (!err){
    //         console.log('添加成功')
         
    //     }
    //     client.close()
    //     console.timeEnd('start')
    // })
})

