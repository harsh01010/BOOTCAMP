/*
// callbacks and callback hell

function makeDough(callback){
    setTimeout(()=>{
        Dough = '👍';
        console.log(`dough is ready`,Dough)
        callback(Dough);
    },2000)
    
}

function addSouce(dough,callback){
    setTimeout(()=>{
        Sauce = '🍅';
        console.log(`added the sauce`,Sauce);
        callback(dough,Sauce);
    },2000)
}
function addCheese(dough,sauce,callback){
    setTimeout(()=>{
        Cheese = '🧀';
        console.log(`added some Cheese`,Cheese);
        callback(dough,sauce,Cheese);
    },2000)
}
function addToppings(dough,souce,cheese,callback){
    setTimeout(()=>{
        Toppings = '🥬🥦🌽🍄🌶🧅🧅';
        console.log(`added Toppings`,Toppings);
        callback(souce+dough+cheese+Toppings+'✔');
    },2000)
}
function bakePizza(dough,souce,cheese,toppings,callback){
    setTimeout(()=>{
        Bake = '😎Being Baked';
        console.log(Bake);
        console.log(souce+dough+cheese+toppings+Bake+'✔');
        callback(souce+dough+cheese+toppings+Bake+'✔');
    },2000)
}
makeDough((dough)=>{
    addSouce(dough,(souce)=>{
        addCheese(dough,souce,(cheese)=>{
            addToppings(dough,souce,cheese,(toppings)=>{
                bakePizza(dough,souce,cheese,toppings,(bake)=>
                    console.log(`😋😋😋 PIZZA HAS BEEN SERVED 😋😋😋`)
                   )
                })
                
            })
            
        })
    });

    */
// promise and .then and .cath and .finally
/*
function createList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const list = '📓';
            resolve(list);
        }, 2000);
    });
}

function shortList(list) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const sList = '📜';
            resolve(sList);
        }, 3000);
    });
}

function takeInterview(sList) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const interview = '💻';
            resolve(interview);
        }, 2000);
    });
}

function callLetter(interview) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const call = '📞';
            resolve(call);
        }, 2000);
    });
}

createList()
    .then((list) => {
        console.log("Created The List", list);
        return shortList(list);
    })
    .then((sList) => {
        console.log("ShortListed The Candidates", sList);
        return takeInterview(sList);
    })
    .then((interview) => {
        console.log("Interview Taken", interview);
        return callLetter(interview);
    })
    .then((call) => {
        console.log("Call Letter", call);
    })
    .finally(()=>{
        console.log("Process Done")
    });
*/
// Async Await
function createList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const list = '📓';
            resolve(list);
        }, 2000);
    });
}

function shortList(list) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const sList = '📜';
            resolve(sList);
        }, 3000);
    });
}

function takeInterview(sList) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const interview = '💻';
            resolve(interview);
        }, 2000);
    });
}

function callLetter(interview) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const call = '📞';
            resolve(call);
        }, 2000);
    });
}

async function interview(){
    try{
    let list = await createList();
    console.log("Created The List", list);
    let sList = await shortList(list);
    console.log("ShortListed The Candidates", sList);
    let interview = await takeInterview(sList)
    console.log("Interview Taken", interview);
    let call = await callLetter(interview);
    console.log("Call Letter", call);
    }catch(error){
        console.log("error occured,",error)
    }finally{
        console.log(`Hiring Process Has Been Completed!`)
    }
}
interview();