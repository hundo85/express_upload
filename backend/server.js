const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const fs = require("fs");

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");

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

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:8000/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const PORT = 8000;
/* app.use("/form", express.static(__dirname + "../../frontend/index.html"));
app.use("/pub", express.static(__dirname + "../../frontend/public")); */

// default options
app.use(fileUpload());

app.get("/ping", function (req, res) {
  res.send("pong");
});

app.post("/upload", function (req, res) {
  let incomeFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  console.log("req.files >>>", req.files); // eslint-disable-line
  console.log("req.body >>>", req.body);
  incomeFile = req.files.file; //named file in html
  incomeFile.name = req.body.name + ".jpg";
  uploadPath = __dirname + "/uploads/" + incomeFile.name;

  incomeFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("File uploaded to " + uploadPath);

    incomeText = req.body.userdata;
    const jsonContent = JSON.parse(incomeText);
    const json = JSON.stringify(jsonContent);

    fs.writeFile(
      __dirname +
        "/uploads/" +
        `${jsonContent.email.replace(/[^a-zA-Z0-9]/g, "")}` +
        ".json",
      json,
      "utf8",
      function () {}
    );
  });
});
//--------------------------------------------------------------------

app.listen(PORT, function () {
  console.log("Express server listening on port ", "http://localhost:" + PORT); // eslint-disable-line
});
