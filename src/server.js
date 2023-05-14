// const express = require("express");
import express from "express";
// import configViewengine from "./configs/viewEngine";
// const path = require("path");
import path from "path";
const __dirname = path.resolve();

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, `./src/index.html`));
});

app.get("/about", (req, res) => {
  res.send(`I'm Miki Tran from HCMC`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
