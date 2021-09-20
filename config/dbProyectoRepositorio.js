const Pool = require("pg").Pool

const pool = new Pool
({
    user: "postgres",
    password: "admin",
    database: "proyectos",
    host: "localhost",
    port: 5432 
})

module.exports= pool
class DbProyectoRepositorio {
  
  constructor() {
    this.cursor = null;
  } 

  async get_proyectos(data) {
    const proyectos = await pool.query("SELECT * FROM public.proyectos")
    return proyectos        
  }
  async get_proyecto(data) {
    const {id} =data.params
    const proyecto= await pool.query("SELECT * FROM public.proyectos WHERE id=$1",[id]);
    return proyecto
  }
  async create_proyecto(data) {
    const {nombre_proyecto,nro_participantes,descripcion}= data
    const new_proyeto = await pool.query("INSERT INTO public.proyectos(nombre_proyecto, nro_participantes, descripcion)VALUES ($1, $2, $3)",
    [nombre_proyecto,nro_participantes,descripcion]);
    return new_proyeto
  }
  async update_proyecto(id,data) {
    console.log(id)
    const {nombre_proyecto}=data
    const proyecto_a_actualizar = await pool.query("UPDATE public.proyectos a SET nro_participantes=nro_participantes+1 WHERE id = $1",
    [id])
    return proyecto_a_actualizar
  }

}

module.exports = DbProyectoRepositorio