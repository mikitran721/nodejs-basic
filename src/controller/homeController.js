// controller of homepage
// import JSON from "body-parser";
import pool from "../configs/connectDB.js";

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

module.exports = {
  getHomepage,
  getDetailpage,
};
// export default getHomepage;
// export default getDetailPage;
// exports.getHomepage = getHomepage;
// module.getHomepage = getHomepage;
// module.exports = { getHomepage };
