
# NodeJs-Express-StartAmericas 
<img src="https://raw.githubusercontent.com/MicaelliMedeiros/micaellimedeiros/master/image/computer-illustration.png" min-width="400px" max-width="1000px" width="600px" height="400px" alt="Computador iuriCode">



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
  
  <p align="center">
  <img src="https://user-images.githubusercontent.com/74753713/145108457-7bbd740a-1fbf-4c2d-9e15-bc466bd56561.png" alt="Sublime's custom image"/>
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
