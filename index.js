const express = require('express');
const port = 3000;
const app = express();

// query params = ?teste =1 uso req.query

// routes params = /user/1  uso req.params 

// body params = { }pego atravésdo corpo da requisição 


 // rota para consumir query params 
app.get ("/teste/", (req,res)=>{
    const nome = req.query.nome

    return res.json( { message:` hello ${nome}`})
})

// rota para consumir routes params 
app.get ("/users/:id", (req,res)=>{

    const { id } = req.params

    return res.json( {menssage: ` buscando o usuario ${id}`})
})

app.get ("/", (req,res)=>{


    res.json( ` hello ${nome}`)
})

app.listen(port, console.log(`server rodando na ${port}`));