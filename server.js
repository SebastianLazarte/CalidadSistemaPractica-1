const _service = require("./services/proyectoServicio");
const _service_form = require("./services/form");
const express = require("express");
const app = express();
const port = 3000;
const service = new _service();
const service_form = new _service_form();

app.use(express.json());

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
    res.status(202).send(`{"message":"Succesfully Updated!", "data":true}`);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .send(`{"message":"Changes are not commited", "data":false}`);
  }
});
app.get("/extended_form/:id", async (req, res) => {
  try {
    const newVolunteer = await service_form.get_volunteer_data(req);
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

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
