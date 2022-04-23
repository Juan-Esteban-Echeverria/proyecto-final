require("dotenv").config();
const express = require("express");
const {create} = require("express-handlebars")
//const {parsearToken} = require("./middlewares/requireAuth")

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
//app.use(parsearToken)


// CONFIGURAR PARTIALS HANDLEBARS
const hbs = create({
  extname: ".hbs"
})

// MOTOR DE PLANTILLAS EXPRESS
app.engine(".hbs", hbs.engine)
app.set("view engine", ".hbs")
app.set("views", "./views")

app.use("/api/v1/", require('./routes/users.route'))
app.use("/", require('./routes/vistas.route'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("SERVER ON http://localhost:" + PORT + "/"));