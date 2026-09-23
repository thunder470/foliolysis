const express = require('express');
const bcrypt = require('bcryptjs');
const { logger } = require('../utils/logger');
const { authLimiter } = require('../middleware/rateLimiter');
const { createToken, setTokenCookie, clearTokenCookie, requireAuth } = require('../middleware/auth');
const { registerSchema, loginSchema, validate } = require('../validators/schemas');
const User = require('../models/User');
const { getIsMongoConnected, inMemoryUsers } = require('../config/db');

const router = express.Router();

router.post('/register', authLimiter, validate(registerSchema), async (req, res) => {
  try {
    const { name, email, password, tier, initialCapital } = req.validatedBody;
    const isMongoConnected = getIsMongoConnected();

    if (isMongoConnected) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'An account with this email address already exists.' });
      }

      const passwordHash = await User.hashPassword(password);
      const newUser = await User.create({
        name,
        email,
        passwordHash,
        tier: tier || 'Pro Tier',
        initialCapital: initialCapital || 3500000,
        handle: '@' + name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      });

      const token = createToken(newUser);
      setTokenCookie(res, token);

      return res.status(201).json({
        success: true,
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          tier: newUser.tier,
          role: newUser.role,
          handle: newUser.handle,
          initialCapital: newUser.initialCapital,
        },
      });
    } else {
      if (inMemoryUsers.has(email)) {
        return res.status(409).json({ error: 'An account with this email address already exists.' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = {
        _id: 'usr_' + Date.now(),
        name,
        email,
        passwordHash,
        tier: tier || 'Pro Tier',
        role: 'Quantitative Fund Manager',
        initialCapital: initialCapital || 3500000,
        handle: '@' + name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        createdAt: new Date(),
      };
      inMemoryUsers.set(email, newUser);

      const token = createToken(newUser);
      setTokenCookie(res, token);

      return res.status(201).json({
        success: true,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          tier: newUser.tier,
          role: newUser.role,
          handle: newUser.handle,
          initialCapital: newUser.initialCapital,
        },
      });
    }
  } catch (err) {
    logger.error('Registration failed', { error: err.message });
    return res.status(500).json({ error: 'Failed to create user account.', details: err.message });
  }
});

router.post('/login', authLimiter, validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.validatedBody;
    const isMongoConnected = getIsMongoConnected();

    let user;
    let isValidPassword = false;

    if (isMongoConnected) {
      user = await User.findOne({ email });
      if (user) {
        isValidPassword = await user.comparePassword(password);
      }
    } else {
      user = inMemoryUsers.get(email);
      if (user) {
        isValidPassword = await bcrypt.compare(password, user.passwordHash);
      }
    }

    if (!user || !isValidPassword) {
      return res.status(401).json({ error: 'Invalid email address or password.' });
    }

    const token = createToken(user);
    setTokenCookie(res, token);

    return res.json({
      success: true,
      user: {
        id: user._id ? user._id.toString() : user.id,
        name: user.name,
        email: user.email,
        tier: user.tier,
        role: user.role,
        handle: user.handle,
        initialCapital: user.initialCapital,
      },
    });
  } catch (err) {
    logger.error('Login error', { error: err.message });
    return res.status(500).json({ error: 'Internal authentication error.', details: err.message });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const isMongoConnected = getIsMongoConnected();
    let user;
    if (isMongoConnected) {
      user = await User.findById(req.user.id).select('-passwordHash');
    } else {
      user = inMemoryUsers.get(req.user.email);
    }

    if (!user) {
      return res.json({
        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          tier: req.user.tier,
          role: req.user.role,
        },
      });
    }

    return res.json({
      user: {
        id: user._id ? user._id.toString() : user.id,
        name: user.name,
        email: user.email,
        tier: user.tier,
        role: user.role,
        handle: user.handle,
        initialCapital: user.initialCapital,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve profile', details: err.message });
  }
});

router.post('/guest', (req, res) => {
  const guestUser = {
    _id: 'guest_' + Date.now(),
    name: 'Guest Trader',
    email: `guest_${Math.random().toString(36).substring(2, 7)}@foliolysis.in`,
    tier: 'Guest Sandbox',
    role: 'Retail Algorithmic Trader',
    initialCapital: 1000000,
    handle: '@guest_sandbox',
  };

  const token = createToken(guestUser);
  setTokenCookie(res, token);

  return res.json({
    success: true,
    user: {
      id: guestUser._id,
      name: guestUser.name,
      email: guestUser.email,
      tier: guestUser.tier,
      role: guestUser.role,
      handle: guestUser.handle,
      initialCapital: guestUser.initialCapital,
      isGuest: true,
    },
  });
});

router.post('/logout', (req, res) => {
  clearTokenCookie(res);
  return res.json({ success: true, message: 'Signed out successfully' });
});

module.exports = router;
