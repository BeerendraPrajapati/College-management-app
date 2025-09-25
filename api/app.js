const express=require('express')
const app=express();
const mongoose=require('mongoose')
const userRoute=require('./routes/user')
const courseRoute=require('./routes/course')
const feesRoute=require('./routes/fee')
const studentRoute=require('./routes/student')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
const cors=require('cors')
mongoose.connect('mongodb+srv://Veer_Tech:Veerendra@veertech.ftln5xb.mongodb.net/veerdb?retryWrites=true&w=majority&appName=VeerTech',{

    useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(()=>{
    console.log(" connted to database")
})
.catch(err=>{
    console.log(err)
})
app.use(bodyParser.json())
app.use(cors())

app.use(fileUpload({
   useTempFiles : true,
    
}));


app.use('/user',userRoute)
app.use('/course',courseRoute)
app.use('/student',studentRoute)
app.use('/fee',feesRoute)


module.exports=app;