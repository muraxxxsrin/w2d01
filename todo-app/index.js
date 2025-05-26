const express = require('express');
const { Todo } = require("./models");
const bodyParser = require('body-parser');

const app=express();

app.use(bodyParser.json())

app.post("/todos",async(request,response)=>{
    console.log("Creating a todo:",request.body);
    try{
       const todo =  await Todo.addTodo({title:request.body.title,dueDate:request.body.dueDate});
    return response.json(todo);
    }catch(error){
        console.log(error);
        return response.status(422).json({error:error.message})
    } 
     
})

app.post("/todos/:id/markAsCompleted", async(request,response)=>{
    console.log("Marking a todo as completed wi id ",request.params.id);
    
    try{
        const todo= await Todo.findByPk(request.params.id);
        const updatedTodo=await todo.markAsCompleted();
        return response.json(todo);
    }
    catch(error){
        console.log(error);
        return response.status(422).json({error:error.message})
    }
})
app.listen(3000,()=>{
    console.log("server started at port 3000")
})