import Router from "@adonisjs/core/services/router";
import ActividadesLudicasController from "../../app/controller/ActividadesKudicasController.js";

const actividadesLudicas = new ActividadesLudicasController();

Router.post('/crearLudica', actividadesLudicas.crearActividadLudica)