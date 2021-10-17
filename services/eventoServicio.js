const _repository = require("../config/dbEventoRepositorio.js");

class EventoServicio {
  constructor() {
    this.repository = new _repository();
  }
  validar(data) {
    let nombre_evento = data["nombre_evento"];
    try {
      if (nombre_evento == "") {
        throw new Error("Por favor ingrese un nombre del evento");
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
    return true;
  }

  async get_eventos(data) {
    return await this.repository.get_eventos(data);
  }

  //Obtener eventos de participacion de un usuario
  async get_categorias(data) {
    return await this.repository.get_categorias(data);
  }
  
  async get_participantes_eventos(data) {
    return await this.repository.get_participantes_eventos(data);
  }

  //Eliminar participacion en un evento 
  async eliminar_participacion(idEvento,idUsuario) {
    try {
      return await this.repository.eliminar_participacion(idEvento,idUsuario);
    } catch (error) {
      console.error("Error al eliminar participacion");
      return error;
    }
  }

  async get_eventos_usuario(data) {
    return await this.repository.get_eventos_usuario(data);
  }

  async get_evento(data) {
    return await this.repository.get_evento(data);
  }

  async create_evento(data) {
    try {
      if (this.validar(data)) {
        return await this.repository.create_evento(data);
      } else {
        throw console.error("Algo inesperado paso con el repositorio");
      }
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }

  async delete_evento(data) {
    try {
      if (this.validar(data)) {
        return await this.repository.delete_evento(data);
      } else {
        throw console.error("Algo inesperado paso con el repositorio");
      }
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }
  // actualizar estado para archivar
  async update_evento_estado1(data) {
    try {
      if (this.validar(data)) {
        return await this.repository.update_evento_estado1(data);
      } else {
        throw console.error("Algo inesperado paso con el repositorio");
      }
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }
  //actualizar estado para mostrar
  async update_evento_estado2(data) {
    try {
      if (this.validar(data)) {
        return await this.repository.update_evento_estado2(data);
      } else {
        throw console.error("Algo inesperado paso con el repositorio");
      }
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }

  async participate_evento(id, id_autenticacion) {
    try {
      return await this.repository.participate_evento(id, id_autenticacion);
    } catch (error) {
      throw console.error("El " + id.toString() + " del evento no existe");
    }
  }

  //Obtener Lideres
  async get_lideres(data) {
    return await this.repository.get_lideres(data);
  }
}
module.exports = EventoServicio;
