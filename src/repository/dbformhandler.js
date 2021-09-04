class DbHandler
{
    constructor(){
      this.cursor = null;
    } 
    fetchdata () {
      return {
        "id": "c001",
        "name": "Hello Test",
        "ocupacion":"Yiga Tester"
     };
    }
   putdata(data){
        return true;
    }
}
module.exports = DbHandler