const express = require('express');
const { json } = require('express');

const port = 8080;

const app = express();


app.use(express.json());

// CRUD - CREAT, READ, UPDATE , DELETE

const users = ['Matheus', 'Pedro', 'Bia'];

// Rota que lista todos os usuários do array
app.get('/users',(req,res)=>{
    res.json(users);
})

// para para listar usuário específico 
app.get("/users/:index",(req,res)=>{
    const {index} = req.params;
    res.json(users[index]);
});

// para adicionar novo usuário
app.post('/users',(req,res)=>{
    const { name } = req.body;

    users.push(name);

    res.json(users);
})

// para atulizar um usuário já existente. 
app.put ('/users/:index', (req ,res)=>{

    const {index} = req.params;
    const { name } = req.body

    users[index]= name;

    return res.json(users)
});

app.delete('/users/:index', (req,res)=>{
    const {index} = req.params;

    users.splice(index,1);

    return res.send("deletado.")
});

// iniciando servidor 
app.listen(port, console.log (`sever rodando na porta ${port}`));