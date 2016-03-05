var application_root = __dirname;
var express = require("express");
var path = require("path");
var config = require("./config/config.js");
//Initialization of express webserver in app variable
var app = express();
var Service = require("./services/service.js");
var service = new Service(config.cloudant);

//Configuration related to Express file
//Config
if (process.env.NODE_ENV === config.ENV_LOCALHOST) {
  var bodyParser = require('body-Parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  var methodOverride = require('method-override');
  app.use(methodOverride());
  app.use(express.static(path.join(application_root, "public")));

  var errorhandler = require('errorhandler');
  app.use(errorhandler());
}

//API to create a candidate data into database
app.route('/createCandidate').post(function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  var body = JSON.parse(JSON.stringify(req.body));

  service.createCandidateDetails(body, function (createErr, createRes) {
    if (createErr) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: createErr}));
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({result: createRes}));
    }
  });
});
//End: API for POST request will be http://localhost:8080/createCandidate

//Api to give the list of All candidates in the database
app.route('/getAllCandidateDetails').get(function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  service.getAllCandidateDetails(req.body, function (getAllErr, getAllRes) {
    if (getAllErr) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: getAllErr}));
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({result: getAllRes}));
    }
  });
});
//End: API for GET request will be http://localhost:8080/getAllInterviewWorkflow

//API for Updating CadidateData in DataBase with Specific Email Id
app.route('/updateCandidateDetails').put(function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT");
  service.updateCandidateDetails(req.body, function (updateErr, updateRes) {
    if (updateErr) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: updateErr}));
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({result: updateRes}));
    }
  });

});
//End:API for UPDATE request will be http://localhost:8080/updateInterviewWorkflow

//API for to delete candidate data from database
app.route("/deleteCandidateDetails").delete(function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE");
  service.deleteCandidateDetails(req.body, function (deleteErr, deleteRes) {
    if (deleteErr) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: deleteErr}));
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({result: deleteRes}));
    }
  });
});
//End : API for DELETE request will be http://localhost:8080/deleteInterviewWorkflow

app.listen(config.issServerPort);
console.log("Server listening on Port : ", config.issServerPort);
