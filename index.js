const express=require("express");
const request =require("request");
const https = require('https');
const app=express();
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",(req,res)=>{
    const firstName=req.body.fName
    const lastName=req.body.lName
    const email=req.body.email
    
    var data={
        "members":[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
    }
    var jsonData =JSON.stringify(data);
    const url="https://us1.api.mailchimp.com/3.0/lists/242e503099";
    const options={
        method:"POST",
        auth:"pavan:1d7205d4cecde6fe488ec83c341a4e736-us1"
    }
    const request=https.request(url,options,(response)=>{
       if(response.statusCode==200){
           res.sendFile(__dirname +"/success.html")
       } else{
           res.sendFile(__dirname +"/failure.html")
       }

       response.on("data",(data)=>{
           console.log(JSON.parse(data))
       })
    })
    request.write(jsonData)
    request.end();
})
app.post('/failure',(req,res)=>{
    res.redirect('/')
})

app.listen(process.env.PORT||1040,()=>{
    console.log("App runs in 1040")
})

//d7205d4cecde6fe488ec83c341a4e736-us1
//242e503099