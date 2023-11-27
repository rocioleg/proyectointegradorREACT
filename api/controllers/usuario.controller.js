const bcrypt = require("bcryptjs");
const sql = require("../db/db.js");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const mail = req.body.mail
    const password = req.body.password
console.log(mail);

    await sql.query(`SELECT * FROM usuarios WHERE mail = '${mail}'`, async (err, resSql) => {
        if (err) throw (err)
            if (resSql.length == 0) {
                res.status(404).send("usuario no encontrado");
            }
            else {
              //console.log("paso")
                const usuario = resSql[0];
                console.log(password)
                // comparo el hash q viene con el de la bd
                if(password == usuario.password){
                
                //crear token
                 // 1er param: info que va a guardar 
                 // 2do : llave para encriptar (luego hacer lo mismo q hicimos c port en .env)
                    const token = jwt.sign({user_id:usuario.id,user_mail:usuario.mail},'llave');
                    usuario.token = token;
                    sql.query(
                        "UPDATE usuarios SET token = ? WHERE id = ?",
                        [usuario.token, usuario.id],
                        (err, res) => {
                          if (err) {
                            console.log("error: ", err);
                          }
                          if (res.affectedRows == 0) {
                            result({ kind: "not_found" }, null);
                          }
                        }
                      );
                    res.status(200).json(usuario);
                }
            }//end of User exists i.e. results.length==0
        }) //end of connection.query()
};