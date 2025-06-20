import Router from "@adonisjs/core/services/router";
import ListaChequeoController from "../../app/controller/ListaChequeoController.js";

const ListaChequeo = new ListaChequeoController();

Router.get('/listas', ListaChequeo.listarListasChequeo)
