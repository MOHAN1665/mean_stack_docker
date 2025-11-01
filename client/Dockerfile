# Stage 1: Build Angular App
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli@17
RUN npm install
COPY . .

# Build the Angular project for production
RUN npm run build --prod

# Stage 2: Serve using Nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the Angular build output to Nginx’s html folder
COPY --from=build /app/dist/client/browser /usr/share/nginx/html
# (If no browser folder after build, use `/app/dist/client` instead)

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
