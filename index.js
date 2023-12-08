require('dotenv').config();

const cors = require('cors');
const { dbConection } = require('./database/config');

const express = require('express');
const app = express();
const server = require('http').Server(app);
//const io = require("socket.io")(server);

/*io.on("connection", function (socket) {
    console.log("Un cliente se ha conectado");
  });*/

//CONFIGURACION CORS
app.use(cors());

//LECTURA Y PARSEO DE BODY
app.use(express.json());

//CONECCION A BD
dbConection();

//RUTAS
app.use('/api/usuarioApp', require('./routes/usuarioApp.route'));
app.use( '/api/login', require('./routes/auth.route'));
app.use('/api/tipo', require('./routes/tipoServicio.route'));
app.use('/api/usuarios', require('./routes/usuario.route'));
app.use('/api/servicio', require('./routes/servicio.route'));


server.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto: ${process.env.PORT}`);
});



