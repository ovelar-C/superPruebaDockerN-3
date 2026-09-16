const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const registro = require('../services/registro');
require('dotenv').config();

const registrar = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!(registro.validar(password))) {
            return res.status(400).json({
                error: "contraseña debil"
            });
        }
        const passHash = await registro.hashear(password);

        await usuarioModel.crearUsuario(username, email, passHash);
         return res.status(201).json({
            mensaje: 'usuario registrado'
        });

    } catch (error) {
        console.error('[ERROR]:', error);
        return res.status(500).json({
            error: 'Error en dervidor'
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //buscar usuaurio
        const usuario = await usuarioModel.buscarEmail(email);
        if (!usuario) {
            return res.status(401).json({
                error: 'credenciales invalidas'
            });
        }
        //comparar pass
        if (!await registro.comparar(password, usuario.password)) {
            return res.status(401).json({
                error: "credenciales invalidas"
            });
        }
        //jwt
        //no pass en el payload(IMPORTANTE MEGA SUPER)
        const payload = {
            id: usuario.id,
            rol: usuario.rol
        }
        //firmar token 
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        return res.status(200).json({ 
            toke : token,
            usuario : usuario
         });

    } catch (error) {
        return res.status(500).json({
            error: "Error del servidor"
        });
    }
}

const perfil = async (req, res) => {
    try {
        const id = req.usuario.id;
        const usuario = await usuarioModel.buscarID(id);

        if (!usuario) {
            return res.status(404).json({
                error: 'usuario no encontrado'
            });
        }

        return res.status(200).json({
            id: usuario.id,
            username: usuario.username,
            email: usuario.email,
            rol: usuario.id_rol
        });

    } catch (error) {
        console.log('errror', error);
        return res.status(500).json({
            error: 'error de servidor'
        });
    };
}

const crearPost = async (req, res) => {
    try {
        const { titulo, contenido } = req.body;
        const autor_id = req.usuario.id;

        await usuarioModel.crearPost(titulo, contenido, autor_id);
        return res.status(201).json({
            mensaje: "publicacion publicada"
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "error server"
        });
    }
}
const getPostByID = async (req, res) => {
    try {
        const post = await usuarioModel.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({
                error: "Post no encontrado"
            });
        }
        if (post.autor_id !== req.usuario.id) {
            return res.status(403).json({
                error: "Forbidden: No eres el dueño"
            });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            mensaje: "error del servidor"
        });
    }
}

//solo el admin
const listarPosts = async (req,res) =>{
    try {
        //paginacion
        const {search, page = 1, limit = 10} = req.query;
        //offset
        const offeset = (page - 1) * Number(limit);
        const publicaciones = await usuarioModel.obtenerPost(
            search,
            Number(limit),
            offeset
        );
        if(publicaciones.length === 0){
            res.status(404).json({
                mensjae: "eeror no posts"
            });
        }
        return res.status(200).json(publicaciones);

    } catch (error) {
        return res.status(500).json({
            mensaje: "error del servidor"
        });
    }
} 

const deletePost = async (req,res) =>{
    try {
        const post = await usuarioModel.getPostById(req.params.id);
        if(post.id_autor !== req.usuario.id){
            return res.status(403).json({
                error: "Forbidden: no eres el dueño"
            })
        }

        const publicacion = usuarioModel.deletePost(post.autor_id);
        if(!publicacion){
            return res.status(400).json({
                error : "error al eliminar post"
            });
        }
        return res.status(200).json({
            mensaje: "post eliminado",
            post : publicacion
        })


    } catch (error) {
        return res.status(500).json({
            error : "error del servidor"
        })
    }
}

module.exports = {
    registrar,
    login,
    perfil,
    crearPost,
    getPostByID,
    listarPosts,
    deletePost

};