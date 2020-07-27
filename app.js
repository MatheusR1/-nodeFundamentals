const express = require('express');
const { json } = require('express');

const port = 8080;

const app = express();


app.use(express.json());

// CRUD - CREAT, READ, UPDATE , DELETE


// um middleware é chamado independente da rota
app.use((req,res, next)=>{
    console.time('Request')
    console.log(`Método : ${req.method} URL : ${req.url}`)

    next(); // defininto que ele continue o fluxo do codigo. 
    console.timeEnd('Request')
})


function checkUsersExists(req,res,next){
    if(!req.body.name){
        return res.status(400).json({error: "User name is required"});
    }

    return next();
}

function checkUsersInArray(req,res,next){
    const user= users[req.params.index]

    if(!user){return res.status(400).json({error: "User does not exists"})};

    req.user= user
    return next();
}


const users = ['Matheus', 'Pedro', 'Bia'];

// Rota que lista todos os usuários do array
app.get('/users',(req,res)=>{
    res.json(users);
})

// para para listar usuário específico 
app.get("/users/:index",checkUsersInArray,(req,res)=>{
    res.json(req.user);
});

// para adicionar novo usuário
app.post('/users', checkUsersExists, (req,res)=>{
    const { name } = req.body;

    users.push(name);

    res.json(users);
})

// para atulizar um usuário já existente. 
app.put ('/users/:index', checkUsersExists,checkUsersInArray,(req ,res)=>{

    const {index} = req.params;
    const { name } = req.body

    users[index]= name;

    return res.json(users)
});

app.delete('/users/:index', checkUsersInArray, (req,res)=>{
    const {index} = req.params;

    users.splice(index,1);

    return res.send("deletado.")
});

// iniciando servidor 
app.listen(port, console.log (`sever rodando na porta ${port}`));