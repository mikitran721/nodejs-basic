import express from "express";

const configViewengine = (app) => {
  //sd instance cua express
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
  app.use(express.static("./src/public"));
};

export default configViewengine;
