const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'foliolysis_dev_jwt_secret_key_88492049182390';
const COOKIE_NAME = 'foliolysis_token';

// Sign a JWT token for a user
function createToken(user) {
  const payload = {
    id: user._id ? user._id.toString() : user.id,
    email: user.email,
    name: user.name,
    tier: user.tier,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Set HttpOnly, SameSite=Strict cookie
function setTokenCookie(res, token) {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction, // Set true in production over HTTPS
    sameSite: isProduction ? 'strict' : 'lax', // 'lax' in dev allows cross-port cookies
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });
}

// Clear auth cookie on logout
function clearTokenCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    path: '/',
  });
}

// Middleware requiring authenticated session
function requireAuth(req, res, next) {
  let token = req.cookies ? req.cookies[COOKIE_NAME] : null;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      error: 'Authentication required. Please sign in or use guest sandbox.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid or expired session token. Please sign in again.',
      details: err.message,
    });
  }
}

// Optional auth middleware (identifies user if present, continues anyway)
function optionalAuth(req, res, next) {
  let token = req.cookies ? req.cookies[COOKIE_NAME] : null;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (e) {
      // Ignore invalid token in optional auth
    }
  }
  next();
}

module.exports = {
  createToken,
  setTokenCookie,
  clearTokenCookie,
  requireAuth,
  optionalAuth,
  COOKIE_NAME,
};
