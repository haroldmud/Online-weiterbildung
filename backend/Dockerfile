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
ENV DATABASE_URL="postgresql://formation:CQb9Jif2lInEKGRLVBPNAJAEsUooxRf9@dpg-csmvm0g8fa8c73acvtq0-a.oregon-postgres.render.com/formation_i2yk"


# Expose the application's port (e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
