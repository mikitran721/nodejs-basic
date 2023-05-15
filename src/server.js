// const express = require("express");
import express from "express";
import configViewengine from "./configs/viewEngine.js";
// require("dotenv").config();
import dotnev from "dotenv";
import initWebRoute from "./route/web.js";

const app = express();
// const port = 8080;
const port = process.env.PORT || 8080;

// config view engine
configViewengine(app);

// init web route
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
