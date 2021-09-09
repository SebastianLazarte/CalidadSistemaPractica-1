const _service = require('./service/form')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const service = new _service()

app.use(express.json());
app.use(cors());

app.post('/extended_form', async (req, res) => {
  try {
    const newVolunteer = await service.register_changes(req.body)
    let data_to_send = JSON.stringify(newVolunteer.rows[0])
    res.status(201).send(`{"message":"", "data": ${data_to_send}}`);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('{ "message": "Check the info that you sending", "data": ""}');
  }
});
app.put('/extended_form/:id',async (req, res)=>{
    try {
      let {id} = req.params
      const changedVolunteer = await service.do_changes(id, req.body)
      console.log(changedVolunteer)
      res.status(202).send(`{"message":"Succesfully Updated!", "data":true}`);
    } catch (error) {
      console.error(error.message);
      res.status(400).send(`{"message":"Changes are not commited", "data":false}`);
    }
});
app.get('/extended_form/:id', async (req, res) => {
  try {
    const newVolunteer = await service.get_volunteer_data(req);
    let data_to_send = JSON.stringify(newVolunteer.rows[0])
    res.status(200).send(`{"message":"", "data": ${data_to_send}}`);
  } catch (err) {
    console.error(err.message);
    res.status(204).send(`{ "message": "The volunteer with id ${req.params[0]} does not exit"", "data": ""}`);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
