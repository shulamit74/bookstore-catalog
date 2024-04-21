# Stage 1: Build the React application
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the built assets using a lightweight HTTP server
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the previous stage to the working directory
COPY --from=build /app/build .

# Expose port 3000 to allow external access
EXPOSE 3000

# Start the HTTP server to serve the built assets
CMD ["npm", "run", "start"]