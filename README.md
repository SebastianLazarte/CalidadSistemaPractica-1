# NodeJs-Express-StartAmericas

<img alt="Logo" align="right" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu1tfJ2N0SENG9G86Avbt6qN59vXLDAFYggA5IrspoOX4Q_irRB18laR-At4dTKZyG6VI&usqp=CAU" width="20%" />

<details>
  <summary><strong>Comandos para Inicializar</strong></summary>

#### Comando para instalar Dependencias

    npm install

#### Comando para Ejecutar el Proyecto

    node server.js || npm start

- _Comienza a escuchar en el puerto [localhost 5000](http://localhost:5000/)_

</details>

<details>
    <summary><strong>Arquitectura</strong></summary>

### MVC (Modelo Vista Controlador)

Start Servicio de Datos sigue una arquitectura basada en capas la cual es el patrón de diseño que especifica cómo debe ser estructurada una aplicación, así como las capas que van a componer la misma y sus propias funcionalidades, este tipo de diseño fue implementado debido a que existía la necesidad de separar los diferentes aspectos del desarrollo como de qué forma se presenta los datos, donde se maneja la lógica de negocio, mecanismos de almacenamiento (Base de datos), entre otros.
Esta arquitectura se centra en la separación de la aplicación en capas aplicando por muy debajo el principio de separación de preocupaciones (SoC)
La arquitectura en capas consta en dividir la aplicación en capas, con la intención de que cada capa tenga un rol muy definido, como por ejemplo en caso del backend tenga la capa de presentación (JSON,data,etc..), una capa de regla de negocios (Servicios) y una capa de acceso a datos (DAO), la definición del número de capas van de acuerdo a la necesidad que se tenga en cuanto a funcionalidad se desee especificar en una.
Los diagramas C4 son de gran utilidad para un mejor entendimiento del flujo que se sigue en todo el proceso por lo cual a continuación se muestran de ejemplo los diagramas c3 y c4 de la entidad proyecto debido a que se repite el mismo flujo para otras entidades:

#### Diagrama 1: Diagrama de Clases Perteneciente al Modelo C3

  <p align="center">
  <img src="https://user-images.githubusercontent.com/74753713/145108457-7bbd740a-1fbf-4c2d-9e15-bc466bd56561.png" alt="Sublime's custom image"/>
</p>

#### Diagrama 2: Diagrama de Clases Perteneciente al Modelo C4

<p>
  <img src="https://user-images.githubusercontent.com/74753713/145110042-db6c91e9-352e-418e-8b5d-2ec063a7b43a.png" alt="Sublime's custom image"/>
</p>


</details>

<details>
  <summary><strong>Estructura de archivos</strong></summary>
  
- Config: En este apartado se encuentran la conexion con la tabla de la base de datos, Startup de la aplicacion, configuracion de Cors, etc.

- Documentation: Se encuentra los archivos sql de los eventos, proyectos y de usuarios. Como tambien se encuentra el postman que nos permite realizar pruebas como los requests, para validar que los endpoints que se crearon trabajen de manera correcta.

- Data: Se encuentran las consultas sql a la db deployeada en heroku, dividida por los 3 flujos principales.

- Routes: Se encuentra los Endpoints de la API que responden las peticiones que se realicen a este(Controladores).

- Services: En esta carpeta se encuentran los servicios, las cuales van a ser llamados para ser actualizados algunos modelos o solicitudes dependiendo el contexto. Es el responsable de crear modelos, recuperar, actualizacion de valores o de recursos, basicamente la **logica de la aplicacion** se implementa aca.

### Recomendaciones

    - Implementar Sequelize o algun ORM similar
    - Unir Repositorio Servicio de Datos y Authenticacion

</details>

<details>
    <summary><strong>Endpoints</strong></summary>
  
## Usuarios 
|    Tipo  | Peticion                  | URL  	                                          |
|----------|---------------------------|--------------------------------------------------|
|    GET   |  All Users                | http://localhost:5000/extended_form              |
|    GET   |  Users by Id              | http://localhost:5000/extended_form/{id_usuario} |
|    GET   |  Insignias by User Id     | http://localhost:5000/insignias/{id_usuario}     |
|  DELETE  |  Dar de baja un usuario   | http://localhost:5000/disable_user/{id_usuario}  |
|   POST   |  User                     | http://localhost:5000/extended_form/{id_usuario} |
|    PUT   |  User                     | http://localhost:5000/extended_form/{id_usuario} |
|    PUT   |  Insignias by User Id     | http://localhost:5000/extended_form/{id_usuario} |

## Proyectos

| Tipo   | Peticion                                                 | URL                                                                                                 |
| ------ | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| GET    | All projects                                             | http://localhost:5000/get_proyectos                                                                 |
| GET    | A specific project                                       | http://localhost:5000/get_proyecto/{id_project}                                                     |
| GET    | Volunteer participation in project                       | http://localhost:5000/participate/{id_project}/sesion/{id_usuario}                                  |
| GET    | All project participants                                 | http://localhost:5000/get_participantes_proyecto_simple/{id_project}                                |
| GET    | All projects in a category                               | http://localhost:5000/get_proyectos/{category_name}                                                 |
| GET    | All projects in which I have participated as a volunteer | http://localhost:5000/sesion/{id_usuario}/get_my_proyectos                                          |
| GET    | All leaders                                              | http://localhost:5000/get_lideres                                                                   |
| GET    | Get user role                                            | http://localhost:5000/get_rol/{id_usuario}                                                          |
| GET    | Get participants number                                  | http://localhost:5000/get_numero_participantes/{id_project}                                         |
| GET    | Get project events                                       | http://localhost:5000/get_eventos_proyecto/{id_project}                                             |
| GET    | Get finished projects                                    | http://localhost:5000/get_proyectos_acabado                                                         |
| GET    | Get projects Categories                                  | http://localhost:5000/get_categoria_proyectos                                                       |
| GET    | Get Users                                                | http://localhost:5000/get_usuarios                                                                  |
| GET    | Get project image                                        | http://localhost:5000/get_image_proyecto/{id_project}                                               |
| DELETE | Delete project                                           | http://localhost:5000/delete_proyecto/{id_project}                                                  |
| DELETE | Cancel project participation                             | http://localhost:5000/cancel_participate_proyecto/{id_project}/sesion/{id_usuario}                  |
| POST   | Create Project                                           | http://localhost:5000/create_proyecto                                                               |
| POST   | Assing project image                                     | http://localhost:5000/create_imagen_proyecto/{id_project}                                           |
| PUT    | Update Project                                           | http://localhost:5000/update_proyecto/{id_project}                                                  |
| PUT    | Participate in proyect                                   | http://localhost:5000/participate_proyecto/{id_project}/sesion/{id_usuario}                         |
| PUT    | Participate in past proyect                              | http://localhost:5000/participate_past_proyecto/{idproject}/sesion/{idctuser}/volunteer/{idusuario} |

## Eventos

| Tipo   | Peticion                           | URL                                                                              |
| ------ | ---------------------------------- | -------------------------------------------------------------------------------- |
| GET    | All Events                         | http://localhost:5000/eventos                                                    |
| GET    | All Lideres                        | http://localhost:5000/lideres                                                    |
| GET    | All Categories                     | http://localhost:5000/eventos/categorias                                         |
| GET    | Events by Id                       | http://localhost:5000/eventos/{id_evento}                                        |
| GET    | List All Participants in one event | http://localhost:5000/eventos/participante/{id_evento}                           |
| GET    | Get All Events by User             | http://localhost:5000/sesion/{id_usuario}/get_my_eventos                         |
| DELETE | Delete one event                   | http://localhost:5000/evento/{id_evento}                                         |
| DELETE | Delete participacion               | hhtp://localhost:5000/eventos/eliminar_participacion/{id_evento}/{id_usuario}    |
| POST   | Create Event                       | http://localhost:5000/eventos/crearevento                                        |
| POST   | Participation in one event         | http://localhost:5000/eventos/participate_evento/{id_evento}/sesion/{id_usuario} |
| PUT    | Update Event                       | http://localhost:5000/actualizar_evento/{id_evento}                              |
| PUT    | Update Estado                      | http://localhost:5000/eventos/archivar_evento/{id_evento}                        |
| PUT    | Update Estado                      | http://localhost:5000/eventos/mostrar_evento/{id_evento}                         |

</details>

<details>
  <summary><strong> Breve Explicacion (Agregar Nueva Funcionalidad)</strong></summary>

Para agregar un nuevo endpoint se debe agregar la request en routes eligiendo el flujo al que pertenezca (usuarios,proyectos,eventos), posteriormente verficar el verbo de la misma.

En servicios crear un nuevo metodo en la clase correspondiente que reciba los datos de los repositorios (en la carpeta Data). <strong> Aca se deberia implementar logica, validaciones </strong>

Finalmente dentro de la clase repositorio del flujo correspondiente, crear un nuevo metodo, en este caso es simplemente es mandar una consulta sql a travez del cursor que provee PG para conectarse.

</details>


<details>
<summary><strong> Tecnologias Involucradas </strong></summary>

- Lenguaje Base de la API  
  [![Node Version](https://img.shields.io/badge/Node-v15.8.0-green)](https://nodejs.org/docs/latest-v15.x/api/)

- Levantar Servicio  
  [![Express](https://img.shields.io/badge/Express-v4.17.1-yellow)](http://expressjs.com/en/4x/api.html)

- Configuracion de acceso a la API  
  [![Cors](https://img.shields.io/badge/Cors-v2.8.5-orange)](https://www.npmjs.com/package/cors)

- Conexion con Postgres (BD)  
  [![PG](https://img.shields.io/badge/PG-v8.7.1-brown)](https://node-postgres.com/)

</details>

### TechStack

<code><img height="30" src="https://emojis.slackmojis.com/emojis/images/1465929657/511/heroku.png?1465929657"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png"></code>

[api deploy on heroku]: https://startamericastogether.herokuapp.com/

🏡 [API Deploy on Heroku][api deploy on heroku]

[![Stake Holder](https://img.shields.io/badge/Cliente-StartAmericasTogether-blue)](https://www.startamericastogether.org/)
