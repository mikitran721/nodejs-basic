import express from "express";
// import getHomepage from "../controller/homeController.js";
import homeController from "../controller/homeController.js";
let router = express.Router();

const initWebRoute = (app) => {
  // app.METHOD(PATH, HANDLER); // tao route
  router.get("/", homeController.getHomepage);
  router.get("/detail/user/:id", homeController.getDetailpage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:userId", homeController.editUser);
  router.post("/update-user", homeController.postUpdateUser);
  app.get("/about", (req, res) => {
    res.send(`I'm Miki Tran from HCMC`);
  });

  return app.use("/", router); //dau '/' la tien to them vao khi route
};

export default initWebRoute;
// module.exports = {
//   initWebRoute: initWebRoute,
// };
