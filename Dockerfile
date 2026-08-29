# Multi-stage Dockerfile for SURAKSHA-NET Full Stack Platform

# Stage 1: Build Client
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
COPY shared/ /app/shared/
COPY ai-engine/ /app/ai-engine/
RUN npm run build

# Stage 2: Build Server
FROM node:20-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
COPY shared/ /app/shared/
RUN npm run build

# Stage 3: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=server-builder /app/shared ./shared
COPY --from=client-builder /app/client/dist ./client/dist

EXPOSE 3001

CMD ["node", "server/dist/server.js"]
