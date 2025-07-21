import pgDatabase from "../database/pgDatabase.js";

export default class ReportesController{

  async  listarReportes({ request, response }) {
     const result = await pgDatabase.query('SELECT * FROM reportes order by fecha desc');
     return response.json({ mensaje: result.rows });
   }
   public async eliminar({ params, response }) {
    try {
      const result = await pgDatabase.query('DELETE FROM reportes WHERE id_reporte = $1', [params.id_reporte])

      if (result.rowCount === 0) {
        return response.status(404).json({ mensaje: 'reporte no encontrado' })
      }

      return response.json({ mensaje: 'Reporte eliminado correctamente' })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ mensaje: 'Error al eliminar el reporte' })
    }
  }
  async actualizarEstado({ params, request, response }) {
  try {
    const { estado } = request.body;
    const { id_reporte } = params.id_reporte; 

    const result = await pgDatabase.query(
      'UPDATE reportes SET estado = $1 WHERE id_reporte = $2',
      [estado, id_reporte]
    );

    if (result.rowCount === 0) {
      return response.status(404).json({ mensaje: 'Reporte no encontrado' });
    }

    return response.json({ mensaje: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ mensaje: 'Error al actualizar el estado' });
  }
}



} 