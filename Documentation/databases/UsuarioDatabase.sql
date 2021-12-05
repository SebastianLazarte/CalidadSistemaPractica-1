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
tipo VARCHAR(50),
idGoogle VARCHAR(50),
validado boolean DEFAULT true,
password VARCHAR(200) NOT NULL);

CREATE TABLE usuarios
(id_usuario BIGSERIAL NOT NULL,
nombre VARCHAR(50),
apellido VARCHAR(50),
fecha_de_nacimiento DATE,
pais_de_recidencia VARCHAR(50),
ciudad_de_recidencia VARCHAR(50),
carrera VARCHAR(50),
ocupacion VARCHAR(50),
descripcion_personal VARCHAR(300),
telefono VARCHAR(50),
genero VARCHAR(30),
estado_de_disponibilidad VARCHAR(50),
estado_de_cuenta VARCHAR DEFAULT 'activa' NOT NULL,
nombre_contacto_de_emergencia VARCHAR(50),
numero_contacto_de_emergencia VARCHAR(50),
relacion_contacto_de_emergencia VARCHAR(50),
rol VARCHAR(30),
foto_url VARCHAR(30),
horas_participadas_eventos INTERGER,
FOREIGN KEY(id_usuario) REFERENCES autenticaciones(id_autenticacion),
PRIMARY KEY(id_usuario)
);

CREATE TABLE intereses_de_usuarios
(
id_usuario BIGSERIAL,
id_interes BIGSERIAL,
FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
FOREIGN KEY(id_interes) REFERENCES intereses(id_interes),
PRIMARY KEY(id_usuario, id_interes)
);

CREATE TABLE aptitudes_tecnicas
(id_aptitud BIGSERIAL PRIMARY KEY NOT NULL,
aptitud_tecnica VARCHAR(40) NOT NULL);

INSERT INTO aptitudes_tecnicas(aptitud_tecnica) VALUES ('Excel'); 
INSERT INTO aptitudes_tecnicas(aptitud_tecnica) VALUES ('Illustrator');
INSERT INTO aptitudes_tecnicas(aptitud_tecnica) VALUES ('WordPress');
INSERT INTO aptitudes_tecnicas(aptitud_tecnica) VALUES ('PowerPoint');
INSERT INTO aptitudes_tecnicas(aptitud_tecnica) VALUES ('Canva');
INSERT INTO aptitudes_tecnicas(aptitud_tecnica) VALUES ('Adobe Premiere');
INSERT INTO aptitudes_tecnicas(aptitud_tecnica) VALUES ('Otro');


CREATE TABLE aptitudes_de_usuarios
(
id_usuario BIGSERIAL,
id_aptitud BIGSERIAL,
FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
FOREIGN KEY(id_aptitud) REFERENCES aptitudes_tecnicas(id_aptitud),
PRIMARY KEY(id_usuario, id_aptitud)
);


CREATE TABLE cualidades
(id_cualidad BIGSERIAL PRIMARY KEY NOT NULL,
cualidad VARCHAR(40) NOT NULL);

INSERT INTO cualidades(cualidad) VALUES ('Liderazgo'); 
INSERT INTO cualidades(cualidad) VALUES ('Organizacion'); 
INSERT INTO cualidades(cualidad) VALUES ('Aprendizaje rapido'); 
INSERT INTO cualidades(cualidad) VALUES ('Trabajo en equipo'); 
INSERT INTO cualidades(cualidad) VALUES ('Creatividad'); 
INSERT INTO cualidades(cualidad) VALUES ('Paciencia'); 
INSERT INTO cualidades(cualidad) VALUES ('Otro');


CREATE TABLE cualidades_de_usuarios
(
id_usuario BIGSERIAL,
id_cualidad BIGSERIAL,
FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
FOREIGN KEY(id_cualidad) REFERENCES cualidades(id_cualidad),
PRIMARY KEY(id_usuario, id_cualidad)
);


CREATE TABLE insignias
(id_insignia BIGSERIAL PRIMARY KEY NOT NULL,
insignia VARCHAR(40) NOT NULL);

INSERT INTO insignias(insignia) VALUES ('Trabajo en Equipo');
INSERT INTO insignias(insignia) VALUES ('Compromiso');
INSERT INTO insignias(insignia) VALUES ('Creatividad');
INSERT INTO insignias(insignia) VALUES ('Proactividad');
INSERT INTO insignias(insignia) VALUES ('Primer Volunatariado');
INSERT INTO insignias(insignia) VALUES ('Socialidad');
