const { pool } = require("../config/pool.config");
class DbUsuarioRepositorio {
  constructor() {
    this.cursor = null;
  }

  async GetUsuario(id_usuario) {
    const user = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = $1",
      [id_usuario]
    );

    user.rows[0].intereses = await this.GetInteresesByIdUsuario(id_usuario);
    user.rows[0].cualidades = await this.GetCualidadesByIdUsuario(id_usuario);
    user.rows[0].aptitudes_tecnicas = await this.GetAptitudesByIdUsuario(
      id_usuario
    );

    return user;
  }

  async GetUsuarios() {
    const users = await pool.query(
      "SELECT  nombre, apellido, fecha_de_nacimiento, pais_de_recidencia, ciudad_de_recidencia, carrera, ocupacion, telefono, genero, rol, estado_de_cuenta, estado_de_disponibilidad, foto_url, id_usuario, nombre_contacto_de_emergencia, numero_contacto_de_emergencia, relacion_contacto_de_emergencia FROM usuarios ORDER BY apellido"
    );
    return users;
  }

  async CreateUsuario(data) {
    const {
      nombre,
      apellido,
      telefono,
      rol,
      estado_de_cuenta,
      estado_de_disponibilidad,
      foto_url,
      id_autenticacion,
    } = data;
    const newUser = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, telefono, rol, estado_de_cuenta, estado_de_disponibilidad, foto_url, id_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        nombre,
        apellido,
        telefono,
        rol,
        estado_de_cuenta,
        estado_de_disponibilidad,
        foto_url,
        id_autenticacion,
      ]
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
      ocupacion,
      intereses,
      cualidades,
      descripcion_personal,
      telefono,
      estado_de_cuenta,
      genero,
      nombre_contacto_de_emergencia,
      numero_contacto_de_emergencia,
      relacion_contacto_de_emergencia,
      estado_de_disponibilidad,
      foto_url,
      rol,
      aptitudes_tecnicas,
    } = data;

    const intereses_lista = intereses.split(",");
    const cualidades_lista = cualidades.split(",");
    const aptitudes_lista = aptitudes_tecnicas.split(",");

    const update_user = await pool.query(
      "UPDATE usuarios SET nombre=$1, apellido=$2, fecha_de_nacimiento=$3, pais_de_recidencia=$4, ciudad_de_recidencia=$5, carrera=$6, ocupacion=$7, descripcion_personal=$8, telefono=$9, genero=$10, estado_de_cuenta=$11, nombre_contacto_de_emergencia=$12, numero_contacto_de_emergencia=$13, relacion_contacto_de_emergencia=$14, estado_de_disponibilidad=$15, foto_url=$16, rol=$17 WHERE id_usuario=$18 RETURNING *",
      [
        nombre,
        apellido,
        fecha_de_nacimiento,
        pais_de_recidencia,
        ciudad_de_recidencia,
        carrera,
        ocupacion,
        descripcion_personal,
        telefono,
        genero,
        estado_de_cuenta,
        nombre_contacto_de_emergencia,
        numero_contacto_de_emergencia,
        relacion_contacto_de_emergencia,
        estado_de_disponibilidad,
        foto_url,
        rol,
        id_usuario,
      ]
    );

    update_user.rows[0].intereses = await this.UpdateIntereses(
      id_usuario,
      intereses_lista
    );
    update_user.rows[0].cualidades = await this.UpdateCualidades(
      id_usuario,
      cualidades_lista
    );

    update_user.rows[0].aptitudes_tecnicas = await this.UpdateAptitudes(
      id_usuario,
      aptitudes_lista
    );
    return update_user;
  }

  async UpdateInsignias(id_user, insignias_nuevas) {
    const insignias_lista = insignias_nuevas.split(",");
    await pool.query(
      "DELETE FROM insignias_de_usuarios WHERE id_usuario = $1",
      [id_user]
    );

    var seSQL =
      "SELECT id_insignia FROM insignias WHERE insignia = '" +
      insignias_lista[0] +
      "'";
    for (let i = 1; i < insignias_lista.length; i++) {
      seSQL = seSQL + " OR insignia = '" + insignias_lista[i] + "'";
    }
    seSQL = seSQL + ";";

    const idsInsignias = await pool.query(seSQL);

    var seSQL2 = "";
    if (idsInsignias.rows.length === 0) {
      insignias_lista = [];
    } else {
      idsInsignias.rows.forEach((element) => {
        seSQL2 =
          seSQL2 +
          "INSERT INTO insignias_de_usuarios (id_usuario, id_insignia) VALUES(" +
          id_user +
          "," +
          element.id_insignia +
          ");";
      });
    }

    await pool.query(seSQL2);

    return insignias_lista;
  }

  async UpdateCualidades(id_user, cualidades_nuevas) {
    await pool.query(
      "DELETE FROM cualidades_de_usuarios WHERE id_usuario = $1",
      [id_user]
    );

    var seSQL =
      "SELECT id_cualidad FROM cualidades WHERE cualidad = '" +
      cualidades_nuevas[0] +
      "'";
    for (let i = 1; i < cualidades_nuevas.length; i++) {
      seSQL = seSQL + " OR cualidad = '" + cualidades_nuevas[i] + "'";
    }

    const idsCualidades = await pool.query(seSQL);

    var seSQL2 = "";
    if (idsCualidades.rows.length === 0) {
      cualidades_nuevas = [];
    } else {
      idsCualidades.rows.forEach((element) => {
        seSQL2 =
          seSQL2 +
          "INSERT INTO cualidades_de_usuarios (id_usuario, id_cualidad) VALUES(" +
          id_user +
          "," +
          element.id_cualidad +
          ");";
      });
    }

    await pool.query(seSQL2);

    return cualidades_nuevas;
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
  async UpdateAptitudes(id_user, aptitudes_nuevos) {
    await pool.query(
      "DELETE FROM aptitudes_de_usuarios WHERE id_usuario = $1",
      [id_user]
    );

    var seSQL =
      "SELECT id_aptitud  FROM aptitudes_tecnicas WHERE aptitud_tecnica  = '" +
      aptitudes_nuevos[0] +
      "'";
    for (let i = 1; i < aptitudes_nuevos.length; i++) {
      seSQL = seSQL + " OR aptitud_tecnica  = '" + aptitudes_nuevos[i] + "'";
    }

    const idsAptitudes = await pool.query(seSQL);

    var seSQL2 = "";
    if (idsAptitudes.rows.length == 0) {
      aptitudes_nuevos = [];
    } else {
      idsAptitudes.rows.forEach((element) => {
        seSQL2 =
          seSQL2 +
          "INSERT INTO aptitudes_de_usuarios (id_usuario, id_aptitud) VALUES(" +
          id_user +
          "," +
          element.id_aptitud +
          ");";
      });
    }

    await pool.query(seSQL2);

    return aptitudes_nuevos;
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

  async GetCualidadesByIdUsuario(id_usuario) {
    var cualidades = [];
    const cualidades_usuario = await pool.query(
      "SELECT cualidad FROM cualidades I JOIN cualidades_de_usuarios D ON I.id_cualidad=D.id_cualidad WHERE id_usuario = $1",
      [id_usuario]
    );

    cualidades_usuario.rows.forEach((element) => {
      cualidades.push(element.cualidad);
    });
    return cualidades;
  }

  async GetAptitudesByIdUsuario(id_usuario) {
    var aptitudes_tecnicas = [];
    const aptitudes_usuario = await pool.query(
      "SELECT aptitud_tecnica FROM aptitudes_tecnicas I JOIN aptitudes_de_usuarios D ON I.id_aptitud=D.id_aptitud WHERE id_usuario = $1",
      [id_usuario]
    );

    aptitudes_usuario.rows.forEach((element) => {
      aptitudes_tecnicas.push(element.aptitud_tecnica);
    });
    return aptitudes_tecnicas;
  }

  async GetInsigniasByIdUsuario(id_usuario) {
    var insignias = [];
    const insignias_usuario = await pool.query(
      "SELECT insignia FROM insignias I JOIN insignias_de_usuarios D ON I.id_insignia=D.id_insignia WHERE id_usuario = $1",
      [id_usuario]
    );
    insignias_usuario.rows.forEach((element) => {
      insignias.push(element.insignia);
    });
    var res = {};
    res.insignias = insignias;
    return res;
  }

  async GetInsignias() {
    const insignias = await pool.query("SELECT insignia FROM insignias");
    return insignias;
  }

  async disableUser(id_user) {
    let user_to_disable = await pool.query(
      "UPDATE autenticaciones SET email='',password='' WHERE id_autenticacion = $1 RETURNING *",
      [id_user]
    );
    return user_to_disable.rowCount > 0;
  }
}

module.exports = DbUsuarioRepositorio;
