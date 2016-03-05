var validate = require("validator");
var config = require("../config/config.js");

function validator() {

}

validator.prototype.validateParams = function (srcObj, params, callback) {
  var errObj = {};
  var paramKeys = Object.keys(params);
  for (i = 0; i < srcObj.length; i++) {
    errObj.code = config.errors.invalid_param.code;
    errObj.message = config.errors.invalid_param.message + " : " + srcObj[i];
    if (paramKeys.indexOf(srcObj[i]) < 0 || !params[srcObj[i]]) {
      errObj.code = config.errors.missing_param.code;
      errObj.message = config.errors.missing_param.message + " : " + srcObj[i];
      return callback(errObj);
    }

    if (srcObj[i] === "email") {
      if (validate.isEmail(params[srcObj[i]]) === false) {
        return callback(errObj);
      }
//    } else if (srcObj[i] === "schedule_time") {
//      if (validate.matches(params[srcObj[i]], /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})$/) === false) {
//        return callback(errObj);
//      }
    } else if (srcObj[i] === "candidate_exp") {
      if (typeof(params[srcObj[i]]) !== "number") {
        return callback(errObj);
      }
    }else if(srcObj[i] === "tech_round"||srcObj[i] === "manager_round"||srcObj[i] === "hr_round" ){
      if(typeof (params[srcObj[i]]) !== "object"){
        return callback(errObj);
      }
    }
    else {
      if (typeof (params[srcObj[i]]) !== "string") {
        return callback(errObj);
      }
    }
  }
  return callback();
};

module.exports = validator;
