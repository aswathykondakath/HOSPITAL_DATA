var express = require('express')
var app = new express();
//file system module
const fs = require('fs');
//parsing data
app.use(express.json());
//app.use(express.urlencoded({extended:true}));
//logger info
 
const logger = require('morgan');
app.use(logger('dev'));

const datas = require('./data.json');
//get operation
app.get('/hospital',(req,res) => {
    res.send(datas);
})
//post
app.post('/hospital',(req,res)=>{
    datas.push(req.body);
    fs.writeFile('data.json',JSON.stringify(datas),(err,resp)=>{
    if(err){
        res.send("Data cannot be written");
    }
    else{
        res.send("Data written successfully"); 
    }
    })
}) 
//put
app.put('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    datas.forEach((item)=>{
        if(item.Hospital_Name == name){
            item.Patient_Count=req.body.Patient_Count;
            item.Hospital_Location=req.body.Hospital_Location;
        }
    })
    fs.writeFile('data.json',JSON.stringify(datas),(err,resp)=>{
        if(err){
            res.send("Data could not be updated");
        }
        else{
            res.send("Data updated");
        }
    })
})
//delete
app.delete('/hospital/:name',(req,res) => {
    let name=req.params.name
   
        let value = datas.filter(item => item.Hospital_Name !== name);
    fs.writeFile('data.json',JSON.stringify(value),(err,resp)=>{
        if(err){
            res.send("Data cannot be deleted")
        }
        else{
          res.send("Data deleted")
        }
    })
})
//creating port
app.listen(3000);
console.log("Server listening to port 3000");