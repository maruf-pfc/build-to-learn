# Use a lightweight Node.js base image
FROM node:22-alpine

# Set environment variables for PNPM global binary directory
ENV PNPM_HOME="/root/.pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Set working directory
WORKDIR /app

# Copy workspace config and root-level package manager files
COPY pnpm-workspace.yaml ./
COPY package.json turbo.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm && \
    mkdir -p $PNPM_HOME

# Copy the rest of the project
COPY . .

# Install all dependencies for the monorepo (skip strict lockfile check for now)
RUN pnpm install --no-frozen-lockfile

# OPTIONAL: Install CLI tools globally (if needed at runtime)
RUN pnpm install -g @nestjs/cli

# Build each app explicitly if needed, or use turbo to run all
RUN pnpm run build

# Expose relevant ports (adjust based on actual usage)
EXPOSE 3000 3001 3002 3003 3004 3005 5000

# Start the app(s) in development mode (you can change to prod as needed)
CMD ["pnpm", "run", "dev"]
