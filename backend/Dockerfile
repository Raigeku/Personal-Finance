FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Don't require DATABASE_URL as a build-arg. The docker-compose service sets
# runtime env vars (via env_file / environment). Running `prisma generate`
# during image build commonly fails because build-time ARGs aren't set.
# Instead generate the client at container start when runtime env is available.
EXPOSE 4000

# At container start: generate Prisma client (uses runtime DATABASE_URL)
# then start the app. Using a shell ensures the generate step runs before start.
CMD ["sh", "-c", "npx prisma generate && npm run start"]
