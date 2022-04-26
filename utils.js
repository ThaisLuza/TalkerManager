const fs = require('fs/promises');
const crypto = require('crypto');
// Trecho de código crypto baseado nesse site: https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/

async function getManager() {
  const fileContent = await fs
    .readFile('./talker.json', 'utf-8');
  return JSON.parse(fileContent);
}

const getToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

module.exports = { getManager, getToken };
