const _service = require('./service/form')
const express = require('express')
const app = express()
const port = 3000
const service = new _service()

app.use(express.json());

app.post('/extended_form', async (req, res) => {
  try {
    const newVolunteer = await service.register_changes(req.body)
    let data_to_send = JSON.stringify(newVolunteer.rows[0])
    res.send(`{"message":"", "data": ${data_to_send}}`);
  } catch (err) {
    console.error(err.message);
    res.send('{ "message": "Check the info that you sending", "data": ""}');
  }
});
app.put('/extended_form/:id',async (req, res)=>{
    try {
      let {id} = req.params
      const changedVolunteer = await service.do_changes(id, req.body)
      console.log(changedVolunteer)
      res.send(`{"message":"Succesfully Updated!", "data":true}`);
    } catch (error) {
      console.error(error.message);
      res.send(`{"message":"Changes are not commited", "data":false}`);
    }
});
app.get('/extended_form/:id', async (req, res) => {
  try {
    const newVolunteer = await service.get_volunteer_data(req);
    let data_to_send = JSON.stringify(newVolunteer.rows[0])
    res.send(`{"message":"", "data": ${data_to_send}}`);
  } catch (err) {
    console.error(err.message);
    res.send(`{ "message": "The volunteer with id ${req.params[0]}"", "data": ""}`);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
