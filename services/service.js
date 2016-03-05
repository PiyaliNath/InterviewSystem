var async = require("async");
var config = require("../config/config.js");
var DBInterface = require("../dbinterface/dbinterface.js");
var Validator = require("./validator.js");

function services(serviceConfig) {
  var dbConfig = serviceConfig;
  this.dbInterface = new DBInterface(dbConfig);
  this.validator = new Validator();
}

services.prototype.createCandidateDetails = function (doc, createCB) {
  var self = this;
  var mandatoryParams = [
    "email",
    "name",
    "skills",
    "reference_name",
    "candidate_exp",
    "project_name",
    "project_manager_name",
    "schedule_time",
    "tech_round",
    "manager_round",
    "hr_round"
  ];

  var validate = function (validateCB) {
    var inputParams = doc;
    self.validator.validateParams(mandatoryParams, inputParams, function (isInValid) {
      if (isInValid) {
        console.log("\n File:services -> Function:createCandidateDetails -> isInValid :  ", isInValid);
        return validateCB(isInValid);
      } else {
        return validateCB();
      }
    });
  };

  var createDoc = function (createDocCB) {
    doc._id = doc.email;
    self.dbInterface.createDoc(doc, function (createErr, createRes) {
      if (createErr) {
        console.log("\n File:services -> Function:createCandidateDetails -> createErr :  ", createErr);
        return createDocCB(createErr);
      } else {
        return createDocCB(null, createRes);
      }
    });
  };

  async.series([
    function (seriesCB) {
      validate(function (isInValid) {
        if (isInValid) {
          return seriesCB(isInValid);
        } else {
          return seriesCB();
        }
      });
    },
    function (seriesCB) {
      createDoc(function (err, res) {
        if (err) {
          return seriesCB(err);
        } else {
          return seriesCB(null, res);
        }
      });
    }
  ], function (error, result) {
    if (error) {
      return createCB(config.errors.fail_create_iss_workflow, null);
    } else {
      return createCB(null, config.success.result);
    }
  });

};

services.prototype.getAllCandidateDetails = function (doc, getCB) {
  var self = this;
  var getAllDocs = function (getDocCB) {
    self.dbInterface.getAllDocs(function (getErr, getRes) {
      if (getErr) {
        console.log("\n File:services -> Function:getAllCandidateDetails -> getErr :  ", getErr);
        return getDocCB(getErr, null);
      } else {
        return getDocCB(null, getRes);
      }
    });
  };

  var formatAllDocs = function (docs, formatDocsCB) {
    var docArray = [];
    async.each(docs, function (doc, eachCB) {
      if (doc.id !== "_design/document") {
        delete doc.doc._id;
        delete doc.doc._rev;
        docArray.push(doc.doc);
      }
      return eachCB();
    }, function (formatDocErr) {
      if (formatDocErr) {
        console.log("\n File:services -> Function:getAllCandidateDetails -> formatDocErr :  ", formatDocErr);
        return formatDocsCB(formatDocErr);
      } else {
        return formatDocsCB(null, docArray);
      }
    });
  };

  async.waterfall([
    function (waterfallCB) {
      getAllDocs(function (err, allDocs) {
        if (err) {
          return waterfallCB(err, null);
        } else {
          return waterfallCB(null, allDocs);
        }
      });
    },
    function (allDocs, seriesCB) {
      formatAllDocs(allDocs, function (err, allDocsArray) {
        if (err) {
          return seriesCB(err, null);
        } else {
          return seriesCB(null, allDocsArray);
        }
      });
    }
  ], function (error, result) {
    if (error) {
      return getCB(config.errors.fail_getall_iss_workflow, null);
    } else {
      return getCB(null, result);
    }
  });

};

services.prototype.updateCandidateDetails = function (doc, updateCB) {
  var self = this;
  var mandatoryParams = ["email"];
  var validate = function (validateCB) {
    var inputParams = doc;
    self.validator.validateParams(mandatoryParams, inputParams, function (isInValid) {
      if (isInValid) {
        console.log("\n File:services -> Function:updateCandidateDetails -> isInValid :  ", isInValid);
        return validateCB(isInValid);
      } else {
        return validateCB();
      }
    });
  };

  var updateDoc = function (updateDocCB) {
    self.dbInterface.updateDoc(doc.email, doc, function (updateErr, updateRes) {
      if (updateErr) {
        console.log("\n File:services -> Function:updateCandidateDetails -> updateErr :  ", updateErr);
        return updateDocCB(updateErr, null);
      } else {
        return updateDocCB(null, updateRes);
      }
    });
  };

  async.series([
    function (seriesCB) {
      validate(function (isInValid) {
        if (isInValid) {
          return seriesCB(isInValid);
        } else {
          return seriesCB();
        }
      });
    },
    function (seriesCB) {
      updateDoc(function (err, res) {
        if (err) {
          return seriesCB(err);
        } else {
          return seriesCB(null, res);
        }
      });
    }
  ], function (error, result) {
    if (error) {
      return updateCB(config.errors.fail_update_iss_workflow, null);
    } else {
      return updateCB(null, config.success.result);
    }
  });

};

services.prototype.deleteCandidateDetails = function (doc, deleteCB) {
  var self = this;
  var mandatoryParams = ["email"];
  var validate = function (validateCB) {
    var inputParams = doc;
    self.validator.validateParams(mandatoryParams, inputParams, function (isInValid) {
      if (isInValid) {
        console.log("\n File:services -> Function:deleteCandidateDetails -> isInValid :  ", isInValid);
        return validateCB(isInValid);
      } else {
        return validateCB();
      }
    });
  };

  var deleteDoc = function (deleteDocCB) {
    self.dbInterface.deleteDoc(doc.email, function (deleteErr, deleteRes) {
      if (deleteErr) {
        console.log("\n File:services -> Function:deleteCandidateDetails -> deleteErr :  ", deleteErr);
        return deleteDocCB(deleteErr, null);
      } else {
        return deleteDocCB(null, deleteRes);
      }
    });
  };

  async.series([
    function (seriesCB) {
      validate(function (isInValid) {
        if (isInValid) {
          return seriesCB(isInValid);
        } else {
          return seriesCB();
        }
      });
    },
    function (seriesCB) {
      deleteDoc(function (err, res) {
        if (err) {
          return seriesCB(err);
        } else {
          return seriesCB(null, res);
        }
      });
    }
  ], function (error, result) {
    if (error) {
      return deleteCB(config.errors.fail_delete_iss_workflow, null);
    } else {
      return deleteCB(null, config.success.result);
    }
  });

};

module.exports = services;