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
class DbEventoRepositorio {
  constructor() {
    this.cursor = null;
  }

  async get_eventos(data) {
    const eventos = await pool.query("SELECT * FROM public.eventos");
    return eventos;
  }
  async get_categorias(data) {
    const categorias = await pool.query("SELECT * FROM public.intereses");
    return categorias;
  }
  async get_participantes_eventos(id_evento) {
    const participantes_eventos = await pool.query(
      "SELECT  usuarios.nombre AS Nombre,usuarios.apellido AS Apellido, participantes_eventos.id_evento AS id_evento, participantes_eventos.id_participantes_eventos AS id, usuarios.rol AS rol FROM usuarios JOIN participantes_eventos ON usuarios.id_usuario=participantes_eventos.id_usuario WHERE participantes_eventos.id_evento = $1;",
      [id_evento]
    );
    return participantes_eventos;
  }
  async create_evento(data) {
    const {
      nombre_evento,
      descripcion_evento,
      modalidad_evento,
      lugar_evento,
      fecha_evento,
      proyecto,
      estado,
      categoria,
      hora_inicio,
      hora_fin,
      lider,
    } = data;
    const new_evento = await pool.query(
      "INSERT INTO public.eventos(nombre_evento,descripcion_evento,modalidad_evento,lugar_evento,fecha_evento,proyecto,estado,categoria,hora_inicio,hora_fin,lider) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        nombre_evento,
        descripcion_evento,
        modalidad_evento,
        lugar_evento,
        fecha_evento,
        proyecto,
        estado,
        categoria,
        hora_inicio,
        hora_fin,
        lider,
      ]
    );
    return new_evento;
  }

  async get_evento(data) {
    const { id } = data.params;
    const evento = await pool.query(
      "SELECT * FROM public.eventos WHERE id=$1",
      [id]
    );
    return evento;
  }

  async delete_evento(id) {
    const eliminar_evento = await pool.query(
      "DELETE FROM public.eventos WHERE id = $1",
      [id]
    );
    return eliminar_evento;
  }
  //Archivar evento
  async update_evento_estado1(data) {
    const actualizar_estado = await pool.query(
      "UPDATE public.eventos SET estado = 0  WHERE id = $1",
      [data]
    );
    return actualizar_estado;
  }
  //Mostrar Evento
  async update_evento_estado2(data) {
    const actualizar_estado = await pool.query(
      "UPDATE public.eventos SET estado = 1  WHERE id = $1",
      [data]
    );
    return actualizar_estado;
  }

  async participate_evento(id, id_autenticacion) {
    const participate_evento = await pool.query(
      "INSERT INTO participantes_eventos(id_usuario, id_evento)VALUES($1,$2)",
      [id_autenticacion, id]
    );
    return true;
  }

  //Obtener Id de eventos donde participa un usuario

  async get_eventos_usuario(id_usuario) {
    const eventos_usuario = await pool.query(
      "SELECT id_evento FROM participantes_eventos WHERE participantes_eventos.id_usuario = $1;",
      [id_usuario]
    );
    return eventos_usuario;
  }

  //Eliminar participacion de un evento
  async eliminar_participacion(idEvento, idUsuario) {
    const eliminar_participacion = await pool.query(
      "DELETE FROM participantes_eventos WHERE id_evento = $1 AND id_usuario = $2",
      [idEvento, idUsuario]
    );
    return eliminar_evento;
  }

  async get_lideres(data) {
    const lideres = await pool.query(
      "SELECT usuarios.rol AS rol, usuarios.nombre AS Nombre,usuarios.apellido AS Apellido FROM usuarios  WHERE usuarios.rol = 'lider'"
    );
    return lideres;
  }

  async get_my_eventos(id_autenticacion) {
    const existe_usuario = Boolean(
      (
        await pool.query(
          "SELECT EXISTS(select id_usuario from participantes_eventos where id_usuario=$1)",
          [id_autenticacion]
        )
      ).rows[0]["exists"]
    );
    if (existe_usuario) {
      const my_eventos = await pool.query(
        "select e.id, e.nombre_evento, e.descripcion_evento, e.lider, e.modalidad_evento, e.categoria, e.id_proyecto, e.proyecto, e.fecha_evento, e.hora_inicio, e.hora_fin  from eventos e where exists (select par.id_evento from participantes_eventos par where par.id_usuario=$1 and e.id=par.id_evento)",
        [id_autenticacion]
      );
      return my_eventos;
    }
    return existe_usuario;
  }

  async actualizar_evento(id, data) {
    console.log("Id Erick", id);
    console.log("Cuerpo", data);

    const {
      nombre_evento,
      descripcion_evento,
      modalidad_evento,
      lugar_evento,
      fecha_evento,
      proyecto,
      estado,
      categoria,
      hora_inicio,
      hora_fin,
      lider,
    } = data;
    const evento_a_actualizar = await pool.query(
      "UPDATE public.eventos SET nombre_evento=$2, descripcion_evento=$3, modalidad_evento= $4, lugar_evento=$5,fecha_evento=$6,proyecto=$7,estado=$8,categoria=$9,hora_inicio=$10, hora_fin=$11, lider=$12 WHERE id=$1",
      [
        id,
        nombre_evento,
        descripcion_evento,
        modalidad_evento,
        lugar_evento,
        fecha_evento,
        proyecto,
        estado,
        categoria,
        hora_inicio,
        hora_fin,
        lider,
      ]
    );
    const evento = await pool.query("SELECT * FROM eventos WHERE id=$1", [id]);

    return evento;
  }
}

module.exports = DbEventoRepositorio;
