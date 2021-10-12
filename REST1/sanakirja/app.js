let dictionary = [];
const express = require("express");
const fs = require('fs');

var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

/*CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
// Add headers
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
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});



// GET all users
app.get("/words", (req, res) => {
  const data = fs.readFileSync('./sanakirja.txt',
{encoding:'utf8', flag:'r'});
let palautus = "Ei löytynyt";

  //data:ssa on nyt koko tiedoston sisältö
  /*tiedoston sisältö pitää pätkiä ja tehdä taulukko*/
  const splitLines = data.split(/\r?\n/);
  /*Tässä voisi käydä silmukassa läpi splitLines:ssa jokaisen rivin*/ 
  splitLines.forEach((line) => {
    const words = line.split(" "); //sanat taulukkoon words
    if(words[0]==req.body.fin){
        palautus=words[1];
        return false;
    }

  })

   res.json(palautus);
});

app.post("/words", (req,res)=>{
  const data = fs.readFileSync('./sanakirja.txt',
  {encoding:'utf8', flag:'r'});
  const suomiSana = req.body.fin;
  const engSana = req.body.eng;
  fs.writeFileSync("./sanakirja.txt", suomiSana+" "+engSana+"\n", {flag: "a"});
  res.send({message:"hiaa"});
});

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
