const Sequelize = require('sequelize');
const dbUsuarios = require('../../config/dbUsuarios');
const usuario = require('./Usuario');

const aptitudes_tecnicas = dbUsuarios.define('aptitudes_tecnicas',{
    id_aptitud:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    aptitud_tecnica:{
        type:Sequelize.TEXT,
    },
},{
    timestamps: false
});
usuario.aptitudes_tecnicas = usuario.belongsToMany(aptitudes_tecnicas,{ 
    through: 'aptitudes_de_usuarios',
    foreignKey: 'id_usuario',
    otherKey:'id_aptitud',
    as:'aptitudes_tecnicas',
    timestamps: false
});

module.exports = aptitudes_tecnicas;