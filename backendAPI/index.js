const express = require('express')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

//json
app.use(express.json())

//cors
app.use(
    (req, res, next)=>{
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        next()
    }
);

// test api 
app.get('/test',(req,res)=>{
    try{
        res.status(200).json({message: 'API is working'})
    }catch(error){
        res.status(500).json({message: error.message})
    }
});

// Get all users
app.get('/users',async (req,res)=>{
    try{
        const users = await prisma.users.findMany();
        res.status(200).json(users)
    }catch(error){
        res.status(400).json({message: error.message})
    }
});

//Get user by id
app.get('user/:id', async (req,res) =>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.sendStatus(200).json(user);
    }catch(error){
        res.sendStatus(400).json({message:error.message})
    }
})

//create a user
app.post('/user', async(req,res)=>{
    try{
        const user = await prisma.user.create({
            data:req.body
        })
        res.sendStatus(201).json(user);
    }catch(error){
        res.sendStatus(400).json({message:error.message})
    }
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`Server started on port: ${PORT}`));
