const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const http = require('http');
const { setupWebsocket } = require('./websocket')

const app = express();
const server = http.Server(app)

setupWebsocket(server)

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-tigh0.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors())
app.use(express.json())
app.use(routes);

server.listen(3333);

//tipos de parametros:

// Query Params: req.query (Filtros, ordenação, paginação, ...)
// Route Params: req.params (identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de um registro)

//front -> back -> RESPOSTA front
//e se quisermos que o back envie uma informcao pro front sem uma requisicao diretamente?
//utilizar protocolo websocket (socket.io)

//MongoDB (não-relacional)
