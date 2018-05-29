// var mongo = require('mongodb').MongoClient;
// var dbName = 'koa';
// var url = 'mongodb://localhost:27017/'
// class MyData{
//     static getInstance(){
//         if (!MyData.instance){
//             MyData.instance = new MyData()
//         }
//         return MyData.instance
//     }
//     connect(){
//         return new Promise((resolve,reject)=>{
//             mongo.connect(url,(err,client)=>{
//                 if (err){
//                     reject(err)
//                     return ;
//                 }
//                 resolve(client.db(dbName))
//             })
//         })
//     }

//     insert(table,data){
//         return new Promise((resolve,reject)=>{
//             this.connect().then((db)=>{
//                 db.collection(table).insert(data,(err,response)=>{
//                     if (err){
//                         reject(err)
//                         return ;
//                     }
//                     resolve(response)
//                 })
//             })
//         })
//     }
// }
// var r = MyData.getInstance()
// r.insert('user',{'country':'China','user':'baidu'})
// console.log('ok')
// var r1 = MyData.getInstance()
// console.log(r == r1)