# Use official Node.js image as the base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Expose development port (adjust if needed)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
