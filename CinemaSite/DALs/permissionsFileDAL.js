const jFile = require(`jsonfile`);

const permissionsJson = __dirname + `/../Data/permissions.json`;

const readFile = function () {
  return new Promise((resolve, reject) => {
    jFile.readFile(permissionsJson, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const writeFile = function (odj) {
  return new Promise((resolve, reject) => {
    jFile.writeFile(permissionsJson, odj, function (err) {
      if (err) reject(err);
      else resolve(`The document has been successfully modified!`);
    });
  });
};

module.exports = { readFile, writeFile };
