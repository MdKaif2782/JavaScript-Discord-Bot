# Use Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --production

# Copy the rest of your source code
COPY . .

# Expose port (not strictly needed for Discord bot, but Render expects it)
EXPOSE 10000

# Run the bot
CMD ["node", "src/index.js"]
