const Pelicula = require("../models/peliculas.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "¡Datos vacíos!"
    });
  }

  const pelicula = new Pelicula({
    idPelicula: req.body.idPelicula,
    idCategoria: req.body.idCategoria,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    reparto: req.body.reparto,
    poster: req.body.poster,
    banner: req.body.banner,
    trailerurl: req.body.trailerurl,
    fecha: req.body.fecha,
    duracion: req.body.duracion,
    clasificacion: req.body.clasificacion,
    peliculaUrl: req.body.peliculaUrl
  });

  Pelicula.create(pelicula, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al crear la película."
      });
    else res.send(data);
  });
};

exports.list = (req, res) => {
  Pelicula.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al buscar las películas."
      });
    else res.send({ status: 200, data: data });
  });
};

exports.getId = (req, res) => {
  Pelicula.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Película no encontrada con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al buscar id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "¡Sin contenido!"
    });
  }

  Pelicula.updateById(
    req.params.id,
    new Pelicula(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Película no encontrada con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar la película con id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Pelicula.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Película no encontrada con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se puede borrar la película con id " + req.params.id
        });
      }
    } else res.send({ message: `Película borrada con éxito` });
  });
};
