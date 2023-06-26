const express = require("express");
const connectDB = require("./config/db");
import { engine } from "express-handlebars";
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// nhap khau routes
const posts = require("./routes/posts");
// const req = require("express/lib/request");

// khoi dong app
const app = express();

//khoi dong handlerbars middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// khoi dong bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// khoi dong method override middleware
app.use(methodOverride("_method"));

// khoi dong express middleware
app.use(express.json());

// ket noi csdl
connectDB();

// mot so routes co ban, co the dua vao file rieng trong folder routes
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));

// mang route su dung
app.use("/posts", posts);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server da khoi dong tai ${PORT}`));
