// controller of homepage
// import JSON from "body-parser";
import { json } from "body-parser";
import pool from "../configs/connectDB.js";
import express from "express";
import multer from "multer";

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: rows });
  //   logic code;
  // let data = [];
  // connection.query("SELECT * FROM `users`", function (err, results, fields) {
  //   console.log(`>>> check mysql: `);
  //   console.log(results); // results contains rows returned by server
  //   // console.log(results[0]);
  //   // data = results.map((row) => {
  //   //   return row;
  //   // });
  //   data = results.map((row) => {
  //     return row;
  //   }); //chuyen arr thanh object

  //   // data = JSON.stringify(data);
  //   // console.log(`>>check return data: `, data); // fields contains extra meta data about results, if available
  //   // console.log(`>>data from query: type of `, typeof data);
  //   // console.log(`>>data from query: `, data);
  //   return res.render("index.ejs", { dataUser: data });
  // });

  // console.log(`>>>get data from promise: ,${rows}`);
}; //end function

let getDetailpage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute(`select * from users where id=?`, [id]);
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  console.log(`>>check request: `, req.body);
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    `insert into users(firstName,lastName, email, address) values(?,?,?,?)`,
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute(`delete from users where id=?`, [userId]);
  return res.redirect("/");
};

let editUser = async (req, res) => {
  let id = req.params.userId;
  let [user] = await pool.execute(`select * from users where id=?`, [id]);
  return res.render("update.ejs", { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  // console.log(`>>> check data: `, req.body);
  // console.log(">>>check let data: ", firstName, lastName, email, address, id);
  await pool.execute(
    `update users set firstName= ?, lastName= ?, email= ?, address= ? where id= ?`,
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

const upload = multer().single("profile_pic");

let handleUploadFile = async (req, res) => {
  console.log(`>>>check file info: `, req.file);
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    // console.log(`>>>error from params: `, err);
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    }
    //  else if (err) {
    //   console.log(`>>loi o 4`);
    //   return res.send(err);
    // }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  }); //end upload function
};

module.exports = {
  getHomepage,
  getDetailpage,
  createNewUser,
  deleteUser,
  editUser,
  postUpdateUser,
  getUploadFilePage,
  handleUploadFile,
};
