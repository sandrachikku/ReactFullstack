import todoSchema from "./models/todo.model.js";

export async function addTodo(req,res){
    try{
        console.log(req.body);
        const{...todo}=req.body;
        
        const data=await todoSchema.create({...todo});
        console.log(data);
        
        return res.status(201).send({msg:data})
        
    }catch(error){
        res.status(404).send({msg:error})
    }
}

export async function getTodos(req,res) {
    try {
        console.log("fetch");
        const todos=await todoSchema.find();
        console.log(todos);
        res.status(200).send(todos)
        
    } catch (error) {
        res.status(404).send({msg:error})
    }
}

export async function deleteTodo(req,res) {
    try {
         const {_id}=req.params;
        const data=await todoSchema.deleteOne({_id})
        console.log("deleted");
        
        res.status(201).send(data);
    } catch (error) {
        res.status(404).send(error)
    }   
}
