FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build the production version
RUN npm run build

# Use a simple web server like serve to serve static files
RUN npm install -g serve

# Command to run the production build
CMD ["serve", "-s", "build"]  


EXPOSE 3000
