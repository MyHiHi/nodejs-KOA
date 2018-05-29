var demo = require('./demo12')
setTimeout(()=>{
    console.time('start')
    demo.find('user',{}).then((data)=>{
        console.timeEnd('start')
    })
   
},100)

setTimeout(()=>{
    console.time('start1')
    demo.find('user',{}).then((data)=>{
        console.timeEnd('start1')
    })
   
},3000)

setTimeout(()=>{
    console.time('start2')
    demo.find('user',{}).then((data)=>{
        console.timeEnd('start2')
    })
   
},4000)