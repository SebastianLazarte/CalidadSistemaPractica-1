// Iniciar servidor
const { app, localhostPort } = require("./config/server.config");

// Projectos
require("./routes/proyectos.routes")(app);
// Eventos
require("./routes/eventos.routes")(app);
// Usuarios
require("./routes/usuarios.routes")(app);

// Launch Server
const PORT = process.env.PORT || localhostPort;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
