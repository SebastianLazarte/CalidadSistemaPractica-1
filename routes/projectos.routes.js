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
  app.get(
    "/participate/:id/sesion/:id_autenticacion",
    async(req,res)=>{
      try
      {
        const {id,id_autenticacion}= req.params;
        const esta_participando=await service.participation(id,id_autenticacion);
        res.status(200).json(esta_participando);
      }catch(err){
        res.status(404)
      }
    }
  )
};
