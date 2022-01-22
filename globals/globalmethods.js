// console.log(global)
setTimeout(()=>{
    console.log("This is set05");
    clearInterval(interval);
}, 5000);

let interval = setInterval(()=>{
    console.log("i show up every 1 sec")
}, 1000);
