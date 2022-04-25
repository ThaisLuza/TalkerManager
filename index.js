const express = require('express');
const bodyParser = require('body-parser');
const utilFunc = require('./utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req,res) => {
  try {
    const manager = await utilFunc.getManager();
    if(!manager) {
      return res.status(200).json([]);
    }
    return res.status(200).json(manager);
  } catch (error) {
    return res.status(500).end();
}
});

app.get('/talker/:id', async (req, res) => {
  try {
    const manager = await utilFunc.getManager();
    console.log(manager)
    const searchManager = manager.find(({id}) => id === req.params.id);

    if (!searchManager) {
      return res.status(404).json({message: "Pessoa palestrante não encontrada"});
    }
    return res.status(200).json(searchManager);
  } catch (error) {
    return res.status(500).end();
  }
})

app.listen(PORT, () => {
  console.log('Online');
});
