const fs = require('fs/promises');

function getManager() {
  return fs
    .readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

module.exports = { getManager };
