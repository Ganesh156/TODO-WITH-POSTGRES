const express=require('express');
const app = express();

const pool = require('./data');

app.use(express.json())

//Routes are below 

//get all todos 
app.get("/todos",async(req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get a todo
app.get("/todos/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id])
        res.json(todo.rows)
    } catch (error) {
        
    }
    
})

//create a todo

app.post("/todos",async(req,res)=>{
    try {
        const {description} = req.body
        const newTOdo= await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);

        res.json(newTOdo.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
})

//update todos

app.put("/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {description}= req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id=$2",[description,id])

        res.json("Todo Updated..!!");
    } catch (error) {
        
    }
})

//delete todos



app.get('/',(req, res) => {
    res.send('Helo you are in home page')
    
})

app.listen(5000,()=>{
    console.log("App is runnig on port:5000");
})