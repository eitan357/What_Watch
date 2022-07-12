const axios = require(`axios`);

const readMembers = function () {
  return axios(`https://jsonplaceholder.typicode.com/users`);
};

const readMember = function (id) {
  return axios(`https://jsonplaceholder.typicode.com/users/${id}`);
};

module.exports = { readMember, readMembers };
