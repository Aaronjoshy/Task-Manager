const express = require('express');
const morgan = require('morgan');

const app = new express;
app.use (morgan('dev'))
app.use (express.json())

let tasks =[];
//router
app.get('/',(req,res)=>{
    res.json(tasks);
})
//router to create a new task
app.post('/tasks',(req,res)=>{
    //const task=req.body
    tasks.push(req.body);
    res.send({message:"Task added",tasks})
})

//edit / update task by id

app.put('/edit/:id',(req,res)=>{
    const id=req.params.id;
    const UpdatedTask=req.body;
    const index=tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found");
    }else{
        tasks.splice(index,1,UpdatedTask);
        res.send({message:"Task updated successfully",tasks})
        res.json(tasks);
    }

  
})

//app delete by id


app.delete("/remove/:id",(req,res)=>{
    const id=req.params.id;
    const UpdatedTask=req.body;
    const index=tasks.findIndex(task=>task.id===id)
    if(index===-1){
        res.send("Task not found");
    }else{
        tasks.pop(req.body);
        res.send({message:"Task deleted successfully",tasks});
    }
})

//Showing thing
app.get("/tasks/:id",(req,res)=>{
    const id = req.params.id;
    const task=tasks.find(task=>task.id===id);
    if(!task){
        res.send("Task not found");
    }else{
        res.json(task);
       
    }
})



app.listen(4090,(req,res)=>{
    console.log("Server is up and running on port 4050");
});
