const _repository = require("../config/dbProyectoRepositorio.js");

class ProyectoServicio {
  constructor() {
    this.repository = new _repository();
  }
  validar(data) {
    let nombre_proyecto = data["titulo"];
    try {
      if (nombre_proyecto == "") {
        throw new Error("Por favor ingrese el nombre del proyecto");
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
        throw console.error("Algo inesperado paso en la base de datos");
      }
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }

  async update_proyecto(id, data) {
    //debugger
    //let new_data=await this.llenar_vacios(id,data)
    try {
      if (this.validar(data)) {
        return await this.repository.update_proyecto(id, data);
      } else {
        throw console.error("Algo inesperado paso en la base de datos");
      }
    } catch (error) {
      return error;
    }
  }
  async participate_proyecto(id,id_autenticacion)
  {
    try 
    {
      return await this.repository.participate_proyecto(id,id_autenticacion)
    }
    catch(error)
    {
      throw console.error("Algo inesperado paso con la Base de datos o el id del proyecto o participante no existe");
    }
  }
  async participation(id,id_autenticacion)
  {
    try
    {
      return await this.repository.participation(id,id_autenticacion)
    }
    catch(error)
    {
      throw console.error("Algo inesperado paso con la Base de datos o el id del proyecto o participante no existe"); 
    }
  }

  async delete_proyecto(id) {
    try {
      return await this.repository.delete_proyecto(id);
    } catch (error) {
      throw console.error("El " + id.toString() + " del proyecto No existe");
    }
  }
  async get_participantes_proyecto_simple(id) 
  {
    try 
    {
      const validar= await this.repository.get_participantes_proyecto_simple(id);   
      return validar;
    }catch (error) 
    {
      throw console.error("Algo inesperado paso con la Base de datos"); 
    }
  }
  async get_categorias_proyectos(data) {
    return await this.repository.get_categorias_proyectos(data);
  }


  async cancel_participate_proyecto(id,id_autenticacion) 
  {
    try 
    {
      return await this.repository.cancel_participate_proyecto(id,id_autenticacion)
    }
    catch(error)
    {
      throw console.error("Algo inesperado paso con la Base de datos o el id del proyecto o participante no existe");
    }
  }

  async get_my_proyectos(id_autenticacion)
  {
    try
    {
        return await this.repository.get_my_proyectos(id_autenticacion)
    }
    catch(error)
    {
      throw console.error("Algo inesperado paso con la Base de datos o el id del participante no existe");
    }
  }

  
  async get_lideres(){
    return await this.repository.get_lideres();
  }

  async get_roles(){
    return await this.repository.get_roles();
  }

  async get_rol(id_autenticacion)
  {
    debugger
    try
    {
      return await this.repository.get_rol(id_autenticacion);
    }
    catch(error)
    {
      throw console.error("Algo inesperado paso con la Base de datos");
    }

  }

  async get_numero_participantes(id_proyecto)
  {
    try
    {
        return await this.repository.get_numero_participantes(id_proyecto)
    }
    catch(error)
    {
      throw console.error("Algo inesperado paso con la Base de datos");
    }
  }
  async get_eventos_proyecto(id_proyecto) 
  {
    try 
    {
      return await this.repository.get_eventos_proyecto(id_proyecto);   
    }catch (error) 
    {
      throw console.error("Algo inesperado paso con la Base de datos"); 
    }
  }
}
module.exports = ProyectoServicio;
