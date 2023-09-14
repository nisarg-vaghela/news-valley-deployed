
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import https from 'https';
import axios from 'axios';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({path: './config.env'});

const app = express();
// const express = require("express");
// const https = require("https");
// const bodyParser = require("body-parser");

app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get('/:country/:category/:page/:pageSize', async (request, response) => {
    let country = request.params.country;
    let category = request.params.category;
    let page = request.params.page;
    let pageSize = request.params.pageSize;
    // console.log(country);
    // console.log(category);
    // console.log(page);
    // console.log(pageSize);

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=78f1717d11e3473b88301ecb8198e460&page=${page}&pageSize=${pageSize}`;
    // var dataa={};
    // https.get(url, (response)=>{
    //     response.on("data", (data)=>{
    //             dataa = JSON.parse(data);

    //         })
    //     })
        

   const dataa = await axios.get(url).then(res => res.data);
//    const data = dataa.data;
   console.log(dataa);
response.send(dataa);


//    .then((response) => {
//         const dataaa = response.data;
//         // console.log(response.data);
//         // console.log(dataa);
//        const dataa = 4;
//     });
//     console.log(dataa);
//     response.send(dataa);


    // let dataaa = JSON.parse(dataa);
    // console.log(dataa);
        // response.send(dataa);
    
//    fetch(url)
//     .then((response) => {console.log(response.body)});
    
    
  
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
}

app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`);
});