import pgDatabase from "../database/pgDatabase.js";
import hash from "@adonisjs/core/services/hash";

export default class UsuariosController{
    
   async Registro({ request, response }) {
    const {nombre, apellido, nombre_usuario, correo_electronico, cargo, contrasena} = request.body()

    // Hashear la contraseña
    const newPassword = await hash.make(contrasena)

    const resul = await pgDatabase.query(
        `INSERT INTO usuarios (nombre, apellido, nombre_usuario, correo_electronico, cargo, contrasena) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [nombre, apellido, nombre_usuario, correo_electronico, cargo, newPassword]
    )

    if (resul.rowCount > 0) {
        return response.json({
            mensaje: 'Registro correcto',
            nombre,
            apellido,
            nombre_usuario,
            correo_electronico,
            cargo
        })
    } else {
        return response.json({ mensaje: 'No se registró' })
    }
}

   async Login({ request, response }) {
  const { correo_electronico, contrasena } = await request.body();

  const result = await pgDatabase.query(
    `SELECT * FROM usuarios WHERE correo_electronico = $1`,
    [correo_electronico]
  );

  if (result.rows.length > 0) {
    const user = result.rows[0];

    const valido = await hash.verify(user.contrasena, contrasena);

    if (valido) {
      return response.json({
        mensaje: 'bienvenido',
        nombre: user.nombre,
        correo: user.correo_electronico
      });
    }
  }

  return response.json({ mensaje: 'error email o password incorrectos' });
}
}