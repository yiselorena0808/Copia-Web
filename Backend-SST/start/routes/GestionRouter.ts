import Router from "@adonisjs/core/services/router";
import GestionController from "../../app/controller/GestionController.js";
const blog = new GestionController();

Router.post('/crearGestion', blog.crearGestion)
Router.get('/listarGestiones', blog.listarGestiones)