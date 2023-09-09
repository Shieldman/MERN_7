require("dotenv").config(); //siempre inicialmente
require("./config/db");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit")
const carsRouter = require("./routes/cars");
const ownersRouter = require("./routes/owners");
const authRouter = require("./routes/auth")

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: true,
  })
);

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 50, // Limit each IP to 50 requests per `window`
  standardHeaders: false, // Disable the rate limit headers 
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

app.use(limiter);

app.disable("x-powered-by");

app.use("/api/cars", carsRouter);
app.use("/api/owners", ownersRouter);
app.use("/api/auth", authRouter);

//Controlador de rutas no encontradas
app.use("*", (req, res, next) => {
  res.status(404).json({ data: "Not found" });
});

//Controlador de errores generales de servidor
app.use((error, req, res, next) => {
  res.status(500).json({ data: "Internal server error" });
});

//Esta parte la tenía en las variables del .env pero como lo tengo dentro del gitignore lo he cambiado al valor del puerto tal cual :)
app.listen(process.env.URL_PORT, () => {
  console.log(
    `La aplicación está corriendo en la URL: http://localhost:${process.env.URL_PORT}`
  );
});