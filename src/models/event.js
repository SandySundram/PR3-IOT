function create(db, args) {
  return new Promise(function(resolve, reject) {
    db.events.insert(args, function(error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    });
  });
}

function read(db, args) {
  return new Promise(function(resolve, reject) {
    db.events.find(function(error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    });
  });
}

module.exports = {
  create,
  read
};
