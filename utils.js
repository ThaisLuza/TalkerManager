const fs = require('fs/promises');
const crypto = require('crypto');

async function getTalker() {
  const fileContent = await fs
    .readFile('./talker.json', 'utf-8');
  return JSON.parse(fileContent);
}

const setTalker = async (newTalker) => fs.writeFile('./talker.json', JSON.stringify(newTalker));

const getToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

module.exports = { getTalker, setTalker, getToken };
