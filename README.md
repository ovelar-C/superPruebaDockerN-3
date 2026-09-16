readme básico pero directo
api de usuarios y publicaciones

# • api/usuarios/

registrar usuario
post|localhost:3000/api/usuarios/registro
{
    "username" : "noobMaster3000",
    "email" : "fulano@gmail.com",
    "password" : "8caracteresAa"
}
el password solo es válido mínimo si tiene 8 caracteres, un número y una mayusculas


iniciar sesion | generación de token
post|localhost:3000/api/usuarios/login
{
    "email" : "fulano@gmail.com",
    "password" : "8caracteresAa"
}

datos del usuario
get|localhost:3000/api/usuarios/perfil
{
    "id": 1,
    "username" : "noobMaster3000",
    "email" : "fulano@gmail.com"
}

publicar publicacion
post|localhost:3000/api/usuarios/publicacion
{
    "titulo" : "Como hablar del Comunismo a mi Mascota",
    "contenido" : "1° paso : tener mascota"
}

mostrar todas las publicaciones de todos los usuarios
get|localhost:3000/api/usuarios/publicaciones

mostrar una publicacion en especifico por id
get|localhost:3000/api/usuarios/publicaciones/:id

borrar publicacion
delete|localhost:3000/api/usuarios/publicacion/:id







• get /perfil
• get /publicaciones
• get /publicaciones/:id

• post /registro
• post /login
• post /publicacion

• delete /publicacion/:id
