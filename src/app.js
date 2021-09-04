const _service = require('./service/form')

const express = require('express')
const app = express()
const port = 3000
const service= new _service()

app.use(express.json());

app.post('/extended_form', function(req, res){
  console.log(req.body)
  if (service.register_changes(req.body))
    res.status(201).send('Succesfully Created')
  else
    res.status(404).send('Check the sending data')
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
