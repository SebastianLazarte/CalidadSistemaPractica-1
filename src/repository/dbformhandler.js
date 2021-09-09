const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "",//use your pass my friend
  database: "volunteer_database",
  host: "localhost",
  port: 5432
});

module.exports = pool;
class DbHandler
{
    constructor(){
      this.cursor = null;
    } 
    async getData(data){
      const { id } = data.params;
      const volunteer = await pool.query(
        "SELECT * FROM usuarios WHERE id_autenticacion = $1", [id]);
      return volunteer;
    }
   async putdata(data){
      const { fecha_de_nacimiento, nivel_de_estudios, carrera, intereses_generales, ciudad_de_recidencia, pais_de_recidencia, descripcion_personal,id_autenticacion } = data;
      const newVolunteer = await pool.query(
        "INSERT INTO usuarios (fecha_de_nacimiento, nivel_de_estudios, carrera, intereses_generales, ciudad_de_recidencia, pais_de_recidencia, descripcion_personal, id_autenticacion) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [fecha_de_nacimiento, nivel_de_estudios, carrera, intereses_generales, ciudad_de_recidencia, pais_de_recidencia, descripcion_personal,id_autenticacion]
    );
    return newVolunteer;
    }
    async update_volunteer(id,data){
      console.log(id) 
      const { fecha_de_nacimiento, nivel_de_estudios, carrera, intereses_generales, ciudad_de_recidencia, pais_de_recidencia, descripcion_personal,id_autenticacion } = data;
      const update_volunteer = await pool.query(
        "UPDATE usuarios SET fecha_de_nacimiento=$1, nivel_de_estudios=$2,carrera=$3,intereses_generales=$4,ciudad_de_recidencia=$5,pais_de_recidencia=$6,descripcion_personal=$7,id_autenticacion=$8 WHERE id_usuario = $9",
        [fecha_de_nacimiento, nivel_de_estudios, carrera, intereses_generales, ciudad_de_recidencia, pais_de_recidencia, descripcion_personal, id_autenticacion,id]);
      return update_volunteer
      }

}


module.exports = DbHandler