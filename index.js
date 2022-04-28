const express = require('express');
const bodyParser = require('body-parser');
const utilFunc = require('./utils');
const talkerRouter = require('./routes');
const {
  validateEmail,
  validatePassword,
  validateAuth,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
} = require('./auth-middleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 8
app.get('/talker/search', validateAuth, async (req, res) => {
  try {
    const { q } = req.query;
    const manager = await utilFunc.getTalker();
    const filteredArray = manager
    .filter((data) => data.name.toUpperCase().includes(q.toUpperCase()));
    res.status(200).json(filteredArray);
  } catch (error) {
    return res.status(500).end();
  }
  });

// Requisito 1 e 2 com Router
app.use('/talker', talkerRouter);

// Requisito 3
app.post('/login', validateEmail, validatePassword, (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const token = utilFunc.getToken();
      return res.status(200).json({ token });
    }
  } catch (error) {
    return res.status(500).end();
  }
});

// Requisito 5
app.post(
  '/talker',
  validateAuth,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      const manager = await utilFunc.getTalker();
      const newManager = {
        name,
        age,
        id: manager.length + 1,
        talk,
      };
      manager.push(newManager);

      await utilFunc.setTalker(manager);

      return res.status(201).json(newManager);
    } catch (error) {
      return res.status(500).end();
    }
  },
);

// Requisito 6
app.put(
  '/talker/:id',
  validateAuth,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const manager = await utilFunc.getTalker();
      const searchId = manager.filter((data) => data.id === Number(id));
      const editTalker = {
        name,
        age,
        id: Number(id),
        talk,
      };
      const newList = [...searchId, editTalker];
      await utilFunc.setTalker(newList);
      return res.status(200).json(editTalker);
    } catch (error) {
      return res.status(500).end();
    }
  },
);

// Requisito 7
app.delete('/talker/:id', validateAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const manager = await utilFunc.getTalker();
    const searchId = manager.filter((data) => data.id !== Number(id));
    
    await utilFunc.setTalker(searchId);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
