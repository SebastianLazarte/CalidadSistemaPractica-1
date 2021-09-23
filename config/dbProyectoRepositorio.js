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
class DbProyectoRepositorio {
  constructor() {
    this.cursor = null;
  }

  async get_proyectos(data) {
    const proyectos = await pool.query("SELECT * FROM proyectos");
    return proyectos;
  }
  async get_proyecto(data) {
    const { id } = data.params;
    const proyecto = await pool.query("SELECT * FROM proyectos WHERE id=$1", [
      id,
    ]);
    return proyecto;
  }
  async create_proyecto(data) {
    const { titulo, descripcion, objetivos, lider } = data;
    const new_proyeto = await pool.query(
      "INSERT INTO proyectos(titulo, descripcion, objetivos, lider)VALUES ($1, $2, $3, $4)",
      [titulo, descripcion, objetivos, lider]
    );
    return new_proyeto;
  }
  async update_proyecto(id, data) {
    console.log(id);
    const { titulo, descripcion, objetivos, lider } = data;
    const proyecto_a_actualizar = await pool.query(
      "UPDATE proyectos SET titulo=$2, descripcion=$3, objetivos=$4, lider=$5 WHERE id = $1",
      [id, titulo, descripcion, objetivos, lider]
    );
    return data;
  }

  async delete_proyecto(id) {
    const proyecto_a_eliminar = await pool.query(
      "DELETE FROM proyectos WHERE id = $1",
      [id]
    );
    return proyecto_a_eliminar;
  }
}

module.exports = DbProyectoRepositorio;
