FROM node:18.16
WORKDIR /app
# ENV DATABASE_URL "mysql://root:kopiDewata123%23@db:3306/kopi_dewata_indonesia"
COPY package.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]
