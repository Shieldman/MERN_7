require("dotenv").config(); //siempre inicialmente
require("./config/db");
const express = require("express");
const cors = require("cors");
const carsRouter = require("./routes/cars");
const ownersRouter = require("./routes/owners");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: true,
  })
);

app.disable("x-powered-by");

app.use("/api/cars", carsRouter);
app.use("/api/owners", ownersRouter);

//Controlador de rutas no encontradas
app.use("*", (req, res, next) => {
  res.status(404).json({ data: "Not found" });
});

//Controlador de errores generales de servidor
app.use((error, req, res, next) => {
  res.status(500).json({ data: "Internal server error" });
});

//Esta parte la tenía en las variables del .env pero como lo tengo dentro del gitignore lo he cambiado al valor del puerto tal cual :)
app.listen(4001, () => {
  console.log(
    `La aplicación está corriendo en la URL: http://localhost:4001`
  );
});