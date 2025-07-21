import Router from "@adonisjs/core/services/router";
import GestionController from "../../app/controller/GestionController.js";

const gestion = new GestionController();

Router.post('/crearGestion', gestion.crearGestion);
Router.get('/listaGestiones', gestion.listarGestiones);
Router.put('/actualizarGestion/:id', gestion.actualizarEstado);
Router.delete('/eliminarGestion/:id', gestion.eliminar);
