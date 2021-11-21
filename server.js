// Iniciar servidor
const { app, localhostPort } = require("./config/server.config");
const dbusers = require('./config/dbUsuarios');

// Projectos
require("./routes/proyectos.routes")(app);
// Eventos
require("./routes/eventos.routes")(app);
// Usuarios
require("./routes/usuarios.routes")(app);

async function connect() {
  try {
    await dbusers.authenticate();
    console.log('Connection with db has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connect();
// Launch Server
const PORT = process.env.PORT || localhostPort;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
