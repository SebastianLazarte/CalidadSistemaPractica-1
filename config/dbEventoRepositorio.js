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
class DbEventoRepositorio {
  constructor() {
    this.cursor = null;
  }

  async get_eventos(data) {
    const eventos = await pool.query("SELECT * FROM public.eventos");
    return eventos;
  }

  async create_evento(data)
  {
      const {nombre_evento,descripcion_evento,modalidad_evento,lugar_evento,fecha_evento,proyecto,estado}= data
      const new_evento = await pool.query("INSERT INTO public.eventos(nombre_evento,descripcion_evento,modalidad_evento,lugar_evento,fecha_evento,proyecto,estado) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [nombre_evento,descripcion_evento,modalidad_evento,lugar_evento,fecha_evento,proyecto,estado]);
      return new_evento
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
    console.log(id)
    const eliminar_evento = await pool.query('DELETE FROM public.eventos WHERE id = $1', 
    [id]);
    return eliminar_evento;
  }
  //Archivar evento
  async update_evento_estado1(data){
    console.log(data.id);
      const actualizar_estado = await pool.query('UPDATE public.eventos SET estado = 0  WHERE id = $1', [data]);   
    return actualizar_estado;
  }
  //Mostrar Evento
  async update_evento_estado2(data){
    console.log(data.id);
      const actualizar_estado = await pool.query('UPDATE public.eventos SET estado = 1  WHERE id = $1', [data]);   
    return actualizar_estado;
  }

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
      "INSERT INTO public.eventos(nombre_evento,descripcion_evento,modalidad_evento,lugar_evento,fecha_evento,proyecto) VALUES ($1, $2, $3, $4, $5, $6)",
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
  async participate_evento(id, id_autenticacion) {
    const participate_evento = await pool.query(
      "INSERT INTO participantes_eventos(id_usuario, id_evento)VALUES((select id_usuario from usuarios where id_autenticacion=$1),$2)",
      [id_autenticacion, id]
    );
    // debugger;
    // const incrementar_participantes = await pool.query(
    //   "UPDATE proyectos SET numero_participantes=numero_participantes+1 WHERE id=$1",
    //   [id]
    // );
    return true;
  }
}

module.exports = DbEventoRepositorio;
