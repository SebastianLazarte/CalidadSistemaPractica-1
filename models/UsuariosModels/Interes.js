const Sequelize = require('sequelize');
const dbUsuarios = require('../../config/dbUsuarios');
const usuario = require('./Usuario');

const interes = dbUsuarios.define('intereses',{
    id_interes:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    interes:{
        type:Sequelize.TEXT,
    },
},{
    timestamps: false
});
usuario.intereses = usuario.belongsToMany(interes,{ 
    through: 'intereses_de_usuarios',
    foreignKey: 'id_usuario',
    otherKey:'id_interes',
    as:'intereses',
    timestamps: false
});

module.exports = interes;