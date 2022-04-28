const express = require('express');

const talkerRouter = express.Router();

const utilFunc = require('./utils');

talkerRouter.get('/', async (_req, res) => {
  try {
    const manager = await utilFunc.getTalker();
    if (!manager) {
      return res.status(200).json([]);
    }
    return res.status(200).json(manager);
  } catch (error) {
    return res.status(500).end();
  }
});

talkerRouter.get('/:id', async (req, res) => {
  try {
    const manager = await utilFunc.getTalker();
    const searchManager = manager.find(
      (data) => data.id === parseInt(req.params.id, 10),
    );

    if (!searchManager) {
      return res
        .status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(searchManager);
  } catch (error) {
    return res.status(500).end();
  }
});

module.exports = talkerRouter;