const sql = require("../db/db.js");

const Comentarios = function (comentario) {
    this.user = comentario.user;
    this.texto = comentario.texto;
};

Comentarios.create = (newComentario, result) => {
    sql.query("INSERT INTO comentarios SET ?", newComentario, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //console.log("Comentario creado: ", { id: res.insertId, ...newComentario });
        result(null, { id: res.insertId, ...newComentario });
    });
};


Comentarios.getAll = (result) => {
    let query = "SELECT user, texto FROM comentarios";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        //console.log("Comentarios: ", res);
        result(null, res);
    });
};

module.exports = Comentarios;
