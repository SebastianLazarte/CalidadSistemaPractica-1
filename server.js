const _service = require("./services/proyectoServicio");
const _service_form = require("./services/form");
const express = require("express");
const cors = require("cors");
const app = express();
const service = new _service();
const service_form = new _service_form();

const _service_evento = require("./services/eventoServicio");
const service_evento = new _service_evento();

app.use(express.json());
app.use(cors());

app.post("/create_proyecto", async (req, res) => {
  //Crear
  try {
    const nuevoProyecto = await service.create_proyecto(req.body);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(404);
  }
});
app.put("/update_proyecto/:id", async (req, res) => {
  //Actualizar
  try {
    let { id } = req.params;
    const proyectoActualizado = await service.update_proyecto(id, req.body);
    res.status(200).json(proyectoActualizado.rows);
  } catch (error) {
    res.status(404);
  }
});
app.get("/get_proyectos", async (req, res) => {
  //Obtener
  try {
    const nuevoProyecto = await service.get_proyectos(req);
    res.status(200).json(nuevoProyecto.rows);
  } catch (err) {
    res.status(404);
  }
});

app.get("/get_proyecto/:id", async (req, res) => {
  //Obtener
  try {
    const nuevoProyecto = await service.get_proyecto(req);
    res.status(200).json(nuevoProyecto.rows);
  } catch (err) {
    res.status(404);
  }
});

//-------------------------------EVENTO-----------------------------------------//

app.post("/eventos/crearevento", async (req, res) => {
  //Crear
  try {
    const nuevoEvento = await service_evento.create_evento(req.body);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(404);
  }
});

app.get("/eventos", async (req, res) => {
  //Obtener
  try {
    const nuevoProyecto = await service_evento.get_eventos(req);
    res.status(200).json(nuevoProyecto.rows);
  } catch (err) {
    res.status(404);
  }
});

app.get("/eventos/:id", async (req, res) => {
  //Obtener
  try {
    const nuevoEvento = await service_evento.get_evento(req);
    res.status(200).json(nuevoEvento.rows);
  } catch (err) {
    res.status(404);
  }
});

//-----------------------------------------------yiga-------------------
app.post("/extended_form", async (req, res) => {
  try {
    const newVolunteer = await service_form.register_changes(req.body);
    let data_to_send = JSON.stringify(newVolunteer.rows[0]);
    res.status(201).send(`{"message":"", "data": ${data_to_send}}`);
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .send('{ "message": "Check the info that you sending", "data": ""}');
  }
});

app.get("/", async (req, res) => {
  try {
    res.status(201).send(`{"message":""}`);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('{ "message": "Error"}');
  }
});

app.put("/extended_form/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const changedVolunteer = await service_form.do_changes(id, req.body);
    let data_to_send = JSON.stringify(changedVolunteer.rows[0]);
    res
      .status(202)
      .send(`{"message":"Succesfully Updated!", "data": ${data_to_send}}`);
    // res.status(202).send(`{"message":"Succesfully Updated!", "data":true}`);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .send(`{"message":"Changes are not commited", "data":false}`);
  }
});

app.get("/extended_form/:id", async (req, res) => {
  try {
    const newVolunteer = await service_form.get_volunteer_data(req.params.id);
    let data_to_send = JSON.stringify(newVolunteer.rows[0]);
    res.status(200).send(`{"message":"", "data": ${data_to_send}}`);
  } catch (err) {
    console.error(err.message);
    res
      .status(204)
      .send(
        `{ "message": "The volunteer with id ${req.params[0]} does not exit"", "data": ""}`
      );
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});
