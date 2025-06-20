import Router from "@adonisjs/core/services/router";
import BlogController from "../../app/controller/BlogController.js";

const blog = new BlogController();

Router.get('/blog', blog.listarPublicaciones)
Router.post('/crearBlog', blog.crearPublicacion)

