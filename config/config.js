'use strict';

var supportedEnvList = ["localhost", "dev-server", "prod-server"];

var ENV_LOCALHOST = "localhost";
exports.ENV_LOCALHOST = ENV_LOCALHOST;

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = ENV_LOCALHOST;
}

if (supportedEnvList.indexOf(process.env.NODE_ENV) < 0) {
  console.log("Invalid env value : ", process.env.NODE_ENV);
  process.exit(1);
}

var envConfig = require('./env/' + process.env.NODE_ENV);

exports.cloudant = {
  url: envConfig.cloudant.url,
  port: envConfig.cloudant.port,
  username: envConfig.cloudant.username,
  password: envConfig.cloudant.password,
  dbname: envConfig.cloudant.dbname
};

exports.issServerPort = 8080;

exports.success = {
  result: {
    code: 200,
    message: "ok"
  }
};

exports.errors = {
  missing_param: {
    code: -10001,
    message: "Missing mandatory parameter"
  },
  invalid_param: {
    code: -10002,
    message: "Invalid parameter"
  },
  fail_create_iss_workflow: {
    code: -10003,
    message: "Failed to create Interview workflow"
  },
  fail_update_iss_workflow: {
    code: -10004,
    message: "Failed to update Interview workflow"
  },
  fail_getall_iss_workflow: {
    code: -10005,
    message: "Failed to gel all Interview workflow"
  },
  fail_get_iss_workflow: {
    code: -10006,
    message: "Failed to gel Interview workflow"
  },
  fail_delete_iss_workflow: {
    code: -10007,
    message: "Failed to delete Interview workflow"
  },
  fail_updaload_attachment: {
    code: -10008,
    message: "Failed to upload attachment"
  },
  fail_download_attachment: {
    code: -10009,
    message: "Failed to download attachment"
  }
};

