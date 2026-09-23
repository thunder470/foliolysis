# ==============================================================================
# Multi-Stage Production Dockerfile for foliolysis Express Backend
# Security: Runs as non-root user 'node', minimal image size, healthcheck
# ==============================================================================

# Stage 1: Dependency Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Minimal Production Runtime
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

# Install dumb-init to properly handle PID 1 signals
RUN apk add --no-cache dumb-init curl

# Copy production dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./
COPY models ./models
COPY middleware ./middleware
COPY validators ./validators
COPY utils ./utils

# Set permissions for non-root user
USER node

EXPOSE 5000

# Container healthcheck against /health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server.js"]
