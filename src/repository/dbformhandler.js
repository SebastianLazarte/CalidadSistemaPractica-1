const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password",
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
   /* fetchdata () {
      return {
        "id": "c001",
        "name": "Hello Test",
        "ocupacion":"Yiga Tester"
     };
    }*/

   async putdata(data){
    
    const { birth_date, degree, career, general_interest, city, country, description } = data.body;
  
    const newVolunteer = await pool.query(
      "INSERT INTO volunteer_data (birth_date, degree, career, general_interest, city, country, description) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [birth_date, degree, career, general_interest, city, country, description]
  );
  return newVolunteer;
    }
}


module.exports = DbHandler