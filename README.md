
# NodeJs-Express-StartAmericas 
<p align="center">
  <img src="https://raw.githubusercontent.com/MicaelliMedeiros/micaellimedeiros/master/image/computer-illustration.png" alt="Sublime's custom image" min-width="400px" max-width="1000px" width="600px" height="400px" alt="Computador iuriCode"/>
</p>


<details>
  <summary><strong>Comandos para Inicializar</strong></summary>

#### Comando para instalar Dependencias 

    npm install  

#### Comando para Ejecutar el Proyecto

    node server.js || npm start
    
- *Comienza a escuchar en el puerto [localhost 5000](http://localhost:5000/)*

</details>

<details>
    <summary><strong>Arquitectura</strong></summary>

### MVC (Modelo Vista Controlador)
  Start Servicio de Datos sigue una arquitectura basada en capas la cual es el patrón de diseño que especifica cómo debe ser estructurada una aplicación, así como las capas que van a componer la misma y sus propias funcionalidades, este tipo de diseño fue implementado debido a que existía la necesidad de separar los diferentes aspectos del desarrollo como de qué forma se presenta los datos, donde se maneja la lógica de negocio, mecanismos de almacenamiento (Base de datos), entre otros.
Esta arquitectura se centra en la separación de la aplicación en capas aplicando por muy debajo el principio de separación de preocupaciones (SoC)
La arquitectura en capas consta en dividir la aplicación en capas, con la intención de que cada capa tenga un rol muy definido, como por ejemplo en caso del backend tenga la capa de presentación (JSON,data,etc..), una capa de regla de negocios (Servicios) y una capa de acceso a datos (DAO), la definición del número de capas van de acuerdo a la necesidad que se tenga en cuanto a funcionalidad se desee especificar en una.
 Los diagramas C4 son de gran utilidad para un mejor entendimiento del flujo que se sigue en todo el proceso por lo cual a continuación se muestran de ejemplo los diagramas  c3 y c4 de la entidad proyecto debido a que se repite el mismo flujo para otras entidades:
  
#### Diagrama 1: Diagrama de Clases Perteneciente al Modelo C3
  <p align="center">
  <img src="https://user-images.githubusercontent.com/74753713/145108457-7bbd740a-1fbf-4c2d-9e15-bc466bd56561.png" alt="Sublime's custom image"/>
</p>

#### Diagrama 2: Diagrama de Clases Perteneciente al Modelo C4
<p align="center">
  <img src="https://user-images.githubusercontent.com/74753713/145110042-db6c91e9-352e-418e-8b5d-2ec063a7b43a.png" alt="Sublime's custom image"/>
</p>
  


  

</details>

<details>
  <summary><strong>Estructura de archivos</strong></summary>
  
- Config: En este apartado se encuentran la conexion con la tabla de la base de datos, Startup de la aplicacion, configuracion de Cors, etc.
- Documentation: Se encuentra los archivos sql de los eventos, proyectos y de usuarios. Como tambien se encuentra el postman que nos permite realizar pruebas como los requests, para validar que los endpoints que se crearon trabajen de manera correcta.

- Routes: Se encuentra los Endpoints de la API que responden las peticiones que se realicen a este.

- Services: En esta carpeta se encuentran los servicios, las cuales van a ser llamados para ser actualizados algunos modelos o solicitudes dependiendo el contexto. Es el responsable de crear modelos, recuperar, actualizacion de valores o de recursos, como tambien de la logica de la aplicacion.

    
### Recomendaciones 
    Implementar sequelize
</details>

<details>
    <summary><strong>Endpoints</strong></summary>

|    Tipo  | Peticion                  | URL  	                                          |
|----------|---------------------------|--------------------------------------------------|
|    GET   |  All Users                | http://localhost:5000/extended_form              |
|    GET   |  Users by Id              | http://localhost:5000/extended_form/{id_usuario} |
|    GET   |  Insignias by User Id     | http://localhost:5000/insignias/{id_usuario}     |
|  DELETE  |  Dar de baja un usuario   | http://localhost:5000/disable_user/{id_usuario}  |
|   POST   |  User                     | http://localhost:5000/extended_form/{id_usuario} |
|    PUT   |  User                     | http://localhost:5000/extended_form/{id_usuario} |
|    PUT   |  Insignias by User Id     | http://localhost:5000/extended_form/{id_usuario} |

     <summary><strong>Endpoints Eventos</strong></summary>
  
|    Tipo  | Peticion                               | URL  	                                                                           |
|----------|----------------------------------------|----------------------------------------------------------------------------------|
|    GET   |  All Events                            | http://localhost:5000/eventos              	                                     |
|    GET   |  All Lideres                           | http://localhost:5000/lideres              	                                     |
|    GET   |  All Categories                        | http://localhost:5000/eventos/categorias                                         |
|    GET   |  Events by Id                          | http://localhost:5000/eventos/{id_evento}  	                                     |
|    GET   |  List All Participants in one event    | http://localhost:5000/eventos/participante/{id_evento}  	                       |
|    GET   |  Get All Events by User                | http://localhost:5000/sesion/{id_usuario}/get_my_eventos 	                       |
|  DELETE  |  Delete one event                      | http://localhost:5000/evento/{id_evento}                                         |
|  DELETE  |  Delete participacion                  | hhtp://localhost:5000/eventos/eliminar_participacion/{id_evento}/{id_usuario}    |
|   POST   |  Create Event                          | http://localhost:5000/eventos/crearevento                                        |
|   POST   |  Participation in one event            | http://localhost:5000/eventos/participate_evento/{id_evento}/sesion/{id_usuario} |
|    PUT   |  Update Event                          | http://localhost:5000/actualizar_evento/{id_evento}                              |
|    PUT   |  Update Estado                         | http://localhost:5000/eventos/archivar_evento/{id_evento}                        |
|    PUT   |  Update Estado                         | http://localhost:5000/eventos/mostrar_evento/{id_evento}                         |  
  
</details>


<details>
  <summary><strong>Breve explicacion para el agregado de nueva funcionalidad ejemplificada a una sola entidad</strong></summary>

Para el agregado de nueva funcionalidad en el back end (end points) se debe pensar primeramente en “la clase repositorio” donde se crea y usa la conexión con la base de datos esta aun no usa un framework por lo cual se hará mucho más fácil el acceso a esta mediante una sentencia sql, se debe pensar también qué datos necesitamos que la api nos envíe para poder realizar las consultas necesarias (funcionalidades) por ejemplo lo que se tiene que obtener del body o el header para realizar la funcionalidad, esta capa al ser la más cercana a la base de datos no puede hacer mucha o una gran implementación de la lógica de negocio para eso esta el service donde se maneja esta lógica que por ejemplo permite limpiar los nulos para mostrar el json de una manera más limpia, si se desea implementar algo muy particular en cuanto a funcionalidad de START es preferente la utilización de esta capa y finalmente proyecto route donde se le pone nombre a la funcionalidad (https://servicio-de-datos-respaldo.herokuapp.com/nombre_de_tu_funcionalidad) de modo que la api pueda llamar y realizar esta petición, conectándose inicialmente con proyectos rutas después con proyecto servicio y finalmente con el repositorio que realiza las operaciones en la base de datos.
Como una pequeña aclaración es bueno resaltar que existe más de una tabla con la cual se relaciona directamente la principal de proyectos que en este caso serían categorías_proyectos y imagenes_proyectos 
  
</details>
 




### Tecnologias Involucradas

[![Node Version](https://img.shields.io/badge/Node-v15.8.0-green)](https://nodejs.org/docs/latest-v15.x/api/)

[![Express](https://img.shields.io/badge/Express-v4.17.1-yellow)](http://expressjs.com/en/4x/api.html)

[![Cors](https://img.shields.io/badge/Cors-v2.8.5-orange)](https://www.npmjs.com/package/cors)

[![PG](https://img.shields.io/badge/PG-v8.7.1-brown)](https://node-postgres.com/)
    

### TechStack

<code><img height="30" src="https://emojis.slackmojis.com/emojis/images/1465929657/511/heroku.png?1465929657"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png"></code>


[API deploy on heroku]: https://startamericastogether.herokuapp.com/

🏡 [API Deploy on Heroku][API deploy on heroku]


[![Stake Holder](https://img.shields.io/badge/Cliente-StartAmericasTogether-blue)](https://www.startamericastogether.org/)
