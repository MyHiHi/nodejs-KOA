var mongodb = require('mongodb').MongoClient
var objectId  = require('mongodb').ObjectID
var config = require('./config')
var dbName = config.dbName,url =config.url
class DB{
    static getInstance(){
        if (!DB.instance){
            DB.instance = new DB();
        }
        return DB.instance;
    }
    constructor(){
        this.dbClient=""
        this.connect()
    }
    connect(){
        // console.time('start')
        
       return new Promise((resolve,reject)=>{
           if (!this.dbClient){ //解决数据库多次连接的问题
                mongodb.connect(url,(err,client)=>{
                    if (!err){
                        this.dbClient = client.db(dbName)
                        resolve(client.db(dbName))
                    }else{
                        reject(err)
                    }
                })
           }else{
               resolve(this.dbClient)
           }
            
       })
    }


    find(collection,data){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                var k = db.collection(collection);
               k.find(data).toArray((err,docs)=>{
                   if (!err){
                       resolve(docs)
                    //    console.log(docs)
                   }else{
                       console.log('******')
                   }
                //    console.timeEnd('start')
               })

            })
        })
    }

    insert(collection,data){
        return new Promise((resolve,reject)=>{
                this.connect().then((db)=>{
                    db.collection(collection).insert(data,(err,docs)=>{
                        if (!err){
                            resolve(docs)
                            console.log('插入成功')
                        }else{
                            reject(err)
                            console.log('插入失败')
                        }
                    })
                })
        })
    }
    update(collection,json1,json2){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collection).update(json1,{$set:json2},(err,res)=>{
                    if (!err){
                        console.log('修改成功!')
                        resolve(res)
                    }else{
                        console.log('修改失败')
                        reject(err)
                    }
                })
            })
        })
    }
    remove(collection,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collection).remove(json,(err,data)=>{
                        if (!err){
                            console.log('删除成功')
                            resolve(data);
                        }else{
                            console.log('删除失败')
                            reject(err)
                        }
                })
            })
        })
    }
    getObjectId(id){
        return new objectId(id)
    }
}

var db = DB.getInstance()
// db.find("user",{})

module.exports= db