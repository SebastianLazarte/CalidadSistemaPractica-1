const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "admin",
  database: "eventos",
  host: "localhost",
  port: 5000,
});

module.exports = pool;
class DbEventoRepositorio {
  constructor() {
    this.cursor = null;
  }

  async get_eventos(data) {
    const proyectos = await pool.query("SELECT * FROM public.proyectos");
    return proyectos;
  }
  // async get_proyecto(data)
  // {
  //     const {id} =data.params
  //     const proyecto= await pool.query("SELECT * FROM public.proyectos WHERE id=$1",[id]);
  //     return proyecto
  // }
  async create_evento(data) {
    const {
      nombre_evento,
      descripcion_evento,
      modalidad_evento,
      lugar_evento,
      fecha_evento,
      proyecto,
    } = data;
    const new_evento = await pool.query(
      "INSERT INTO public.eventos(nombre_evento,descripcion_evento,modalidad_evento,lugar_evento,fecha_evento,proyecto)VALUES ($1, $2, $3, $4, $5, $6)",
      [
        nombre_evento,
        descripcion_evento,
        modalidad_evento,
        lugar_evento,
        fecha_evento,
        proyecto,
      ]
    );
    return new_evento;
  }

  // async update_proyecto(id,data)
  // {
  //     console.log(id)
  //     const {nombre_proyecto}=data
  //     const proyecto_a_actualizar = await pool.query("UPDATE public.proyectos a SET nro_participantes=nro_participantes+1 WHERE id = $1",
  //     [id])
  //     return proyecto_a_actualizar
  // }
}

module.exports = DbEventoRepositorio;
