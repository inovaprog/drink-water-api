# Dockerfile
# Using a base image with Node.js
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies, compile bcrypt and NestJS CLI globally
RUN apk add --no-cache make gcc g++ python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    npm install -g @nestjs/cli && \
    apk del make gcc g++ python3

# Copy local files to the container, excluding node_modules (which should be in .dockerignore)
COPY . .

# Expose port 3000
EXPOSE 3000

# Use nodemon instead of npm run for development
CMD ["npx", "nodemon", "-L"]
