const Comentarios = require("../models/comentarios.model.js");

exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body || !req.body.user || !req.body.texto) {
    res.status(400).send({
      message: "¡Datos vacíos o incompletos!"
    });
    return;
  }

  const comentario = new Comentarios({
    user: req.body.user,
    texto: req.body.texto
  });

  Comentarios.create(comentario, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al crear el comentario."
      });
    } else {
      res.send(data);
    }
  });
};

exports.list = (req, res) => {
  Comentarios.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al buscar los comentarios."
      });
    } else {
      res.send({ status: 200, data: data });
    }
  });
};
