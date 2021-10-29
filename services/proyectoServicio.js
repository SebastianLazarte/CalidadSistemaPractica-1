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
  convertir_fecha(data){
    var fecha=data.toLocaleDateString();
    return fecha
  }
  async get_proyectos(data) {
    debugger
    var resultado=await this.repository.get_proyectos(data);
    var i=0
    var tamanio=resultado.rows.length
    while(i < tamanio){
      var fecha_inicio = resultado.rows[i].fecha_inicio
      var fecha_fin = resultado.rows[i].fecha_fin
      if (fecha_inicio!=null){
        var fecha_inicio_string=this.convertir_fecha(fecha_inicio)
        resultado.rows[i].fecha_inicio=fecha_inicio_string
      }
      if (fecha_fin!=null){
        var fecha_fin_string=this.convertir_fecha(fecha_fin)
        resultado.rows[i].fecha_fin=fecha_fin_string
      }
      i=i+1
    }
    return resultado
  }
  async get_proyecto(data) {
    var proyecto = await this.repository.get_proyecto(data);
    var fecha_inicio = proyecto.rows[0].fecha_inicio
    var fecha_fin = proyecto.rows[0].fecha_fin
    if (fecha_inicio!=null){
      var fecha_inicio_string=this.convertir_fecha(fecha_inicio)
      proyecto.rows[0].fecha_inicio=fecha_inicio_string
    }
    if (fecha_fin!=null){
      var fecha_fin_string=this.convertir_fecha(fecha_fin)
      proyecto.rows[0].fecha_fin=fecha_fin_string
    }
    return proyecto
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
