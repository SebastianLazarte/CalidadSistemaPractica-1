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
  async get_categorias(data) {
    return await this.repository.get_categorias(data);
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
  async eliminar_participacion(idEvento, idUsuario) {
    try {
      return await this.repository.eliminar_participacion(idEvento, idUsuario);
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

  async actualizar_evento(data, id) {
    try {
      if (this.validar(data)) {
        return await this.repository.actualizar_evento(data, id);
      } else {
        throw console.error("Error al actualizar evento!");
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

  //Obtener participaciones en eventos de 1 voluntario
  async get_my_eventos(id_autenticacion){
    try{
      let list_of_participant = await this.repository.get_my_eventos(id_autenticacion);
      let sorted_list = list_of_participant.rows.sort((a, b) => {
        return new Date(a.fecha_evento) - new Date(b.fecha_evento);
      });
      sorted_list = sorted_list.sort((a, b) => {
        return a.hora_inicio - b.hora_inicio;
      });
      sorted_list = sorted_list.filter((event)=>{
        let today = new Date();
        return ! (new Date(event.fecha_evento) < today);
      })
      return sorted_list;
    }
    catch(error)
    {
      throw console.error("Algo inesperado paso con la Base de datos o el id del participante no existe");
    }
  }
}
module.exports = EventoServicio;
