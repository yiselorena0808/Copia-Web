import pgDatabase from "../database/pgDatabase.js";

export default class GestionController {

  // 1. Listar todas las gestiones
  async listarGestiones({ response }) {
    const result = await pgDatabase.query('SELECT * FROM gestion_epp ORDER BY fecha_creacion DESC');
    return response.json({ data: result.rows });
  }

  // 2. Crear una nueva gestión
  async crearGestion({ request, response }) {
    const {
      id,
      nombre,
      apellido,
      cedula,
      cargo,
      productos,
      cantidad,
      importancia,
      fecha_creacion
    } = request.body();

    try {
      const result = await pgDatabase.query(`
        INSERT INTO gestion_epp(id, nombre, apellido, cedula, cargo, productos, cantidad, importancia, fecha_creacion)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [id, nombre, apellido, cedula, cargo, productos, cantidad, importancia, fecha_creacion]);

      return response.json({ mensaje: 'Gestión creada con éxito' });
    } catch (error) {
      console.error('Error al crear gestión:', error);
      return response.status(500).json({ mensaje: 'Error al crear la gestión' });
    }
  }


  async actualizarEstado({ params, request, response }) {
    const { estado } = request.body();
    const { id } = params;

    try {
      const result = await pgDatabase.query(`
        UPDATE gestion_epp SET estado = $1 WHERE id = $2
      `, [estado, id]);

      if (result.rowCount === 0) {
        return response.status(404).json({ mensaje: 'Gestión no encontrada' });
      }

      return response.json({ mensaje: 'Estado actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      return response.status(500).json({ mensaje: 'Error al actualizar el estado' });
    }
  }

  async eliminar({ params, response }) {
    const { id } = params;

    try {
      const result = await pgDatabase.query(`
        DELETE FROM gestion_epp WHERE id = $1
      `, [id]);

      if (result.rowCount === 0) {
        return response.status(404).json({ mensaje: 'Gestión no encontrada' });
      }

      return response.json({ mensaje: 'Gestión eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar gestión:', error);
      return response.status(500).json({ mensaje: 'Error al eliminar la gestión' });
    }
  }
}
