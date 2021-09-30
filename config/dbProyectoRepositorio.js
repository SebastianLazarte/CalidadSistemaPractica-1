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
    const { titulo, descripcion, objetivo, lider, numero_participantes } = data;
    let numero_participantes_oficial= numero_participantes
    if (numero_participantes_oficial==null)
    {
      numero_participantes_oficial=0
    }
    const new_proyeto = await pool.query(
      "INSERT INTO proyectos(titulo, descripcion, objetivo, lider, numero_participantes)VALUES ($1, $2, $3, $4, $5)",
      [titulo, descripcion, objetivo, lider, numero_participantes_oficial]
    );
    return new_proyeto;
  }
  async update_proyecto(id, data) {
    const { titulo, descripcion, objetivo, lider, numero_participantes } = data;
    const proyecto_a_actualizar = await pool.query(
      "UPDATE proyectos SET titulo=coalesce($2,titulo), descripcion=coalesce($3,descripcion), objetivo=coalesce($4,objetivo), lider=coalesce($5,lider), numero_participantes=coalesce($6,numero_participantes) WHERE id = $1",
      [id, titulo, descripcion, objetivo, lider, numero_participantes]
    );
    return data;
  }

  async participate_proyecto(id,id_autenticacion)
  {

    //si existe un usuario no tiene que aumentar
    const res1 = Boolean((await pool.query(
      "SELECT EXISTS(select id_usuario from usuarios where id_autenticacion=$1)",
      [id_autenticacion])).rows[0]['exists'] );
    console.log(res1);
    const res = Boolean((await pool.query(
      "SELECT NOT EXISTS( SELECT id_usuario FROM participantes_proyectos WHERE id_usuario=(select id_usuario from usuarios where id_autenticacion=$1) and id_proyecto=$2)",
      [id_autenticacion,id]) ).rows[0]['?column?']);
    if(res && res1){
      const participate_proyecto = await pool.query(
        "INSERT INTO participantes_proyectos(id_usuario, id_proyecto)VALUES((select id_usuario from usuarios where id_autenticacion=$1),$2)",
        [id_autenticacion,id]
      );
      debugger
      const incrementar_participantes = await pool.query(
        "UPDATE proyectos SET numero_participantes=numero_participantes+1 WHERE id=$1",
        [id]);
    }
    return res && res1;
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