import express from "express";
// import getHomepage from "../controller/homeController.js";
import homeController from "../controller/homeController.js";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + `/src/public/images/`);
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// file: helper.js - can tao file rieng va export
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter }); //midle ware
let upload1 = multer({ storage: storage, fileFilter: imageFilter }).array(
  "multiple_images",
  3
);

const initWebRoute = (app) => {
  // app.METHOD(PATH, HANDLER); // tao route
  router.get("/", homeController.getHomepage);
  router.get("/detail/user/:id", homeController.getDetailpage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:userId", homeController.editUser);
  router.post("/update-user", homeController.postUpdateUser);

  router.get("/upload", homeController.getUploadFilePage);

  ///upload-profile-pic
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );

  // upload multiple file
  // router.post(
  //   "/upload-multiple-images",
  //   upload.array("multiple_images", 3),
  //   homeController.handleUploadMultipleFiles
  // );

  router.post(
    "/upload-multiple-images",
    (req, res, next) => {
      upload1(req, res, (err) => {
        //ts 3 la 1 callback
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          // handle multer file limit error here
          res.send("LIMIT_UNEXPECTED_FILE");
        } else if (err) {
          res.send(err);
        } else {
          // make sure to call next() if all as well
          next();
        }
      });
    },
    homeController.handleUploadMultipleFiles
  );

  app.get("/about", (req, res) => {
    res.send(`I'm Miki Tran from HCMC`);
  });

  return app.use("/", router); //dau '/' la tien to them vao khi route
};

export default initWebRoute;
// module.exports = {
//   initWebRoute: initWebRoute,
// };
