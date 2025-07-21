import Router from "@adonisjs/core/services/router";
import ReportesController from "../../app/controller/ReportesController.js";

const reportes = new ReportesController();

Router.get('/listarReportes', reportes.listarReportes)
Router.put('/actualizarReporte/:id_reporte', reportes.actualizarEstado)
Router.delete('/eliminarReporte/:id_reporte', reportes.eliminar)