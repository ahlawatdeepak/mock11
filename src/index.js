const express = require("express")
const mongoose = require("mongoose")
const List = require("../Models/list.model")
const cors = require("cors")
const connect = require("../Connect/Connect")
const req = require("express/lib/request")
const PORT = process.env.PORT || 8000
mongoose.set('strictQuery', true)



const app = express()

app.use(express.json())

app.use(cors())


app.get("/",async(req,res)=>{
     res.send("Hello world")
})


//  For List data ******************************************

app.get("/list",async(req,res)=>{
    try {
        const data=await List.find()
        res.send({data:data})
    } catch (error) {
        res.status(501).send(error.message)
    }
})


app.post("/list",async(req,res)=>{
    const list = req.body
    try {
       const data = await List.create(list)
       res.send({message:"List added successfully",data:data})
    } catch (error) {
        res.status(501).send(error.message)
    }
      
    
    
})

app.delete("/list/:id",async(req,res)=>{
    let id=req.params.id
  try {
      id=id.toString()
    let data=await List.findByIdAndDelete(id)
    if(!data){
        res.status(401).send("data not found")
    }
    else{
        res.send("List Deleted Successfully")
    }
    

  } catch (error) {
    res.status(401).send(error.message)
  }

   
})





app.listen(PORT, async () => {
    await connect()
    console.log(`Database Connected and app listening on port ${PORT}`)
})