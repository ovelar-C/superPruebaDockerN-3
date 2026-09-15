const pool= require('../config/db');

const crearUsuario = async (username,email, passwordHash) =>{
    const query = `
    INSERT INTO usuarios 
    (username, email, password) 
    VALUES ($1,$2,$3) RETURNING *`;
    const resultado = await pool.query(query,[username,email, passwordHash]);
    return resultado;
};

const buscarEmail = async (email) =>{
    const query = `
    SELECT * 
    FROM usuarios 
    WHERE email =$1`;
    const usuario = await pool.query(query,[email]);
    console.log(usuario);
    //devolvemos el usuario fila 0
    return usuario.rows[0];
}
const buscarID = async(id)=>{
    const query = `
    SELECT *
    FROM usuarios
    WHERE id =$1`;
    const usuario = await pool.query(query,[id]);
    return usuario.rows[0];
}
const crearPost = async(titulo,contenido,autor_id) =>{
    const query = `
    INSERT INTO publicaciones
    (titulo, contenido, autor_id)
    VALUES ($1, $2, $3) RETURNING *`;
    return await pool.query(query,[titulo,contenido,autor_id]);
}
const getPostById = async(id) =>{
    const query = `
    SELECT * 
    FROM publicaciones
    WHERE id = $1`;
    const resultado = await pool.query(query,[id]);
    return resultado.rows[0];
}
const obtenerPost = async(search, limit, offset)=>{
    const query = `
    SELECT * 
    FROM publicaciones
    WHERE titulo ILIKE '%' || $1 || '%'
    LIMIT $2
    OFFSET $3
    `;
    const resultado = await pool.query(query,[search || '',limit,offset]);
    return resultado.rows;
}

module.exports = {
    crearUsuario,
    buscarEmail,
    buscarID,
    crearPost,
    getPostById,
    obtenerPost
};