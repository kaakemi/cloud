const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const os = require('os');

const app = express();

const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'cloud'
});

conexao.connect(erro => {
    if (erro) {
        console.error('Não foi possível se conectar ao banco de dados', erro);
        return;
    }
    console.log('Conexão realizada com sucesso');
});

app.get(`/`, (request,response)=>{
    return response
        .status(200)
        .json({
            status:true,
            mensagem:"OK"
        })
}); 

app.get(`/redirect`,(request,response)=>{
    return response.redirect(301,'http://www.globo.com');
});

app.get(`/liveness`, (request,response)=>{
    // retorna se a aplicação está "viva" (disponível)
    return response
        .status(200)
        .json({
            status:true,
            path:"",
            gid:"",
            uid:""
        });
});

app.get(`/readiness`, (request,response)=>{
    // retorna se a aplicação está "pronta" (com todos os componentes disponíveis p/ executar as funções de sua responsabilidade)
    return response
        .status(200)
        .json({
            status:true,
            mensagem:"readiness",
            os:os.platform(),
            freemem:os.freemem(),
            homedir:os.homedir()
        });
});

app.get(`/consulta-dados`, (request,response)=>{
    const query = 'SELECT * FROM colaborador';
    conexao.query(query, (erro, resultado) => {
        if (erro) {
            console.error ('Erro ao realizar consulta', erro);
            resposta.status(500).send('Erro ao consultar os dados');
            return;
        }
        resposta.json(resultado)
    });
});


module.exports = app;