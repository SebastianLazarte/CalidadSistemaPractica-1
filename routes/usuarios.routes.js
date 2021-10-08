const usuarioServicio = require("../services/usuarioServicio");
const usuarioService = new usuarioServicio();

module.exports = function (app) {
  app.post("/extended_form", async (req, res) => {
    try {
      const newVolunteer = await usuarioService.register_changes(req.body);
      let data_to_send = JSON.stringify(newVolunteer.rows[0]);
      res
        .status(201)
        .send(
          `{"message":"The user informtaion was added", "data": ${data_to_send}}`
        );
    } catch (err) {
      console.error(err.message);
      res
        .status(400)
        .send('{ "message": "Check the info that you sending", "data": ""}');
    }
  });

  app.put("/extended_form/:id", async (req, res) => {
    try {
      let { id } = req.params;
      const changedVolunteer = await usuarioService.do_changes(id, req.body);
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
      const newVolunteer = await usuarioService.get_volunteer_data(
        req.params.id
      );
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
  app.get("/extended_form", async (req, res) => {
    try {
      const volunteers = await usuarioService.get_volunteers_data();
      let data_to_send = JSON.stringify(volunteers.rows);
      res.status(200).send(`{"message":"", "data": ${data_to_send}}`)
    } catch (err) {
      console.error(err.message);
      res
        .status(204)
        .send(
          `{ "message": "there are no volunteers", "data": ""}`
        );
    }


  });
};
