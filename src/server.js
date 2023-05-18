// const express = require("express");
import express from "express";
import configViewengine from "./configs/viewEngine.js";
// require("dotenv").config();
import dotnev from "dotenv";
import initWebRoute from "./route/web.js";
// import connection from "./configs/connectDB.js";
import initAPIRoute from "./route/api.js";

const app = express();
// const port = 8080;
const port = process.env.PORT || 8080;

// config get data client->server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config view engine
configViewengine(app);

// init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
