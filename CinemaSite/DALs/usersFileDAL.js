const jFile = require(`jsonfile`);
const path = require(`path`);

const usersJson = path.join(process.cwd(), `/Data/users.json`);

const readFile = function () {
  return new Promise((resolve, reject) => {
    jFile.readFile(usersJson, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

let writeFile = function (obj) {
  return new Promise((resolve, reject) => {
    jFile.writeFile(usersJson, obj, function (err) {
      if (err) reject(err);
      else resolve(`The document has been successfully modified!`);
    });
  });
};

module.exports = { readFile, writeFile };
