FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# For production
# RUN npm ci --only=production

COPY .. .

EXPOSE 3000

CMD ["npm", "run", "dev"]