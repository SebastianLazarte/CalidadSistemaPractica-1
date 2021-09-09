const _service = require('./service/proyectoServicio')
const express = require('express')
const app = express()
const port = 3000
const service = new _service()

app.use(express.json());

app.post('/create_proyecto', async (req, res) => { //Crear
  try {
    const nuevoProyecto = await service.create_proyecto(req.body)
    res.status(201).json(req.body)
  } catch (err) {
    res.status(404)
  }
});
app.put('/update_proyecto/:id',async (req, res)=>{ //Actualizar
    try {
      let {id} = req.params
      const proyectoActualizado = await service.update_proyecto(id, req.body)
      res.status(200).json(proyectoActualizado.rows);
    } catch (error) {
      res.status(404)
    }
});
app.get('/get_proyectos', async (req, res) => { //Obtener
  try {
    const nuevoProyecto = await service.get_proyectos(req);
    res.status(200).json(nuevoProyecto.rows);
  } catch (err) {
      res.status(404)
  }
})

app.get('/get_proyecto/:id', async (req, res) => { //Obtener
  try {
    const nuevoProyecto = await service.get_proyecto(req);
    res.status(200).json(nuevoProyecto.rows);
  } catch (err) {
    res.status(404)
  }
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
