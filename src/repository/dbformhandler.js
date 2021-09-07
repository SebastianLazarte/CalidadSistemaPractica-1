const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "yigadrian",
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
        "SELECT * FROM volunteer_data WHERE volunteer_id = $1", [id]);
      return volunteer;
    }
   async putdata(data){
      const { birth_date, degree, career, general_interest, city, country, description } = data;
      const newVolunteer = await pool.query(
        "INSERT INTO volunteer_data (birth_date, degree, career, general_interest, city, country, description) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [birth_date, degree, career, general_interest, city, country, description]
    );
    return newVolunteer;
    }
    async update_volunteer(id,data){
      console.log(id)
      const { birth_date, degree, career, general_interest, city, country, description } = data;
      const update_volunteer = await pool.query(
        "UPDATE volunteer_data SET birth_date=$1, degree=$2,career=$3,general_interest=$4,city=$5,country=$6,description=$7 WHERE volunteer_id = $8",
        [birth_date, degree, career, general_interest, city, country, description, id]);
      return update_volunteer
      }

}


module.exports = DbHandler