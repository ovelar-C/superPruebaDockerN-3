const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificar = require('../middlewares/verificarToken');

router.get('/perfil', verificar, usuarioController.perfil);
router.get('/publicaciones', usuarioController.listarPosts);
router.get('/publicaciones/:id', verificar, usuarioController.getPostByID);

router.post('/registro', usuarioController.registrar);
router.post('/login', usuarioController.login);
router.post('/publicacion', verificar, usuarioController.crearPost);

router.delete('/:id' ,  verificar ,usuarioController.deletePost);



module.exports = router;