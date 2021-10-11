const _service_evento = require("../services/eventoServicio");
const service_evento = new _service_evento();

module.exports = function (app) {
  app.post("/eventos/crearevento", async (req, res) => {
    //Crear
    try {
      const nuevoEvento = await service_evento.create_evento(req.body);
      res.status(201).json(req.body);
    } catch (err) {
      res.status(404);
    }
  });

  //Obtener
  app.get("/eventos", async (req, res) => {
    try {
      const nuevoProyecto = await service_evento.get_eventos(req);
      res.status(200).json(nuevoProyecto.rows);
    } catch (err) {
      res.status(404);
    }
  });

  //Obtener
  app.get("/eventos/:id", async (req, res) => {
    try {
      const nuevoEvento = await service_evento.get_evento(req);
      res.status(200).json(nuevoEvento.rows);
    } catch (err) {
      res.status(404);
    }
  });

  app.post(
    "/eventos/participate_evento/:id/sesion/:id_autenticacion",
    async (req, res) => {
      debugger;
      try {
        const { id, id_autenticacion } = req.params;
        const evento_a_actualizar = await service_evento.participate_evento(
          id,
          id_autenticacion
        );
        res.status(200).json(true);
      } catch (err) {
        res.status(404);
      }
    }
  );

  app.delete("/eventos/:id", async (req, res) => {
    try {
      let { id } = req.params;
      const eliminarEvento = await service_evento.delete_evento(id, req.body);
      res.status(200).json(eliminarEvento.rows);
    } catch (err) {
      res.status(404);
    }
  });

  //Archivar
  app.put("/eventos/archivar_evento/:id", async (req, res) => {
    try {
      let { id } = req.params;
      const archivarEvento = await service_evento.update_evento_estado1(
        id,
        req.body
      );
      res.status(200).json(archivarEvento.rows);
    } catch (err) {
      res.status(404);
    }
    try {
      const changedVolunteer = await service_form.do_changes(id, req.body);
      let data_to_send = JSON.stringify(changedVolunteer.rows[0]);
      res
        .status(202)
        .send(`{"message":"Succesfully Updated!", "data": ${data_to_send}}`);
    } catch (error) {
      console.error(error.message);
      res
        .status(400)
        .send(`{"message":"Changes are not commited", "data":false}`);
    }
  });

  //Mostrar
  app.put("/eventos/mostrar_evento/:id", async (req, res) => {
    try {
      let { id } = req.params;
      const archivarEvento = await service_evento.update_evento_estado2(
        id,
        req.body
      );
      res.status(200).json(archivarEvento.rows);
    } catch (err) {
      res.status(404);
    }
  });
};
