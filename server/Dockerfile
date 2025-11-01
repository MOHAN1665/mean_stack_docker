# FROM node:17-slim
# WORKDIR /usr/app

# # Install dependencies and build the project.
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Run the web service on container startup.
# CMD ["node", "dist/server.js"]

# server/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# If your server runs on TypeScript, build it
RUN npm run build || echo "No build step"

EXPOSE 5200
CMD ["npm", "start"]


