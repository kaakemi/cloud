const express = require('express');
const bodyParser = require('body-parser');

const os = require('os');

const app = express();

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

module.exports = app;