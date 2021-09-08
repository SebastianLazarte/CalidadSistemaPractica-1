CREATE DATABASE volunteer_database;
 
CREATE TABLE autenticaciones
(id_autenticacion BIGSERIAL PRIMARY KEY NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(200) NOT NULL,
nombre_completo VARCHAR(70) NOT NULL);

CREATE TABLE usuarios
(id_usuario BIGSERIAL PRIMARY KEY NOT NULL,
fecha_de_nacimiento DATE,
pais_de_recidencia VARCHAR(50),
ciudad_de_recidencia VARCHAR(50),
intereses_generales VARCHAR(50),
carrera VARCHAR(50),
nivel_de_estudios VARCHAR(50),
descripcion_personal VARCHAR(300),
id_autenticacion BIGSERIAL,
 FOREIGN KEY(id_autenticacion) REFERENCES autenticaciones(id_autenticacion)
);
