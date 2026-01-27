# Stage 1: Build Tailwind CSS
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for Tailwind)
RUN npm ci

# Copy source files
COPY . .

# Build Tailwind CSS
RUN npm run build:css

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

# Install nginx
RUN apk add --no-cache nginx

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy server and public files
COPY server.js ./
COPY --from=builder /app/public ./public

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create upload directory
RUN mkdir -p /app/uploads && chown -R node:node /app

# Expose port
EXPOSE 80

# Create startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'nginx' >> /start.sh && \
    echo 'node /app/server.js' >> /start.sh && \
    chmod +x /start.sh

# Run as non-root user for Node.js (nginx runs as root)
CMD ["/bin/sh", "/start.sh"]
