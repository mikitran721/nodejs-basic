import Express from "express";

const configViewengine = (app) => {
  //sd instance cua express
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

export default configViewengine;
