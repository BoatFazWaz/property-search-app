# Base Node.js image
FROM node:23 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Development image
FROM base AS development
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/tsconfig.json ./tsconfig.json
COPY . .

# Create Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 4000

# Start development server with hot-reloading
CMD ["npm", "run", "dev"]

# Production builder image
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create Prisma client
RUN npx prisma generate

# Build application (if using TypeScript)
RUN npm run build

# Production image
FROM base AS production
WORKDIR /app

ENV NODE_ENV production

# Copy production files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 4000

# Start server
CMD ["npm", "start"] 