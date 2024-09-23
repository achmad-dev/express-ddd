from oven/bun:latest as base

workdir /app

copy . .

run bun install

run bunx prisma generate

expose 3000/tcp

cmd ["bun", "run", "start-and-migrate-prod"]
