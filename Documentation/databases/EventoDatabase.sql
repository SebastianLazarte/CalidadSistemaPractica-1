CREATE DATABASE evento_database;

CREATE TABLE evento_data(
    id_evento BIGSERIAL PRIMARY KEY,
    nombre_evento VARCHAR(400),
    descripcion_evento VARCHAR(400),
    modalidad_evento VARCHAR(400),
    lugar_evento VARCHAR(10),
    fecha_evento VARCHAR(50),
    proyecto VARCHAR(400),
    estado VARCHAR(400),
    categoria VARCHAR(400),
    hora_inicio VARCHAR(50),
    hora_fin VARCHAR(50),
    lider VARCHAR(400),
);