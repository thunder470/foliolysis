# foliolysis — Production Deployment & DevSecOps Guide

## 1. System Architecture Overview

```mermaid
graph TD
    Client[Browser / Client] -->|HTTPS 443| Nginx[Frontend Nginx Container: 80]
    Client -->|API Requests with HttpOnly Cookies| Backend[Node.js Express API: 5000]
    Backend -->|Internal RPC / REST| Analytics[Python FastAPI Analytics: 8000]
    Backend -->|Mongoose ODM| Mongo[(MongoDB 7.0 Cluster)]
    Analytics -->|YFinance / REST| MarketData[NSE / BSE Equity Feeds]
    Analytics -->|AI Diagnostic SDK| Gemini[Google Gemini AI]
```

The application is decomposed into three decoupled, independently scalable microservices:
1. **Frontend**: Vite React 18 SPA built with route chunking, served via Nginx Alpine with gzip compression and immutable static caching.
2. **Backend**: Express 4.x application hardened with Helmet CSP, CORS origin whitelisting, Zod input validation, `express-rate-limit`, structured JSON logging, and JWT authentication delivered via `HttpOnly`, `SameSite=Strict`, `Secure` cookies.
3. **Analytics Microservice**: Python 3.11 FastAPI microservice computing vectorized NumPy/Pandas quantitative backtests and stochastic Geometric Brownian Motion Monte Carlo projections.
4. **Data Tier**: MongoDB document store with automatic in-memory fallback for zero-downtime evaluation.

---

## 2. Quickstart: Full-Stack Docker Compose Orchestration

### Prerequisites
- Docker Engine 24.0+ and Docker Compose v2.20+
- (Optional) Google Gemini API Key for AI report generation

### Steps
1. **Clone and Configure Environment**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and configure your `JWT_SECRET` and `GEMINI_API_KEY`.

2. **Build and Launch Container Cluster**:
   ```bash
   docker compose up -d --build
   ```

3. **Verify Cluster Health**:
   ```bash
   # Check running containers
   docker compose ps

   # Check backend health & readiness
   curl -f http://localhost:5000/health
   curl -f http://localhost:5000/ready

   # Check analytics engine
   curl -f http://localhost:8000/health
   curl -f http://localhost:8000/ready
   ```

4. **Access the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Stopping the Cluster**:
   ```bash
   docker compose down
   # To remove persistent data volume as well:
   docker compose down -v
   ```

---

## 3. Cloud Deployment: Google Cloud Run / AWS ECS

### Deploying to Google Cloud Run (Serverless Containers)

1. **Build and Push Container Images to Google Artifact Registry**:
   ```bash
   PROJECT_ID="your-gcp-project-id"
   REGION="asia-south1" # Mumbai region for lowest NSE latency
   REPO="foliolysis-containers"

   # Authenticate Docker
   gcloud auth configure-docker ${REGION}-docker.pkg.dev

   # Build and push Analytics service
   docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/analytics:latest ./analytics
   docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/analytics:latest

   # Build and push Backend service
   docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/backend:latest ./backend
   docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/backend:latest

   # Build and push Frontend service
   docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/frontend:latest ./frontend
   docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/frontend:latest
   ```

2. **Deploy Microservices**:
   * **Analytics Service**:
     ```bash
     gcloud run deploy foliolysis-analytics \
       --image ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/analytics:latest \
       --platform managed \
       --region ${REGION} \
       --no-allow-unauthenticated \
       --memory 1Gi \
       --cpu 1 \
       --set-env-vars GEMINI_API_KEY="your-gemini-key"
     ```

   * **Backend Service**:
     ```bash
     gcloud run deploy foliolysis-backend \
       --image ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/backend:latest \
       --platform managed \
       --region ${REGION} \
       --allow-unauthenticated \
       --memory 512Mi \
       --set-env-vars NODE_ENV=production,MONGO_URI="mongodb+srv://user:pass@cluster.mongodb.net/foliolysis",ANALYTICS_SERVICE_URL="https://foliolysis-analytics-xxx.a.run.app",JWT_SECRET="your-64-character-secret",CORS_ORIGIN="https://foliolysis.com"
     ```

   * **Frontend Service**:
     ```bash
     gcloud run deploy foliolysis-frontend \
       --image ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/frontend:latest \
       --platform managed \
       --region ${REGION} \
       --allow-unauthenticated
     ```

---

## 4. Production Security & DevSecOps Checklist

- [x] **Secure Auth Storage**: Session tokens issued as signed JWTs in `HttpOnly`, `SameSite=Strict`, `Secure` cookies. No sensitive credentials stored in `localStorage`.
- [x] **Rate Limiting**: `express-rate-limit` active on auth routes (20 req / 15 min) and simulation routes (45 req / min).
- [x] **HTTP Security Headers**: `helmet` configured with strict Content Security Policy (CSP), anti-clickjacking frameguard, and referrer policy.
- [x] **Input Validation**: `Zod` schemas enforced on both client forms and Express API routes.
- [x] **Observability**: Structured JSON logging (`timestamp`, `level`, `requestId`, `latencyMs`, `method`, `path`).
- [x] **Health Probes**: Liveness (`/health`) and Readiness (`/ready` validating MongoDB and Analytics connectivity) endpoints exposed for Kubernetes / Cloud Run health probes.
- [x] **Non-Root Execution**: All Dockerfiles configure dedicated unprivileged users (`node` in backend, `appuser` in analytics, `nginx` in frontend).
- [x] **Client Resilience**: Global `ErrorBoundary` catches unexpected client crashes; `OfflineBanner` alerts users to connectivity loss; `ToastContext` delivers non-blocking user feedback.
