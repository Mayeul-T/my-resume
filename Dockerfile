# syntax=docker/dockerfile:1

# ==========================================
# Stage 1: Dependencies
# ==========================================
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# ==========================================
# Stage 2: Builder
# ==========================================
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

# ==========================================
# Stage 3: Runner
# ==========================================
FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create mount points
RUN mkdir -p /app/storage /app/public/assets && chown -R nextjs:nodejs /app/storage /app/public/assets

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
