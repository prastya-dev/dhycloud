FROM node:20-alpine AS builder

WORKDIR /app

# ✅ Build args untuk env variables (NEXT_PUBLIC harus ada saat build time)
ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET

COPY package*.json ./
RUN npm install

COPY . .

# ✅ Build Next.js
RUN npm run build

# ===== Production image =====
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy hasil build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]