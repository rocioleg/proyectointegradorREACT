const sql = require("../db/db.js");

// constructor
const Pelicula = function (pelicula) {
    this.idPelicula = pelicula.idPelicula;
    this.idCategoria = pelicula.idCategoria;
    this.titulo = pelicula.titulo;
    this.descripcion = pelicula.descripcion;
    this.reparto = pelicula.reparto;
    this.poster = pelicula.poster;
    this.banner = pelicula.banner;
    this.trailerurl = pelicula.trailerurl;
    this.fecha = pelicula.fecha;
    this.duracion = pelicula.duracion;
    this.clasificacion = pelicula.clasificacion;
    this.peliculaUrl = pelicula.peliculaUrl;
};

Pelicula.create = (newPelicula, result) => {
    sql.query("INSERT INTO peliculas SET ?", newPelicula, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("pelicula creada: ", { id: res.insertId, ...newPelicula });
        result(null, { id: res.insertId, ...newPelicula });
    });
};

Pelicula.findById = (id, result) => {
    sql.query(`SELECT * FROM peliculas WHERE idPelicula = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("pelicula encontrada: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Pelicula with the id
        result({ kind: "not_found" }, null);
    });
};

Pelicula.getAll = (result) => {
    let query = "SELECT * FROM peliculas";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("peliculas: ", res);
        result(null, res);
    });
};

Pelicula.updateById = (id, pelicula, result) => {
    sql.query(
        "UPDATE peliculas SET idCategoria = ?, titulo = ?, descripcion = ?, reparto = ?, poster = ?, banner = ?, trailerurl = ?, fecha = ?, duracion = ?, clasificacion = ?, peliculaUrl = ? WHERE idPelicula = ?",
        [
            pelicula.idCategoria,
            pelicula.titulo,
            pelicula.descripcion,
            pelicula.reparto,
            pelicula.poster,
            pelicula.banner,
            pelicula.trailerurl,
            pelicula.fecha,
            pelicula.duracion,
            pelicula.clasificacion,
            pelicula.peliculaUrl,
            id
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("pelicula actualizada: ", { id: id, ...pelicula });
            result(null, { id: id, ...pelicula });
        }
    );
};

Pelicula.remove = (id, result) => {
    sql.query("DELETE FROM peliculas WHERE idPelicula = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("pelicula borrada id: ", id);
        result(null, res);
    });
};

Pelicula.removeAll = result => {
    sql.query("DELETE FROM peliculas", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} peliculas`);
        result(null, res);
    });
};

module.exports = Pelicula;
