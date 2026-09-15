
CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    rol VARCHAR(30) NOT NULL
);
INSERT INTO roles (rol)
VALUES ('user'),('admin');

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    date_created DATE DEFAULT CURRENT_DATE,
    id_rol INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT fk_user_rol
    FOREIGN KEY (id_rol)
    REFERENCES roles(id)
);

CREATE TABLE publicaciones(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR (250) NOT NULL,
    contenido TEXT NOT NULL,
    id_autor INTEGER NOT NULL,

    CONSTRAINT fk_user_autor
    FOREIGN KEY (id_autor)
    REFERENCES usuarios(id)
);

