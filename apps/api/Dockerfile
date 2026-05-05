FROM node:20-alpine

# Install openssl untuk Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy prisma schema dulu
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy semua source
COPY . .

EXPOSE 2000

# ✅ Jalankan migrate dulu baru start server
CMD ["sh", "-c", "npx prisma migrate deploy && node index.js"]