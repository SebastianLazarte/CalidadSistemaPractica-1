const _repository = require('../repository/dbformhandler.js');
class FormService
{
    constructor(){
      this.repository= new _repository();
    } 
    async register_changes(data) {
      if (this.check_changes(data))
        return await this.repository.putdata(data);
    }
    check_changes(data){
      return true
      if (data["birth_date"]){

      }
      if (data["degree"]){

      }
      if (data["general_interest"]){

      }
      if (data["city"]){

      }
      if (data["description"]){

      }
    }
}
module.exports = FormService