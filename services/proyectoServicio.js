const _repository = require("../config/dbProyectoRepositorio.js");

class ProyectoServicio {
  constructor() {
    this.repository = new _repository();
  }
  validar(data) {
    let nombre_proyecto = data["nombre_proyecto"];
    try {
      if (nombre_proyecto == "") {
        throw new Error("Por favor ingrese un nombre de proyecto");
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
    return true;
  }

  async get_proyectos(data) {
    return await this.repository.get_proyectos(data);
  }

  async get_proyecto(data) {
    return await this.repository.get_proyecto(data);
  }

  async create_proyecto(data) {
    try {
      if (this.validar(data)) {
        return await this.repository.create_proyecto(data);
      } else {
        throw console.error("Algo inesperado paso con el repositorio");
      }
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }

  async update_proyecto(id, data) {
    try {
      if (this.validar(data)) {
        return await this.repository.update_proyecto(id, data);
      } else {
        throw console.error("Algo inesperado paso con el repositorio");
      }
    } catch (error) {
      return error;
    }
  }
}
module.exports = ProyectoServicio;
