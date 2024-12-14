# Stage 1: Build the Vite app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the Vite app using the preview mode
FROM node:18-alpine

WORKDIR /app

# Copy the built files from the build stage
COPY package.json package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY env-inject.cjs .

# Expose port for Vite preview
EXPOSE 4173

# Use Vite's preview command to serve
CMD ["sh", "-c", "node env-inject.cjs && npm run preview -- --host"]