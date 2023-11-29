const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { API_PORT } = process.env;
const bcrypt = require("bcryptjs");

const Peliculas = require('./controllers/pelicula.controller.js');
const Usuario = require('./controllers/usuario.controller.js');
const Comentarios = require('./controllers/comentarios.controller.js');

const auth = require("./middleware/auth.js");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "hola soy el api node." });
});

//pasa por parametro el pass a encriptar
app.get("/generarPass/:pass", (req, res) => {
  const rondas = 10; // a la clave la encripta 10 veces 
  // primer param: a encriptar
  // segundo: veces a encriptar
  // tercero: lo que va a pasar cuando termine
  bcrypt.hash(req.params.pass,rondas,(err,miHash)=>{
    res.json({ 
      pass: req.params.pass,
      hash: miHash
    });
  })
});

app.post("/login",Usuario.login);

app.get("/solologueado", auth,(req, res) => {
  res.json({ message: "hola solo si estas logueado me ves." });
});

app.get("/peliculas", Peliculas.list); 
app.get("/peliculas/:id", Peliculas.getId); 
app.post("/peliculas", Peliculas.create); 
app.post("/api/peliculas/:id", Peliculas.update); 
app.delete("/api/peliculas/:id", Peliculas.delete);

app.get("/comentarios", Comentarios.list)
app.post("/comentarios", Comentarios.create)

// set port, listen for requests
const PORT = process.env.PORT || API_PORT;
const IP = process.env.IP || '192.168.1.10';
app.listen(PORT, IP, () => {
  console.log(`Server is running on ${IP}:${PORT}.`);
});
