const _service = require("../services/proyectoServicio");
const service = new _service();

module.exports = function (app) {
  //Crear
  app.post("/create_proyecto", async (req, res) => {
    try {
      const nuevoProyecto = await service.create_proyecto(req.body);
      res.status(201).json(req.body);
    } catch (err) {
      res.status(404);
    }
  });
  
  //Actualizar
  app.put("/update_proyecto/:id", async (req, res) => {
    try {
      let { id } = req.params;
      req.body["id"] = id;
      const proyectoActualizado = await service.update_proyecto(id, req.body);
      res.status(200).json(req.body);
    } catch (error) {
      res.status(404);
    }
  });
  //Eliminar por ide
  app.delete("/delete_proyecto/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const proyectoElimanado = await service.delete_proyecto(id);
      res.status(200).json(proyectoElimanado.rows);
    } catch (error) {
      res.status(500);
    }
  });
  //Obtener
  app.get("/get_proyectos", async (req, res) => {
    try {
      const nuevoProyecto = await service.get_proyectos(req);
      res.status(200).json(nuevoProyecto.rows);
    } catch (err) {
      res.status(404);
    }
  });
  //Obtener
  app.get("/get_proyecto/:id", async (req, res) => {
    try {
      const nuevoProyecto = await service.get_proyecto(req);
      res.status(200).json(nuevoProyecto.rows);
    } catch (err) {
      res.status(404);
    }
  });
  //Participar en proyecto
  app.put(
    "/participate_proyecto/:id/sesion/:id_autenticacion",
    async (req, res) => {
      try {
        const { id, id_autenticacion } = req.params;
        const proyecto_a_actualizar = await service.participate_proyecto(
          id,
          id_autenticacion
        );
        res.status(200).json(proyecto_a_actualizar);
      } catch (err) {
        res.status(404);
      }
    }
  );
  //Voluntario participa en proyecto
  app.get("/participate/:id/sesion/:id_autenticacion",async(req,res)=>{
      try
      {
        const {id,id_autenticacion}= req.params;
        const esta_participando=await service.participation(id,id_autenticacion);
        res.status(200).json(esta_participando);
      }catch(err){
        res.status(404);
      }
    }
  )
   //Obtener lista simple de participantes 
  app.get("/get_participantes_proyecto_simple/:id", async (req, res) => {
    try {
      const {id}= req.params;
      const lista_simple = await service.get_participantes_proyecto_simple(id);
      if(lista_simple==false)
        res.status(404).send("El id: "+ parseInt(id).toString()  +    " no existe");
      res.status(200).json(lista_simple.rows);
    } catch (err) {
      res.status(404);
    }
  });
  //Obtener Proyectos por categoria
  app.get("/get_proyectos/:categoria", async (req, res) => {
    try {
      const {categoria}= req.params;
      const nuevoProyecto = await service.get_categorias_proyectos(categoria);
      res.status(200).json(nuevoProyecto.rows);
    } catch (err) {
      res.status(404);
    }
  });


    //Cancelar participacion de un voluntario en el proyecto
    app.delete("/cancel_participate_proyecto/:id/sesion/:id_autenticacion",async (req, res) => {
      try {
        const { id, id_autenticacion } = req.params;
        const voluntario_retirado = await service.cancel_participate_proyecto(
          id,
          id_autenticacion
        );
        res.status(200).json(voluntario_retirado);
      } catch (err) {
        res.status(404);
      }
    }
  );

  //Obtener todos los nombres de los proyectos en los que un voluntario esta participando
  app.get("/sesion/:id_autenticacion/get_my_proyectos",async(req,res)=>{
    try{
      const {id_autenticacion}=req.params;
      const mis_proyectos=await service.get_my_proyectos(id_autenticacion);
      if(mis_proyectos==false)
        res.status(404).send("El id : "+ parseInt(id_autenticacion).toString()  +    " no existe entre los voluntarios");
      else
      {
        res.status(200).json(mis_proyectos.rows);
      }
    }catch(err){
      res.status(404);
    }
  });

  //Obtener todos los lideres existentes en la tabla usuarios
  app.get("/get_lideres",async(req,res)=>{
    try {
      const lideres = await service.get_lideres();
      res.status(200).json(lideres.rows);
    } catch (err) {
      res.status(404);
    }
  })


  //Obtener el rol de un id autentificado 
  app.get("/get_rol/:id_autenticacion",async(req,res)=>{
    try {
      const {id_autenticacion}=req.params;
      const rol = await service.get_rol(id_autenticacion);
      res.status(200).json(rol.rows);
    } catch (err) {
      res.status(404);
    }
  })
  app.get("/get_numero_participantes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const numero_participantes_proyecto = await service.get_numero_participantes(id);
      res.status(200).json(numero_participantes_proyecto);
    } catch (err) {
      res.status(404);
    }
  });



};
