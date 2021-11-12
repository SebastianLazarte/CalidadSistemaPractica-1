CREATE TABLE intereses
(id_interes BIGSERIAL PRIMARY KEY NOT NULL,
interes VARCHAR(40) NOT NULL);

INSERT INTO intereses(interes) VALUES ('Medio ambiente'); 
INSERT INTO intereses(interes) VALUES ('Desarrollo sostenible');
INSERT INTO intereses(interes) VALUES ('Trabajo social');
INSERT INTO intereses(interes) VALUES ('Empoderamiento');
INSERT INTO intereses(interes) VALUES ('Perritos callejeros');
INSERT INTO intereses(interes) VALUES ('Educacion');
INSERT INTO intereses(interes) VALUES ('Otro');

CREATE TABLE autenticaciones
(id_autenticacion BIGSERIAL PRIMARY KEY NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(200) NOT NULL);

CREATE TABLE usuarios
(id_usuario BIGSERIAL PRIMARY KEY NOT NULL,
nombre VARCHAR(50),
apellido VARCHAR(50),
fecha_de_nacimiento DATE,
pais_de_recidencia VARCHAR(50),
ciudad_de_recidencia VARCHAR(50),
carrera VARCHAR(50),
nivel_de_estudios VARCHAR(50),
descripcion_personal VARCHAR(300),
telefono VARCHAR(50),
genero VARCHAR(30),
estado_de_cuenta VARCHAR DEFAULT 'activa' NOT NULL,
rol VARCHAR(30),
id_autenticacion BIGSERIAL,
 FOREIGN KEY(id_autenticacion) REFERENCES autenticaciones(id_autenticacion)
);

CREATE TABLE intereses_de_usuarios
(id_intereses_de_usuarios BIGSERIAL PRIMARY KEY NOT NULL,
id_usuario BIGSERIAL,
id_interes BIGSERIAL,
FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
FOREIGN KEY(id_interes) REFERENCES intereses(id_interes)
);
