import pgDatabase from "../database/pgDatabase.js";

export default class ListaChequeoController{

  async  listarListasChequeo({ request, response }) {
     const result = await pgDatabase.query('SELECT * FROM listas_chequeo ORDER BY fecha DESC');
     return response.json({ mensaje: result.rows });
   }
} 