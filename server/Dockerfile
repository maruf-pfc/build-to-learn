# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files first (better caching)
COPY package.json pnpm-lock.yaml* ./

# Install pnpm globally
RUN npm install -g pnpm

# Install all dependencies (including dev)
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Build the project (TypeScript -> dist)
RUN pnpm run build


# ---------- Stage 2: Runtime ----------
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm globally again
RUN npm install -g pnpm

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/app/utils/template ./dist/app/utils/template

# Install only production dependencies
RUN pnpm install --prod

# Copy .env file if exists (optional, can also be mounted)
# COPY .env .env

# Expose the port your server listens on (default example: 9999)
EXPOSE 9999

# Start the Node.js app
CMD ["node", "dist/server.js"]
