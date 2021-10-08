const Pool = require("pg").Pool;

const pool = new Pool({
  user: "hgpmlfhmjxvnfr",
  password: "e3fcf341e4ff4a68075b951e1c9a75239afaa42d7eccc3e9c7db81bda6c77a05", //use your pass my friend
  database: "d966qfatdj765h",
  host: "ec2-54-173-138-144.compute-1.amazonaws.com",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
class DbUsuarioRepositorio {
  constructor() {
    this.cursor = null;
  }

  async GetUsuario(id_usuario) {
    const user = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = $1",
      [id_usuario]
    );

    user.rows[0].intereses = await this.GetInteresesByIdUsuario(
      id_usuario
    );

    return user;
  }

  async GetUsuarios() {
    const users = await pool.query(
      "SELECT nombre,apellido,telefono,rol,ciudad_de_recidencia FROM usuarios ORDER BY apellido"
    )
    return users;
  }

  async CreateUsuario(data) {
    const {
      nombre,
      apellido,
      telefono,
      rol,
      estado_de_cuenta,
      id_autenticacion,
    } = data;

    const newUser = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, telefono, rol, estado_de_cuenta, id_usuario) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [nombre, apellido, telefono, rol, estado_de_cuenta, id_autenticacion]
    );
    return newUser;
  }

  async UpdateUsuario(id_usuario, data) {
    const {
      nombre,
      apellido,
      fecha_de_nacimiento,
      pais_de_recidencia,
      ciudad_de_recidencia,
      carrera,
      nivel_de_estudios,
      intereses,
      descripcion_personal,
      telefono,
      estado_de_cuenta,
      genero,
      
    } = data;

    const intereses_lista = intereses.split(",");

    const update_user = await pool.query(
      "UPDATE usuarios SET nombre=$1, apellido=$2, fecha_de_nacimiento=$3, pais_de_recidencia=$4, ciudad_de_recidencia=$5, carrera=$6, nivel_de_estudios=$7, descripcion_personal=$8, telefono=$9, genero=$10, estado_de_cuenta=$11  WHERE id_usuario=$12 RETURNING *",
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
        id_usuario
      ]
    );

    update_user.rows[0].intereses = await this.UpdateIntereses(
      id_usuario,
      intereses_lista
    );

    return update_user;
  }

  async UpdateIntereses(id_user, intereses_nuevos) {
    await pool.query(
      "DELETE FROM intereses_de_usuarios WHERE id_usuario = $1",
      [id_user]
    );

    var seSQL =
      "SELECT id_interes FROM intereses WHERE interes = '" +
      intereses_nuevos[0] +
      "'";
    for (let i = 1; i < intereses_nuevos.length; i++) {
      seSQL = seSQL + " OR interes = '" + intereses_nuevos[i] + "'";
    }

    const idsIntereses = await pool.query(seSQL);

    var seSQL2 = "";
    if (idsIntereses.rows.length == 0) {
      intereses_nuevos = [];
    } else {
      idsIntereses.rows.forEach((element) => {
        seSQL2 =
          seSQL2 +
          "INSERT INTO intereses_de_usuarios (id_usuario, id_interes) VALUES(" +
          id_user +
          "," +
          element.id_interes +
          ");";
      });
    }

    await pool.query(seSQL2);

    return intereses_nuevos;
  }

  async GetInteresesByIdUsuario(id_usuario) {
    var intereses = [];
    const intereses_usuario = await pool.query(
      "SELECT interes FROM intereses I JOIN intereses_de_usuarios D ON I.id_interes=D.id_interes WHERE id_usuario = $1",
      [id_usuario]
    );

    intereses_usuario.rows.forEach((element) => {
      intereses.push(element.interes);
    });
    return intereses;
  }
}

module.exports = DbUsuarioRepositorio;
