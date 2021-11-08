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
  app.get("/eventos/categorias", async (req, res) => {
    try {
      const categorias = await service_evento.get_categorias(req);
      res.status(200).json(categorias.rows);
    } catch (err) {
      console.log("error de ruta");
      res.status(404);
    }
  });

  //Obtener participantes de un evento
  app.get("/eventos/categorias", async (req, res) => {
    try {
      const categorias = await service_evento.get_categorias(req);
      res.status(200).json(categorias.rows);
    } catch (err) {
      console.log("error de ruta");
      res.status(404);
    }
  });

  //Obtener
  app.get("/eventos/participantes/:id", async (req, res) => {
    try {
      const participantes_eventos =
        await service_evento.get_participantes_eventos(req.params["id"]);
      res.status(200).json(participantes_eventos.rows);
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

  //Obtener eventos de un usuario participante
  app.get("/eventos/participante/:id", async (req, res) => {
    try {
      const eventosDelUsuario = await service_evento.get_eventos_usuario(
        req.params["id"]
      );
      res.status(200).json(eventosDelUsuario.rows);
    } catch (err) {
      res.status(404);
    }
  });

  app.get("/lideres", async (req, res) => {
    try {
      const lideres = await service_evento.get_lideres(req);
      res.status(200).json(lideres.rows);
    } catch (err) {
      res.status(404);
    }
  });

  app.delete(
    "/eventos/eliminar_participacion/:idEvento/:idUsuario",
    async (req, res) => {
      try {
        const { idEvento, idUsuario } = req.params;
        const eliminarParticipacion =
          await service_evento.eliminar_participacion(idEvento, idUsuario);
        res.status(200).json(eliminarParticipacion.rows);
      } catch (err) {
        res.status(404);
      }
    }
  );

  //Obtener todos los nombres de los eventos en los que un voluntario esta participando
  app.get("/sesion/:id_autenticacion/get_my_eventos", async (req, res) => {
    try {
      const { id_autenticacion } = req.params;
      let mis_eventos = await service_evento.get_my_eventos(id_autenticacion);
      if (mis_eventos == false)
        res
          .status(404)
          .send(
            "El id : " +
              parseInt(id_autenticacion).toString() +
              " no existe entre los voluntarios"
          );
      else {
        res.status(200).json(mis_eventos);
      }
    } catch (err) {
      res.status(404);
    }
  });

  //Obtener todos los nombres de los eventos en los que un voluntario esta participando
  app.get("/sesion/:id_autenticacion/get_my_eventos", async (req, res) => {
    try {
      const { id_autenticacion } = req.params;
      const mis_eventos = await service_evento.get_my_eventos(id_autenticacion);
      if (!mis_eventos)
        res
          .status(404)
          .send(
            "El id : " +
              parseInt(id_autenticacion).toString() +
              " no existe entre los voluntarios"
          );
      else {
        res.status(200).json(mis_eventos);
      }
    } catch (err) {
      res.status(404);
    }
  });
  //Actualizar evento
  app.put("/actualizar_evento/:id", async (req, res) => {
    console.log("actualizar evento");
    try {
      let { id } = req.params;
      req.body["id"] = id;
      const eventoActualizado = await service_evento.actualizar_evento(
        id,
        req.body
      );
      res.status(200).json(eventoActualizado.rows);
    } catch (error) {
      res.status(404);
    }
  });
};
