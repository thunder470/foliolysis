const express = require('express');
const { logger } = require('../utils/logger');
const { portfolioSchema, validate } = require('../validators/schemas');
const Portfolio = require('../models/Portfolio');
const { getIsMongoConnected, getInMemoryPortfolios, setInMemoryPortfolios } = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const isMongoConnected = getIsMongoConnected();
    if (isMongoConnected) {
      const ports = await Portfolio.find().sort({ createdAt: -1 });
      if (ports.length > 0) return res.json(ports);
    }
    return res.json(getInMemoryPortfolios());
  } catch (err) {
    return res.json(getInMemoryPortfolios());
  }
});

router.post('/', validate(portfolioSchema), async (req, res) => {
  try {
    const { name, description, initialCapital, cashBalance, holdings } = req.validatedBody;
    const isMongoConnected = getIsMongoConnected();

    const newPort = {
      name: name.trim(),
      description: description || '',
      initialCapital,
      cashBalance,
      holdings,
      createdAt: new Date(),
    };

    if (isMongoConnected) {
      const created = await Portfolio.create(newPort);
      return res.status(201).json(created);
    } else {
      newPort._id = 'port_' + Date.now();
      const current = getInMemoryPortfolios();
      setInMemoryPortfolios([newPort, ...current]);
      return res.status(201).json(newPort);
    }
  } catch (err) {
    logger.error('Failed to create portfolio', { error: err.message });
    return res.status(500).json({ error: 'Failed to create portfolio', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isMongoConnected = getIsMongoConnected();
    if (isMongoConnected) {
      await Portfolio.findByIdAndDelete(id);
    }
    const current = getInMemoryPortfolios();
    setInMemoryPortfolios(current.filter((p) => p._id.toString() !== id));
    return res.json({ success: true, message: 'Portfolio removed' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete portfolio', details: err.message });
  }
});

module.exports = router;
