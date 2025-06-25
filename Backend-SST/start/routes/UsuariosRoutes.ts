import Router from "@adonisjs/core/services/router";
import UsuariosController from "../../app/controller/UsuariosController.js";

const Usuarios = new UsuariosController();

Router.post('/registro', Usuarios.Registro)
Router.post('/login', Usuarios.Login)
Router.get('/login', Usuarios.listar)
Router.get('/usuarios', Usuarios.listar)        
Router.get('/usuarios/:id', Usuarios.obtener)    
Router.put('/usuarios/:id', Usuarios.actualizar)  
Router.delete('/usuarios/:id', Usuarios.eliminar)
