const Pool = require("pg").Pool

const pool = new Pool
({
    user: "postgres",
    password: "admin",
    database: "postgres",
    host: "localhost",
    port: 5432
})

module.exports= pool
class DbEventoRepositorio
{
    
    constructor()
    {
        this.cursor = null;
    } 

    async create_evento(data)
    {
        const {nombre_evento,descripcion_evento,modalidad_evento,lugar_evento,fecha_evento,proyecto}= data
        const new_evento = await pool.query("INSERT INTO public.eventos(nombre_evento,descripcion_evento,modalidad_evento,lugar_evento,fecha_evento,proyecto) VALUES ($1, $2, $3, $4, $5, $6)",
        [nombre_evento,descripcion_evento,modalidad_evento,lugar_evento,fecha_evento,proyecto]);
        return new_evento
    }

}

module.exports = DbEventoRepositorio