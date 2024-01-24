# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source inside the Docker image
# Copy everything from your project's root into the container's work directory
COPY . .

# Your App.js is in the src directory, adjust the path accordingly
CMD ["node", "src/App.js"]

# Make port 3000 available to the world outside this container
EXPOSE 3000
