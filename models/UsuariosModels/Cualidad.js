const Sequelize = require('sequelize');
const dbUsuarios = require('../../config/dbUsuarios');
const usuario = require('./Usuario');


const cualidad = dbUsuarios.define('cualidades',{
    id_cualidad:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    cualidad:{
        type:Sequelize.TEXT,
    },
},{
    timestamps: false
});
usuario.intereses = usuario.belongsToMany(cualidad,{ 
    through: 'cualidades_de_usuarios',
    foreignKey: 'id_usuario',
    otherKey:'id_cualidad',
    as:'cualidades',
    timestamps: false
});

module.exports = cualidad;