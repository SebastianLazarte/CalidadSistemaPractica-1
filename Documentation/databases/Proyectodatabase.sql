CREATE DATABASE proyecto_database;

CREATE TABLE proyectos(
    id_proyecto BIGSERIAL PRIMARY KEY,
    nombre_proyecto VARCHAR(400),
    nro_participantes INTEGER
);