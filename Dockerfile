FROM node:latest
WORKDIR /app
COPY package.json ./
ENV DATABASE_URL "mysql://root:kopiDewata123#@localhost:3306/kopi_dewata_indonesia"
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build
CMD [ "pnpm", "run", "dev" ]

