const Pool = require("pg").Pool;

const pool = new Pool({
  user: "hsazteibnsnquc",
  password: "96c44f19b6a31a67521c2fa65c9233544ed1d7d5388367c6d9ff4c22c940a340", //use your pass my friend
  database: "d5mjf648gc2p7f",
  host: "ec2-54-156-24-159.compute-1.amazonaws.com",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
class DbHandler {
  constructor() {
    this.cursor = null;
  }
  
  async getData(id) {
    //const { id } = data.params;
    const volunteer = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = $1",
      [id]
    );
    return volunteer;
  }

  async putdata(data) {
    const {
      nombre,
      apellido,
      telefono,
      rol,
      estado_de_cuenta,
      id_autenticacion
    } = data;
    const newVolunteer = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, telefono, rol, estado_de_cuenta, id_autenticacion) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [
        nombre,
        apellido,
        telefono,
        rol,
        estado_de_cuenta,
        id_autenticacion
      ]
    );
    return newVolunteer;
  }

  async update_volunteer(id, data) {

    const {
      nombre,
      apellido,
      fecha_de_nacimiento,
      pais_de_recidencia,
      ciudad_de_recidencia,
      carrera,
      nivel_de_estudios,
      descripcion_personal,
      telefono,
      estado_de_cuenta,
      genero,
      rol,
      id_autenticacion
    } = data;
    
    const update_volunteer = await pool.query(
      "UPDATE usuarios SET nombre=$1, apellido=$2, fecha_de_nacimiento=$3, pais_de_recidencia=$4, ciudad_de_recidencia=$5, carrera=$6, nivel_de_estudios=$7, descripcion_personal=$8, telefono=$9, genero=$10, estado_de_cuenta=$11, rol=$12 ,id_autenticacion=$13  WHERE id_usuario=$14 RETURNING *" ,
      [
        nombre,
        apellido,
        fecha_de_nacimiento,
        pais_de_recidencia,
        ciudad_de_recidencia,
        carrera,
        nivel_de_estudios,
        descripcion_personal,
        telefono,
        genero,
        estado_de_cuenta,
        rol,
        id_autenticacion,
        id,
      ]
    );
    return update_volunteer;
  }
}

module.exports = DbHandler;
