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
 async listar({ response } ){
    try {
      const result = await pgDatabase.query('SELECT id, nombre, apellido, nombre_usuario, correo_electronico, cargo FROM usuarios ORDER BY id')
      return response.json(result.rows)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ mensaje: 'Error al obtener usuarios' })
    }
  }
   async obtener({ params, response }) {
    try {
      const result = await pgDatabase.query('SELECT id, nombre, apellido, nombre_usuario, correo_electronico, cargo FROM usuarios WHERE id = $1', [params.id])
      if (result.rows.length === 0) {
        return response.status(404).json({ mensaje: 'Usuario no encontrado' })
      }
      return response.json(result.rows[0])
    } catch (error) {
      console.error(error)
      return response.status(500).json({ mensaje: 'Error al obtener el usuario' })
    }
  }

  // Actualizar usuario
  async actualizar({ params, request, response }) {
  try {
    const { nombre, apellido, nombre_usuario, correo_electronico, cargo, contrasena } = request.body()
    const id = params.id

    const hashedPassword = await Hash.make(contrasena)

    const result = await pgDatabase.query(`
      UPDATE usuarios SET 
        nombre = $2, 
        apellido = $3, 
        nombre_usuario = $4, 
        correo_electronico = $5, 
        cargo = $6, 
        contrasena = $7
      WHERE id = $1
      RETURNING id
    `, [id, nombre, apellido, nombre_usuario, correo_electronico, cargo, hashedPassword])

    console.log(result)

    if (result.rowCount === 0) {
      return response.status(404).json({ mensaje: 'Usuario no encontrado' })
    }

    return response.json({ mensaje: `El usuario con id ${id} ha sido actualizado` })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ mensaje: 'Error al actualizar el usuario' })
  }
}


  // Eliminar usuario
  public async eliminar({ params, response }) {
    try {
      const result = await pgDatabase.query('DELETE FROM usuarios WHERE id = $1', [params.id])

      if (result.rowCount === 0) {
        return response.status(404).json({ mensaje: 'Usuario no encontrado' })
      }

      return response.json({ mensaje: 'Usuario eliminado correctamente' })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ mensaje: 'Error al eliminar el usuario' })
    }
  }

}