const _repository = require("../config/dbformhandler.js");
class FormService {
  constructor() {
    this.repository = new _repository();
  }

  async get_volunteer_data(id) {
    return await this.repository.GetUsuario(id);
  }

  async register_changes(data) {
    try {
      data.rol = "voluntario";
      data.estado_de_cuenta = "activa";
      if (this.check_changes(data)) return await this.repository.CreateUsuario(data);
      else throw console.error("Something is hapening with dbhandler");
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }

  async do_changes(id, data) {
    try {
      if (this.check_changes(data))
        return await this.repository.UpdateUsuario(id, data);
      else throw console.error("Something is hapening with dbhandler");
    } catch (error) {
      return false;
    }
  }
  
  check_changes(data) {
    let date_to_check = new Date(data["fecha_de_nacimiento"]);
    let today = new Date();
    date_to_check = date_to_check.getFullYear();
    today = today.getFullYear();
    try {
      if (today - date_to_check < 16) {
        throw new Error("Sorry the volunteer must be a 16 years old minimum");
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
    return true;
  }
}
module.exports = FormService;
