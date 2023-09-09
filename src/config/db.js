//MongoDB

const mongoose = require("mongoose");

mongoose.set("strict", false);
mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);

//Esta parte la tenía en las variables del .env pero como lo tengo dentro del gitignore lo he cambiado al valor del puerto tal cual :)
mongoose.connect(process.env.DB_URL).then(()=>console.log('Conectado a la db'));