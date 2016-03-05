var cradle = require('cradle');


function dbInterface(config) {
  try {
    var connection = new (cradle.Connection)(config.url, config.port, {
      auth: {username: config.username, password: config.password}
    });
    this.db = connection.database(config.dbname);
  } catch (e) {
    console.log("\n Failed to connect cloudantDB : message : ", e.message);
    process.exit(1);
  }
}

dbInterface.prototype.createDoc = function (doc, callback) {
  var self = this;
  self.getDoc(doc._id, function (getDocErr, getDocRes) {
    if (getDocErr) {
      self.db.save(doc, function (saveErr, saveRes) {
        if (saveErr) {
          return callback(saveErr);
        } else {
          return callback(null, saveRes);
        }
      });
    } else {
      return callback("conflict");
    }
  });
};

dbInterface.prototype.getDoc = function (emailId, getDocCB) {
  var self = this;
  self.db.get(emailId, function (getErr, getRes) {
    if (getErr) {
      return getDocCB(getErr, null);
    } else {
      return getDocCB(null, getRes);
    }
  });
};

dbInterface.prototype.getAllDocs = function (getAllCB) {
  var self = this;
  var options = {
    include_docs: true
  };
  self.db.all(options, function (allErr, allRes) {
    if (allErr) {
      return getAllCB(allErr, null);
    } else {
      return getAllCB(null, allRes);
    }
  });
};

dbInterface.prototype.updateDoc = function (emailId, doc, updateDocCB) {
  var self = this;
  self.getDoc(emailId, function (getErr, getRes) {
    if (getErr) {
      return updateDocCB(getErr);
    } else {
      var rev = getRes._rev;
      self.db.save(emailId, rev, doc, function (saveErr, saveRes) {
        if (saveErr) {
          return updateDocCB(saveErr, null);
        } else {
          return updateDocCB(null, saveRes);
        }
      });
    }
  });
};

dbInterface.prototype.deleteDoc = function (emailId, callback) {
  var self = this;
  self.db.remove(emailId, function (removeErr, removeRes) {
    if (removeErr) {
      return callback(removeErr, null);
    } else {
      return callback(null, removeRes);
    }
  });
};

module.exports = dbInterface;
