const express = require('express');

const app = express();

const port = 7770;

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200);
    res.send({
        "message" : "Server is working great"
    });
});

app.get('*',(req,res)=>{
    res.status(500).json({
        "message" : "Route yet to be made"
    });
});

app.listen(port,()=>{
    console.log("server is running on the 7770 port");
});