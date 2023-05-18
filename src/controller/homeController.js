// controller of homepage
// import JSON from "body-parser";
import { json } from "body-parser";
import pool from "../configs/connectDB.js";
import e from "express";

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

module.exports = {
  getHomepage,
  getDetailpage,
  createNewUser,
  deleteUser,
  editUser,
  postUpdateUser,
};
