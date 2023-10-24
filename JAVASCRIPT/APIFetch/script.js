// // object or value into a json string
// const data = {
//     hello:"world",
//     bye:"world",
//     json:"object",
//     ajax:"js and xml"
// }
// let y = JSON.stringify(data)
// console.log(y)
// /*
// Js can be used to send and retrive information from the network when needed(AJAX->asynchronous js and xml)

// fetch Api
// fetch is used to get data over the network
// let promise = fetch(url,[options]) -> without options, a get request is sent

// */

// let promise = fetch(`https://goweather.herokuapp.com/weather/Ny`)

// promise.then((response)=>{
//     console.log(response.headers)
//     console.log(response.status) //http status
//     console.log(response.ok) // true if status is between 200-299
//     return response.json();
// })
//     .then((response)=>{
    //         console.log(response.forecast)
    //     })
    // async function fetchData() {
        //     try {
            //     const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";
            
            //     const response = await fetch(apiUrl);

            //     if (!response.ok) {
                //         throw new Error("Network response was not ok");
                //     }
                
                //     const data = await response.json();
                //     console.log(data);
                //     } catch (error) {
                    //     console.error("Fetch error:", error);
//     }
//     finally{
//         console.log("fetching process completed")
//     }
// }
// fetchData();

/*
let globalData = null;

const url = `https://worldtimeapi.org/api/timezone/Asia/kolkata`
async function getData(url){
    try{
    let response = await fetch(url);
    if(!response.ok)
    {
        throw new Error("request failed")
    }
    let data = await response.json();
    return data;
    }
    catch(error){
        console.log(error);
    }
    finally{
        console.log("fetch completed");
    }
}
async function fetchData(){
    try{
        let data = await getData(url);
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
}
*/

const url = `https://newsapi.org/v2/everything?q=tesla&from=2023-09-24&sortBy=publishedAt&apiKey=4c46d109dbe64d0ab1647a0bd9ade88a`
async function getData(url){
    try{
    let response = await fetch(url);
    if(!response.ok)
    {
        throw new Error("request failed")
    }
    let data = await response.json();
    return data;
    }
    catch(error){
        console.log(error);
    }
    finally{
        console.log("fetch completed");
    }
}
async function fetchData(){
    try{
        let data = await getData(url);
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
}
fetchData();

