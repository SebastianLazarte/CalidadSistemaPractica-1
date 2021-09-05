const _service = require('./service/form')

const express = require('express')
const app = express()
const port = 3000
const service= new _service()

app.use(express.json());

app.post('/extended_form', async (req, res) => {
  try {
    console.log(req.body)
    const newVolunteer = await service.register_changes(req)
    res.json(newVolunteer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
