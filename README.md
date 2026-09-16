API de Usuarios y Publicaciones

API REST para la gestión de usuarios y publicaciones.

Base URL: http://localhost:3000/api/usuarios

Usuarios
Registrar usuario

POST /registro

Registra un nuevo usuario.

Body
{
  "username": "string",
  "email": "string",
  "password": "string"
}


La contraseña debe cumplir con los siguientes requisitos:

Mínimo 8 caracteres.

Al menos un número.

Al menos una letra mayúscula.

Iniciar sesión

POST /login

Autentica un usuario y genera un token de acceso.

Body
{
  "email": "string",
  "password": "string"
}

Obtener perfil

GET /perfil

Obtiene los datos del usuario autenticado.

Response
{
  "id": 1,
  "username": "string",
  "email": "string"
}

Publicaciones
Crear publicación

POST /publicacion

Crea una nueva publicación asociada al usuario autenticado.

Body
{
  "titulo": "string",
  "contenido": "string"
}

Obtener todas las publicaciones

GET /publicaciones

Obtiene todas las publicaciones disponibles.

Obtener una publicación

GET /publicaciones/:id

Obtiene una publicación específica mediante su ID.

Parámetros:

id: identificador de la publicación.

Eliminar publicación

DELETE /publicacion/:id

Elimina una publicación mediante su ID.

Parámetros:

id: identificador de la publicación.

Resumen de endpoints
Método	Endpoint	Descripción
POST	/registro	Registrar usuario
POST	/login	Iniciar sesión y generar token
GET	/perfil	Obtener perfil del usuario autenticado
POST	/publicacion	Crear publicación
GET	/publicaciones	Obtener todas las publicaciones
GET	/publicaciones/:id	Obtener una publicación por ID
DELETE	/publicacion/:id	Eliminar una publicación por ID