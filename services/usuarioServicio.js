const Dbrepository = require('../models/UsuariosModels');
const DbUsuarioRepositorio = require("../config/dbUsuarioRepositorio.js");
const dbUsuarios = require('../config/dbUsuarios');
class usuarioServicio {
  constructor() {
    this.repository = new DbUsuarioRepositorio();
  }
  async get_volunteer_data(myuser_id) {
    let volunter_info = await Dbrepository.usuario.findOne({
      where: {
        id_usuario: myuser_id
      },include:[{
        model:Dbrepository.interes,
        as:'intereses',
        attributes:['interes']
      },
      {
        model:Dbrepository.cualidad,
        as:'cualidades',
        attributes:['cualidad']
      },
      {
        model:Dbrepository.aptitudes_tecnicas,
        as:'aptitudes_tecnicas',
        attributes:['aptitud_tecnica'],
      },
    ],
    }).then((result) => { 
       console.log(result.dataValues);
       return result;
      });
    //console.log(volunter_info.values);
    //let algo = volunter_info.aptitudes_tecnicas.map((a)=>a.dataValues.aptitud_tecnica);
    return volunter_info;
  }
  async get_volunteers_data() {
    return await this.repository.GetUsuarios();
  }
  async register_changes(data) {
    try {
      data.rol = "voluntario";
      data.estado_de_cuenta = "activa";
      data.estado_de_disponibilidad = "disponible";
      return await this.repository.CreateUsuario(data);
    } catch (error) {
      return error;
    }
  }

  async do_changes(id, data) {
    // return await this.repository.UpdateUsuario(id, data);
    try {
      const usuario_a_editar = (await this.repository.GetUsuario(id)).rows[0];
      const data_update = this.completar_form_a_actualizar(
        usuario_a_editar,
        data
      );
      return await this.repository.UpdateUsuario(id, data_update);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async disable_user(id){
    try {
      return await this.repository.disableUser(id);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  completar_form_a_actualizar(usuario_a_editar, data) {
    try {
      for (const prop in usuario_a_editar) {
        if (!data.hasOwnProperty(`${prop}`)) {
          if (prop === "id_usuario") continue; // Este campo no debe estar en el json
          if (prop === "intereses") {
            data[prop] = usuario_a_editar[prop].join(",");
            continue;
          }
          if (prop === "cualidades") {
            data[prop] = usuario_a_editar[prop].join(",");
            continue;
          }
          if (prop === "aptitudes_tecnicas") {
            data[prop] = usuario_a_editar[prop].join(",");
            continue;
          }
          data[prop] = usuario_a_editar[prop];
          continue;
        }
      }
      if(data.fecha_de_nacimiento === "")
      {
        data.fecha_de_nacimiento=null;
      }
      return data;
    } catch (error) {
      return false;
    }
  }
}
module.exports = usuarioServicio;
