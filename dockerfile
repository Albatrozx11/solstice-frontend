FROM node:latest

WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .

# Build the Next.js application


EXPOSE 3000
CMD ["pnpm", "run","dev"]