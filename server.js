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

//----------------------------PERFIL----------------------
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
    res.status(202).send(`{"message":"Succesfully Updated!", "data": ${data_to_send}}`);
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
//-------------------------------PROYECTOS-----------------------------------------
app.post("/create_proyecto", async (req, res) => {
  //Crear
  debugger;
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
    req.body["id"]=id;
    const proyectoActualizado = await service.update_proyecto(id, req.body);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(404);
  }
});
app.delete("/delete_proyecto/:id", async (req, res) => {
  //Eliminar por ide
  try {
    const { id } = req.params;
    const proyectoElimanado = await service.delete_proyecto(id);
    res.status(200).json(proyectoElimanado.rows);
  } catch (error){
    res.status(500);
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


app.put("/participate_proyecto/:id/sesion/:id_autenticacion",async(req, res) => {
  debugger
  try
  {
    const { id,id_autenticacion } = req.params;
    const proyecto_a_actualizar= await service.participate_proyecto(id,id_autenticacion);
    res.status(200).json(proyecto_a_actualizar);
  }
  catch(err)
  {
    res.status(404)
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
    res.status(404);}});

app.get("/eventos/:id", async (req, res) => {
  //Obtener
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
    const archivarEvento = await service_evento.update_evento_estado1(id, req.body);
    res.status(200).json(archivarEvento.rows);
  } catch (err) {
    res.status(404);
  }
  try{
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
    const archivarEvento = await service_evento.update_evento_estado2(id, req.body);
    res.status(200).json(archivarEvento.rows);
  } catch (err) {
    res.status(404);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});
