# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install --legacy-peer-deps

# Bundle app source inside the Docker image
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]