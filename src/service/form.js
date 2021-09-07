const _repository = require('../repository/dbformhandler.js');
class FormService
{
    constructor(){
      this.repository= new _repository();
    } 
    async get_volunteer_data(data) {
      return await this.repository.getData(data)
    }
    async register_changes(data) {
        try {
          if (this.check_changes(data))
            return await this.repository.putdata(data);
          else
            throw console.error("Something is hapening with dbhandler");
        } catch (error) {
          console.error(error.message);
          return error
        }
    }
    async do_changes(id,data){
      try {
        if (this.check_changes(data))
          return await this.repository.update_volunteer(id,data);
        else
          throw console.error("Something is hapening with dbhandler");
      } catch (error) {
        return false;
      }
    }
    check_changes(data){
      let date_to_check = new Date(data["birth_date"]);
      let today = new Date();
      date_to_check=date_to_check.getFullYear()
      today=today.getFullYear()
      try {
        if (today-date_to_check<16){
          throw new Error("Sorry the volunteer must be a 16 years old minimum")
        }
      } catch (error) {
        console.error(error.message);
        return false
      }     
      return true
    }
}
module.exports = FormService