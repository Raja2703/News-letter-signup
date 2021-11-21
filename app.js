// // API key
// // e9569fe08a2f6d24d08dd3801428ada7-us20

// // Audience ID
// // 5f20de58be

const express=require('express')
const https=require('https')
const bodyParser=require('body-parser')
const request=require('request')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post('/',(req,res)=>{
    const fistName=req.body.FirstName
    const lastName=req.body.lastName
    const email=req.body.Email

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fistName,
                    LNAME:lastName
                }
            }
        ]
    }

    const jsonData=JSON.stringify(data)

    const url="https://us20.api.mailchimp.com/3.0/lists/5f20de58be"
    const option={
        method:"POST",
        auth:"Raja:e9569fe08a2f6d24d08dd3801428ada7-us20"
    }

    const request=https.request(url,option,(response)=>{
        console.log(response.statusCode)
        if(response.statusCode === 200){
            res.sendFile(__dirname+'/success.html')
        }else{
            res.sendFile(__dirname+'/failure.html')
        }
        
        response.on('data',(data)=>{
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
})

app.post('/failure',(req,res)=>{
    res.redirect('/')
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server started on port 3000')
})