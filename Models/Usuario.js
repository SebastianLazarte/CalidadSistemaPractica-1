import { Sequelize } from 'sequelize/types';
import { sequelize } from '../config/dbUsuarios.js';

const usuario = sequelize.define('usuario',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombre:{
        type: Sequelize.TEXT
    },
    apellido:{
        type: Sequelize.TEXT
    },
    fecha_de_nacimiento:{
        type: Sequelize.DATE
    },
    pais_de_recidencia:{
        type: Sequelize.TEXT
    },
    ciudad_de_recidencia:{
        type: Sequelize.TEXT
    },
    carrera:{
        type: Sequelize.TEXT
    },
    ocupacion:{
        type: Sequelize.TEXT
    },
    descripcion_personal:{
        type: Sequelize.TEXT
    },
    telefono:{
        type: Sequelize.TEXT
    },
    genero:{
        type: Sequelize.TEXT
    },
    estado_de_disponibilidad:{
        type: Sequelize.TEXT
    },
    estado_de_cuenta:{
        type: Sequelize.TEXT
    },
    nombre_contacto_de_emergencia:{
        type: Sequelize.TEXT
    },
    numero_contacto_de_emergencia:{
        type: Sequelize.TEXT
    },
   relacion_contacto_de_emergencia:{
        type: Sequelize.TEXT
    },
    rol:{
        type: Sequelize.TEXT
    },
    foto_url:{
        type: Sequelize.TEXT
    },
},{
    timestamps:false
});
export default usuario;
