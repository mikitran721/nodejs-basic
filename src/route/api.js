import express from "express";
import APIController from "../controller/APIController.js";
let router = express.Router();

const initAPIRoute = (app) => {
  // app.METHOD(PATH, HANDLER); // tao route
  router.get("/users", APIController.getAllUsers);
  router.post("/create-user", APIController.createNewUser);
  router.put("/update-user", APIController.updateUser);
  router.delete("/delete-user/:id", APIController.deleteUser);

  return app.use("/api/v1/", router); //dau '/' la tien to them vao khi route
};

export default initAPIRoute;
