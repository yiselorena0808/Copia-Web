import pgDatabase from "../database/pgDatabase.js";

export default class BlogController{

    async listarPublicaciones({ response }) {
  const result = await pgDatabase.query(`SELECT * FROM publicaciones_blog ORDER BY fecha_creacion DESC`);

  return response.json({ data: result.rows }); 
 }
 

    async crearPublicacion({ request, response }) {
  const { titulo, descripcion, imagen, archivo } = request.body();

  const result = await pgDatabase.query(
    `INSERT INTO publicaciones_blog 
     (titulo, descripcion, imagen, archivo) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [titulo, descripcion, imagen, archivo]
  );

  if (result.rowCount > 0) {
    return response.json({ mensaje: 'Publicación creada con éxito', data: result.rows[0] });
  } else {
    return response.json({ mensaje: 'Error al crear la publicación' });
  }
}
}
