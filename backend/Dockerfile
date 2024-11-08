# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables for connecting to PostgreSQL (replace values as needed)
ENV POSTGRES_USER=formation
ENV POSTGRES_PASSWORD=formationPassword
ENV POSTGRES_HOST=db
ENV POSTGRES_PORT=5432

# Expose the application's port (e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
