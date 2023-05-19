// const express = require("express");
import express from "express";
import configViewengine from "./configs/viewEngine.js";
// require("dotenv").config();
import dotnev from "dotenv";
import initWebRoute from "./route/web.js";
// import connection from "./configs/connectDB.js";
import initAPIRoute from "./route/api.js";
var morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
// const port = 8080;
const port = process.env.PORT || 8080;

//build middle ware by myself
app.use((req, res, next) => {
  //check -> return;
  console.log(`>>>MikiTran build req: `, req.method);
  next(); //cho chay cau lenh tiep
});

// config get data client->server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// config view engine
configViewengine(app);

// init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

// handle 404 not found
app.use((req, res) => {
  //
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
