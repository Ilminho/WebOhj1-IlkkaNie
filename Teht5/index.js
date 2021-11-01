const mysql = require("mysql");



const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const con = mysql.createConnection({
  host: "localhost",
  user: "kt",
  password: "kt123456",
  database: "puhelinluettelo",
  multipleStatements: true, //out parametria varten aliohjelmassa
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    
    return;
  }
  console.log("Connection established");
});
//Â GETÂ allÂ users
app.get("/users", (req, res) => {


  con.query('SELECT * from henkilot', function (error, results,fields){
    if(error) throw error;
    return res.send(results);
  })
});
//Â GETÂ aÂ user
app.get("/users/:id", (req, res) => {
  //console.log(req);
  let user_id = req.body.user_id;
  if(!user_id){
    return res.status(400).send('Please provide id');
  }

  con.query('SELECT * from henkilot where id = ?', [user_id], function (error, results,fields){
    if(error) throw error;
    return res.send({error: false, data:results, message: 'henkilot'});
  })
});
//Â ADDÂ aÂ user
app.post("/users", (req, res) => {
  let user_id = Number(req.body.user_id);
  let name = req.body.name;
  let phone = req.body.phone;
  if(!user_id||!name||!phone){
    return res.status(400).send('User_id, name or phone is missing');
  }

  con.query('INSERT INTO henkilot Values (?,?,?)', [user_id,name,phone], function (error, results,fields){
    if(error) throw error;
    return res.send({error: false, data:results, message: 'henkilot'});
  })
});
//Â UPDATEÂ aÂ user
app.put("/users/:id", (req, res) => {
  let user_id = req.body.user_id;
  let updateUser = req.body.name;

  if(!user_id || !updateUser){
    return res.status(400).send('Jotain meni vikaan');
  }

  con.query('UPDATE puhelinluettelo SET nimi = ? Where id = ?', [updateUser,user_id], function (error, results,fields){
    if(error) throw error;
    return res.send({error: false, data:results, message: 'henkilo on paivitetty onnistuneesti'});
  })
});
//Â DELETEÂ aÂ user
app.delete("/users/:id", (req, res) => {
  let user_id = req.body.user_id;

  if(!user_id){
    return res.status(400).send('Eiiiii löydy user_id:tä');
  }
  con.query('DELETE FROM henkilot WHERE id = ?', [user_id], function (error,results, fields){
    if(error) throw error;
    res.send({error: false, data: results, message: 'poistettu'});
  })
});


// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values





/*
con.query("SELECT * FROM henkilot", (err, rows) => {
  if (err) throw err;

  console.log("Data received from Db:");
  rows.forEach((row) => {
    console.log(`${row.nimi}, puhelin on ${row.puhelin}`);
  });
});

*/

/*
const henkilo = { nimi: 'Ankka Roope', puhelin: '050-1231232' };
con.query('INSERT INTO henkilot SET ?', henkilo, (err, res) => {
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});
*/

/*

con.query(
    'UPDATE henkilot SET puhelin = ? Where ID = ?',
    ['044-6544655', 3],
    (err, result) => {
      if (err) throw err;

      console.log(`Changed ${result.changedRows} row(s)`);
    }
  );

  */

  /*

con.query("DELETE FROM henkilot WHERE id = ?", [5], (err, result) => {
  if (err) throw err;

  console.log(`Deleted ${result.affectedRows} row(s)`);
});

*/

/*

con.query("CALL sp_get_henkilot()", function (err, rows) {
  if (err) throw err;

  rows[0].forEach( (row) => {
    console.log(`${row.nimi},  puhelin: ${row.puhelin}`);
  });
  console.log(rows);
});

*/

/*

con.query("CALL sp_get_henkilon_tiedot(1)", (err, rows) => {
  if (err) throw err;

  console.log("Data received from Db:\n");
  console.log(rows[0]);
});
*/
/*
con.query(
    "SET @henkilo_id = 0; CALL sp_insert_henkilo(@henkilo_id, 'Matti Miettinen', '044-5431232'); SELECT @henkilo_id",
    (err, rows) => {
      if (err) throw err;

      console.log('Data received from Db:\n');
      console.log(rows);
    }
  );
  "1"; //*ettÃ¤ kukaan ei voi syÃ¶ttÃ¤Ã¤ tÃ¤tÃ¤:
const userSubmittedVariable = '1; DROP TABLE henkilot';
*/
/*
con.query(
  `SELECT * FROM henkilot WHERE id = ${mysql.escape(userSubmittedVariable)}`,
  (err, rows) => {
    if (err) throw err;
    console.log(rows);
  }
);
*/
/*
con.end((err) => {
  //The connection is terminated gracefully
  //Ensures all remaining queries are executed
  //Then sends a quit packet to the MySQL server.
}); */

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});