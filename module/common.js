exports.getPostData = (ctx)=>{
    return new Promise((resolve ,reject)=>{
        data=""
        try{
            ctx.req.on("data",(chunk)=>{
                    data+=chunk;
            })
            ctx.req.on("end",(chunk)=>{
                resolve(data)
            })
        }catch(err){
            reject(err);
        }
    })
}