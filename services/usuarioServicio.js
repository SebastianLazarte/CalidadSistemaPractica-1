const DbUsuarioRepositorio = require("../config/dbUsuarioRepositorio.js");
class usuarioServicio {
  constructor() {
    this.repository = new DbUsuarioRepositorio();
  }

  async get_volunteer_data(id) {
    return await this.repository.GetUsuario(id);
  }
  async get_volunteers_data() {
    return await this.repository.GetUsuarios();
  }
  async register_changes(data) {
    try {
      data.rol = "voluntario";
      data.estado_de_cuenta = "activa";
      return await this.repository.CreateUsuario(data);
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }

  async do_changes(id, data) {
    try {
      return await this.repository.UpdateUsuario(id, data);
    } catch (error) {
      return false;
    }
  }

}
module.exports = usuarioServicio;
