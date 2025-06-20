import pgDatabase from "../database/pgDatabase.js";

export default class ActividadesLudicasController{
    async crearActividadLudica({ request, response }) {
  const {
    nombre_usuario,
    nombre_actividad,
    fecha_actividad,
    descripcion,
    imagen_video,
    archivo_adjunto
  } = request.body();

  const result = await pgDatabase.query(
    `INSERT INTO actividades_ludicas 
      (nombre_usuario, nombre_actividad, fecha_actividad, descripcion, imagen_video, archivo_adjunto) 
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [nombre_usuario, nombre_actividad, fecha_actividad, descripcion, imagen_video, archivo_adjunto]
  );

  if (result.rowCount > 0) {
    return response.json({ mensaje: "Actividad registrada con éxito", data: result.rows[0] });
  } else {
    return response.json({ mensaje: "No se pudo registrar la actividad" });
  }
}



} 