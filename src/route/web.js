import express from "express";
import getHomepage from "../controller/homeController.js";
let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", getHomepage);

  app.get("/about", (req, res) => {
    res.send(`I'm Miki Tran from HCMC`);
  });

  return app.use("/", router); //dau '/' la tien to them vao khi route
};

export default initWebRoute;
// module.exports = {
//   initWebRoute: initWebRoute,
// };
