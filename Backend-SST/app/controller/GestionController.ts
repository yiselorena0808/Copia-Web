import pgDatabase from "../database/pgDatabase.js";

export default class GestionController{

    async listarGestiones({ request,response }) {
    const result = await pgDatabase.query(`SELECT * FROM gestion_epp`);
    return response.json({ data: result.rows }); 
}

    async  crearGestion({request, response }) {
    const {nombre,apellido,cedula,cargo,productos,cantidad,importancia } = request.body();
    const result = await pgDatabase.query(`INSERT INTO gestion_epp(nombre, apellido, cedula, cargo, productos, cantidad, importancia)
	VALUES ($1,$2,$3,$4,$5,$6,$7)`,[nombre,apellido,cedula,cargo,productos,cantidad,importancia]);
    console.log(result)
    if (result.rowCount > 0) {
    return response.json({ mensaje: 'Gestion creada con exito', data: result.rows[0] });
  } else {
    return response.json({ mensaje: 'Error al crear gestion' });
  }
 }
}